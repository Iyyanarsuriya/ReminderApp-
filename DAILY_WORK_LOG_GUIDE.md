# Daily Work Log & Piece Rate Tracker Guide

## Overview
This feature allows you to track daily work logs for members, specifically designed for "Piece Rate" workers or daily production tracking. You can log the units produced by a worker each day and view a monthly summary of their earnings.

## Features
- **Daily Entry**: Log specific details for a worker on a specific date.
  - **Member**: Select the worker.
  - **Date**: Defaults to today, but can be backdated.
  - **Units Produced**: Number of pieces/units completed.
  - **Rate per Unit**: Auto-filled from the member's profile (if set) or manually editable.
- **Auto-Calculation**: Instantly calculates the total amount for the day (Units × Rate).
- **Monthly Summary**: View a consolidated report of total units working days, and total earnings for each member for the selected month.

## How to Access
1. Navigate to **Expense Tracker**.
2. Look for the **"Daily Work Logs"** button (Box icon <i class="fa fa-box"></i>) in the top filter bar, next to the Member Manager and Project buttons.
3. Click to open the Daily Work Log Manager.

## Usage Guide

### 1. Adding a Daily Log
1. Open the **Daily Work Log Manager**.
2. Ensure you are in **"Daily Entry"** mode (toggled at the top).
3. **Select Member**: Choose the worker. If they have a "Piece Rate" set in their profile, usage rate will auto-fill.
4. **Date**: Confirm the date (default: Today).
5. **Units Produced**: Enter the quantity.
6. **Rate per Unit**: Verify or update the rate.
7. **Notes**: Optional comments.
8. Click **"Add Log"** (or **"Update Log"** if editing).

### 2. Viewing Monthly Totals
1. Open the **Daily Work Log Manager**.
2. Click on **"Monthly Summary"** toggle at the top.
3. Select the date (any day in the desired month).
4. The system will display a card for each member with:
   - **Days Worked**
   - **Total Units Produced**
   - **Total Earnings** for that month.

### 3. Editing/Deleting Logs
- In "Daily Entry" mode, you can see the list of logs for the selected date.
- Click the **Edit** (Pencil) icon to modify a log.
- Click the **Delete** (Trash) icon to remove a log.

## Integration
- This system works alongside the main Expense Tracker. 
- While these logs track *earnings*, they do not automatically create "Expense" transactions in your ledger until you decide to pay them. 
- You can use the "Total Earnings" figure from the Monthly Summary to create a single "Salary Payout" transaction in the Expense Tracker when you pay the worker.
