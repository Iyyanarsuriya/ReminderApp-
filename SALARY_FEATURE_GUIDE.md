# Member Salary Management Feature Guide

## Overview
The Member Manager now supports full salary/wage management for each member. You can set and update salary information including the payment type and amount.

## How to Update Member Salary Information

### Step 1: Access Member Manager
1. Navigate to **Expense Tracker** or **Attendance Tracker**
2. Click the **Member Manager** button (person icon with edit symbol)

### Step 2: Edit Existing Member
1. Find the member you want to update in the list
2. Hover over the member card to reveal action buttons
3. Click the **Edit** button (pencil icon)

### Step 3: Update Salary Fields
The form will populate with the member's current information. You can update:

**Salary Type** (Dropdown):
- **Daily Wage**: For workers paid per day
- **Monthly Salary**: For employees with fixed monthly pay
- **Piece Rate**: For workers paid per unit/piece produced

**Salary Amount** (Number Input):
- The label changes based on salary type:
  - Daily Wage → "Daily Wage"
  - Monthly Salary → "Monthly Salary"
  - Piece Rate → "Rate per Unit"
- Enter the amount (e.g., 500, 15000, 25)

### Step 4: Save Changes
1. Click **"Update Member"** button
2. You'll see a success toast notification
3. The member card will now display the updated salary information

## Viewing Salary Information

After saving, each member card displays:
- **Salary Type**: Daily/Monthly/Piece Rate
- **Amount**: ₹[amount]

Example displays:
- "Daily: ₹500"
- "Monthly: ₹15000"
- "Piece Rate: ₹25"

## Adding New Members with Salary

When adding a new member:
1. Click **"+ Add Member"** button
2. Fill in all fields including:
   - Name (required)
   - Role/Group
   - Phone
   - Email
   - **Salary Type** (defaults to Daily Wage)
   - **Salary Amount** (defaults to 0)
   - Status (Active/Inactive)
3. Click **"Add Member"**

## Backend Implementation

### Database Schema
```sql
members table:
- wage_type: ENUM('daily', 'monthly', 'piece_rate') DEFAULT 'daily'
- daily_wage: DECIMAL(10, 2) DEFAULT 0.00
```

### API Endpoints
- **GET** `/api/members` - Get all members (includes salary info)
- **POST** `/api/members` - Create member with salary
- **PUT** `/api/members/:id` - Update member including salary
- **DELETE** `/api/members/:id` - Delete member

### Request Body Example
```json
{
  "name": "John Doe",
  "role": "Worker",
  "phone": "1234567890",
  "email": "john@example.com",
  "wage_type": "daily",
  "daily_wage": 500,
  "status": "active"
}
```

## Integration with Salary Calculator

The salary information can be used in the Expense Tracker's Salary Calculator:
1. Select a member from the dropdown
2. Their wage type and amount are automatically loaded
3. Calculate earnings based on attendance or units produced
4. Generate salary reports

## Features
✅ Create members with salary information
✅ Update existing member salary details
✅ View salary info on member cards
✅ Different salary types (daily/monthly/piece rate)
✅ Decimal precision for amounts
✅ Validation and error handling
✅ Toast notifications for success/errors

## Notes
- Salary information is optional (defaults to Daily/₹0)
- All amounts are stored with 2 decimal precision
- Changing salary type updates the input label dynamically
- Historical salary changes are not tracked (current value only)
