#!/usr/bin/env python
import time
import os
import sys
import yaml
from dotenv import load_dotenv
from zapv2 import ZAPv2

# Add .security directory to Python path so imports work when run from project root
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

from alert_processor import process_alerts, sort_and_save_alerts
from github import post_pr_comment

# Load environment variables
load_dotenv()

# Load scan config
CONFIG_PATH = ".security/config.yaml"
if os.path.exists(CONFIG_PATH):
    with open(CONFIG_PATH, "r") as config_file:
        config = yaml.safe_load(config_file)
else:
    raise FileNotFoundError("Missing .security/config.yaml file in project directory.")

scans_config = config.get("scans", {})
run_spider = scans_config.get("spider", True)
run_ajax_spider = scans_config.get("ajax_spider", False)
ajax_spider_timeout = scans_config.get("ajax_spider_timeout", 120)  # default 120 seconds
run_passive = scans_config.get("passive", True)
run_active = scans_config.get("active", False)

# Show selected scans
print(f"Selected scans: 🕷️ Spider: {run_spider} | ⚡ AJAX Spider: {run_ajax_spider} | 🧠 Passive: {run_passive} | 💥 Active: {run_active}")

# Basic validation: at least one scan must be selected
if not (run_spider or run_ajax_spider or run_passive or run_active):
    raise ValueError("❌ No scans selected! Please enable at least one scan type in .security/config.yaml.")

# Get values
ZAP_PORT = int(os.getenv("ZAP_PORT", 8090))
ZAP_API_KEY = os.getenv("ZAP_API_KEY")
ZAP_HOST = os.getenv("ZAP_HOST", "http://localhost")
TARGET_URL = os.getenv("TARGET_URL")
GITHUB_REPO = os.getenv("GITHUB_REPO")  # Format: "owner/repo"

# Initialize ZAP API client
zap = ZAPv2(apikey=ZAP_API_KEY, proxies={'http': f"{ZAP_HOST}:{ZAP_PORT}", 'https': f"{ZAP_HOST}:{ZAP_PORT}"})

# Clear previous alerts and create a new session for this scan
print('🔄 Clearing previous ZAP session and alerts...')
try:
    zap.core.new_session()
    print('✅ New ZAP session created')
except Exception as e:
    print(f'⚠️ Warning: Could not create new session: {e}')
    # Try to delete all alerts as fallback
    try:
        # Delete all alerts
        zap.core.delete_all_alerts()
        print('✅ Previous alerts cleared')
    except Exception as e2:
        print(f'⚠️ Warning: Could not clear alerts: {e2}')

# Access the target URL first
print(f'Accessing target {TARGET_URL}')
zap.urlopen(TARGET_URL)
time.sleep(2)

# 🕷️ Spider Scan
if run_spider:
    print(f'🕷️ Spidering target {TARGET_URL}')
    scanid = zap.spider.scan(TARGET_URL)
    time.sleep(2)
    while int(zap.spider.status(scanid)) < 100:
        print(f'Spider progress %: {zap.spider.status(scanid)}')
        time.sleep(2)
    print('🕷️ Spider completed')
else:
    print('🚫 Skipping Spider scan as per config.')

# ⚡ AJAX Spider
if run_ajax_spider:
    print(f'⚡ AJAX Spidering target {TARGET_URL}')
    zap.ajaxSpider.scan(TARGET_URL)

    timeout = time.time() + ajax_spider_timeout
    while zap.ajaxSpider.status == 'running':
        if time.time() > timeout:
            print('⚠️ AJAX Spider timed out!')
            break
        print(f'AJAX Spider status: {zap.ajaxSpider.status}')
        time.sleep(2)

    print('⚡ AJAX Spider completed')
    ajax_results = zap.ajaxSpider.results(start=0, count=10)
    print(f'⚡ AJAX Spider results (first 10): {ajax_results}')
else:
    print('🚫 Skipping AJAX Spider as per config.')

# 🧠 Passive Scan
if run_passive:
    while int(zap.pscan.records_to_scan) > 0:
        print(f'Passive scan records left: {zap.pscan.records_to_scan}')
        time.sleep(2)
    print('🧠 Passive scan completed')
else:
    print('🚫 Skipping Passive scan as per config.')

# 💥 Active Scan
if run_active:
    print(f'💥 Active scanning target {TARGET_URL}')
    scanid = zap.ascan.scan(TARGET_URL)
    time.sleep(5)
    while int(zap.ascan.status(scanid)) < 100:
        print(f'Active scan progress %: {zap.ascan.status(scanid)}')
        time.sleep(5)
    print('💥 Active scan completed')
else:
    print('🚫 Skipping Active scan as per config.')

# ✅ Sort and save alerts in JSON file
suffix = os.getenv("REPORT_SUFFIX", "")   # main or pr or empty if not set
json_report_filename = f"security_report_{suffix}.json"
sort_and_save_alerts(zap.core.alerts(), json_report_filename)
print(f"📄 JSON report saved as: {json_report_filename}")

# ✅ Process and summarize alerts
if suffix == "pr":
    final_summary = process_alerts("security_report_pr.json")
    # ✅ Post final summary as PR comment
    artifact_link = f"https://github.com/{GITHUB_REPO}/actions/runs/{os.getenv('GITHUB_RUN_ID')}"
    post_pr_comment(f"### Security Scan Summary 🚨\n\n```\n{final_summary}\n```\n📂 **[Download Full Report]({artifact_link})**")