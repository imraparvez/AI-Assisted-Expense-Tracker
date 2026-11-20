# AI-Assisted Expense Tracker

A beginner-friendly Next.js expense tracker built with React, JavaScript, CSS, localStorage and Recharts.

## Requirements
- Node.js 18.17 or later
- VS Code (recommended)

## Run the project
1. Extract the ZIP file.
2. Open the extracted `expense-tracker` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## Features
- Add, view and delete expenses
- Input validation (amount > 0, category required, note max 120 characters)
- Six default categories
- Add, rename, recolour and delete categories
- Category deletion is blocked when expenses use that category
- Browser localStorage persistence
- Monthly summary and month selector
- Category donut chart
- Six-month spending trend chart
- CSV export

## Notes
- Data is stored in the current browser using localStorage. It is not a cloud database and does not automatically sync between devices.
- The charts use Recharts.
- This is a learning/lab project. Review and understand the code before your viva.
