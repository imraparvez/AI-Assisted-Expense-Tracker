# AI-Assisted Expense Tracker 💰

A simple and user-friendly expense tracking web application built using **Next.js, React, and JavaScript**.

The application helps users record daily expenses, organize spending into categories, view monthly spending summaries, and understand their expenses through interactive charts.

## ✨ Features

- **Add Expenses:** Record expenses with amount, category, date, and notes.
- **Expense Management:** View and delete recorded expenses.
- **Category Management:** Add, edit, and manage expense categories.
- **Monthly Summary:** View total expenses for a selected month.
- **Expense Analytics:** Visualize spending using interactive charts.
- **Six-Month Spending Trend:** Compare expenses over the last six months.
- **CSV Export:** Download expense records as a CSV file.
- **Local Storage:** Automatically save expense data in the browser.

## 🛠️ Technologies Used

- Next.js
- React.js
- JavaScript
- CSS
- Recharts
- Browser Local Storage

## 📁 Project Structure

```text
expense-tracker/
│
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── ExpenseForm.js
│   ├── CategoryManager.js
│   └── Analytics.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── package.json
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Open the project folder

```bash
cd expense-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in your browser

Visit:

```text
http://localhost:3000
```

## 💾 Data Storage

The application uses browser Local Storage to save expense records and categories.

Currently, data is stored locally in the browser and is not automatically synchronized between different devices.

## 🎯 Project Objective

The objective of this project is to develop a simple expense management application that makes it easier to record, organize, monitor, and analyze personal spending.

## 👩‍💻 Developer

**Imra Parvez**

B.Tech Engineering Student

---

*Built as a learning project using Next.js and React.*
