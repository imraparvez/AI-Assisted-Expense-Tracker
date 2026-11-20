"use client";

import { useState } from "react";

export default function ExpenseForm({ categories, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }
    if (note.length > 120) {
      setError("Note must be 120 characters or fewer.");
      return;
    }
    onSave({ amount: Number(amount), categoryId, date, note: note.trim() });
    onClose();
  };

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="expense-title">
      <div className="modal-heading"><div><p className="eyebrow">NEW RECORD</p><h2 id="expense-title">Add an expense</h2></div><button className="close-button" onClick={onClose} aria-label="Close">×</button></div>
      <form onSubmit={submit} className="form">
        <label>Amount (₹)<input type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 450" required /></label>
        <label>Category<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required><option value="">Choose a category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
        <label>Note <span className="muted">(optional, max 120 characters)</span><input maxLength="120" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What was this expense for?" /></label>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">Save expense</button></div>
      </form>
    </section>
  </div>;
}
