"use client";

import { useState } from "react";

export default function CategoryManager({ categories, onClose, onAdd, onEdit, onDelete }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6688d2");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const save = (event) => {
    event.preventDefault();
    const clean = name.trim();
    if (!clean) { setError("Enter a category name."); return; }
    if (categories.some((item) => item.name.toLowerCase() === clean.toLowerCase() && item.id !== editing?.id)) {
      setError("A category with this name already exists."); return;
    }
    if (editing) onEdit(editing.id, clean, color);
    else onAdd(clean, color);
    setName(""); setColor("#6688d2"); setEditing(null); setError("");
  };

  const startEdit = (item) => { setEditing(item); setName(item.name); setColor(item.color); setError(""); };

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="category-title">
      <div className="modal-heading"><div><p className="eyebrow">PERSONALISE</p><h2 id="category-title">Manage categories</h2></div><button className="close-button" onClick={onClose} aria-label="Close">×</button></div>
      <form onSubmit={save} className="category-form">
        <label>Category name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Healthcare" maxLength="30" /></label>
        <label className="color-label">Colour<input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        <button className="button button-primary" type="submit">{editing ? "Save changes" : "Add category"}</button>
        {editing && <button type="button" className="text-button" onClick={() => { setEditing(null); setName(""); }}>Cancel edit</button>}
        {error && <p className="form-error full-width">{error}</p>}
      </form>
      <div className="category-list">{categories.map((item) => <div className="category-row" key={item.id}><span className="color-dot" style={{ background: item.color }} /><strong>{item.name}</strong><span className="category-actions"><button className="text-button" onClick={() => startEdit(item)}>Edit</button><button className="text-button danger-text" onClick={() => onDelete(item.id)}>Delete</button></span></div>)}</div>
    </section>
  </div>;
}
