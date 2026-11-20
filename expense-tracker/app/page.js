"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ExpenseForm from "@/components/ExpenseForm";
import CategoryManager from "@/components/CategoryManager";
import Analytics from "@/components/Analytics";

const DEFAULT_CATEGORIES = [
  { id: "food", name: "Food", color: "#c7dcff" },
  { id: "transport", name: "Transport", color: "#8fb5f2" },
  { id: "bills", name: "Bills", color: "#4968b5" },
  { id: "shopping", name: "Shopping", color: "#293f83" },
  { id: "entertainment", name: "Entertainment", color: "#6688d2" },
  { id: "other", name: "Other", color: "#202c5e" }
];

const today = () => new Date().toISOString().slice(0, 10);
const monthKey = (date) => date.slice(0, 7);
const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 2
}).format(value);

export default function Home() {
  const [expenses, setExpenses] = useLocalStorage("expense-tracker-expenses", []);
  const [categories, setCategories] = useLocalStorage("expense-tracker-categories", DEFAULT_CATEGORIES);
  const [formOpen, setFormOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(monthKey(today()));
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const sortedExpenses = useMemo(() =>
    [...expenses].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt),
  [expenses]);

  const addExpense = (expense) => setExpenses((current) => [...current, {
    ...expense, id: crypto.randomUUID(), createdAt: Date.now()
  }]);

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((current) => current.filter((item) => item.id !== id));
    }
  };

  const addCategory = (name, color) => {
    setCategories((current) => [...current, {
      id: crypto.randomUUID(), name: name.trim(), color
    }]);
  };

  const editCategory = (id, name, color) => {
    setCategories((current) => current.map((item) =>
      item.id === id ? { ...item, name: name.trim(), color } : item
    ));
  };

  const deleteCategory = (id) => {
    if (expenses.some((expense) => expense.categoryId === id)) {
      alert("This category is being used. Reassign or delete its expenses first.");
      return;
    }
    if (window.confirm("Delete this category?")) {
      setCategories((current) => current.filter((item) => item.id !== id));
    }
  };

  const monthExpenses = expenses.filter((expense) => monthKey(expense.date) === selectedMonth);
  const total = monthExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const previousDate = new Date(`${selectedMonth}-01T12:00:00`);
  previousDate.setMonth(previousDate.getMonth() - 1);
  const previousMonth = monthKey(previousDate.toISOString().slice(0, 10));
  const previousTotal = expenses
    .filter((item) => monthKey(item.date) === previousMonth)
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const change = previousTotal === 0
    ? (total === 0 ? 0 : null)
    : ((total - previousTotal) / previousTotal) * 100;

  const exportCSV = () => {
    const headers = ["ID", "Amount", "Category", "Date", "Note"];
    const rows = sortedExpenses.map((item) => [
      item.id, item.amount,
      categories.find((category) => category.id === item.categoryId)?.name || "Unknown",
      item.date, item.note || ""
    ]);
    const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expenses-${today()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!ready) return <main className="loading">Loading your expense tracker…</main>;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">₹</span> Expense Tracker</a>
        <div className="top-actions">
          <button className="button button-light" onClick={() => setCategoryOpen(true)}>Manage Categories</button>
          <button className="button button-primary" onClick={() => setFormOpen(true)}>＋ Add Expense</button>
        </div>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">PERSONAL FINANCE DASHBOARD</p>
          <h1>Know where your money goes.</h1>
          <p className="subheading">Keep your spending organised, one expense at a time.</p>
        </div>
        <div className="month-picker">
          <label htmlFor="month">Viewing month</label>
          <input id="month" type="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} />
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card total-card">
          <span className="summary-icon">₹</span>
          <p>Total spending</p>
          <h2>{money(total)}</h2>
          <small>{monthExpenses.length} expense{monthExpenses.length === 1 ? "" : "s"} this month</small>
        </article>
        <article className="summary-card">
          <span className="summary-icon soft">↗</span>
          <p>Change vs previous month</p>
          <h2>{change === null ? "—" : `${Math.abs(change).toFixed(1)}%`}</h2>
          <small>{change === null ? "No previous-month data" : change > 0 ? "Higher than last month" : change < 0 ? "Lower than last month" : "No change"}</small>
        </article>
        <article className="summary-card">
          <span className="summary-icon soft">▤</span>
          <p>Categories used</p>
          <h2>{new Set(monthExpenses.map((item) => item.categoryId)).size}</h2>
          <small>In the selected month</small>
        </article>
      </section>

      <Analytics expenses={expenses} categories={categories} selectedMonth={selectedMonth} />

      <section className="panel expenses-panel">
        <div className="panel-heading">
          <div><p className="eyebrow">YOUR RECORDS</p><h2>Recent expenses</h2></div>
          <button className="button button-outline" onClick={exportCSV}>↓ Export CSV</button>
        </div>
        {sortedExpenses.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">＋</div><h3>No expenses yet</h3><p>Add your first expense to start tracking your spending.</p><button className="button button-primary" onClick={() => setFormOpen(true)}>Add your first expense</button></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Expense</th><th>Category</th><th>Date</th><th className="align-right">Amount</th><th></th></tr></thead>
              <tbody>
                {sortedExpenses.map((expense) => {
                  const category = categories.find((item) => item.id === expense.categoryId);
                  return <tr key={expense.id}>
                    <td><strong>{expense.note || "Expense"}</strong><small className="mobile-date">{expense.date}</small></td>
                    <td><span className="category-tag" style={{ "--tag-color": category?.color || "#dbe5f5" }}>{category?.name || "Unknown"}</span></td>
                    <td>{expense.date}</td>
                    <td className="align-right amount">{money(Number(expense.amount))}</td>
                    <td><button className="delete-button" aria-label="Delete expense" onClick={() => deleteExpense(expense.id)}>Delete</button></td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>Built with Next.js, React and localStorage · Your data stays in this browser.</footer>

      {formOpen && <ExpenseForm categories={categories} onClose={() => setFormOpen(false)} onSave={addExpense} />}
      {categoryOpen && <CategoryManager categories={categories} onClose={() => setCategoryOpen(false)} onAdd={addCategory} onEdit={editCategory} onDelete={deleteCategory} />}
    </main>
  );
}
