#!/usr/bin/env python
"""
Script to process alerts and post PR summary comment.
This script extracts the PR summary logic from scan.py for standalone execution.
"""
import os
import sys
from dotenv import load_dotenv

def post_pr_summary():
    # Add .security directory to Python path so imports work when run from project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, script_dir)

    from alert_processor import process_alerts, count_alerts
    from github import post_pr_comment

    # Load environment variables
    load_dotenv()

    # Get environment variables
    suffix = os.getenv("REPORT_SUFFIX", "")  # main or pr or empty if not set
    GITHUB_REPO = os.getenv("GITHUB_REPO")  # Format: "owner/repo"

    # ✅ Process and summarize alerts
    final_summary = process_alerts("new_alerts.json", "new_alerts_security_report.txt")
    final_summary += process_alerts("common_alerts.json", "old_alerts_security_report.txt")

    resolved_alerts = count_alerts("resolved_alerts.json")
    if resolved_alerts > 0:
        final_summary += f"\n\n✅ {resolved_alerts} older alerts were resolved in this PR, which is good news!"

    # ✅ Post final summary as PR comment
    artifact_link = f"https://github.com/{GITHUB_REPO}/actions/runs/{os.getenv('GITHUB_RUN_ID')}"
    post_pr_comment(f"### Security Scan Summary 🚨\n\n```\n{final_summary}\n```\n📂 **[Download Full Report]({artifact_link})**")

if __name__ == "__main__":
    post_pr_summary()


    