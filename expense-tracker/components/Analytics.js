"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const formatMoney = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

export default function Analytics({ expenses, categories, selectedMonth }) {
  const categoryData = useMemo(() => categories.map((category) => ({
    name: category.name,
    value: expenses.filter((item) => item.date.slice(0, 7) === selectedMonth && item.categoryId === category.id)
      .reduce((sum, item) => sum + Number(item.amount), 0),
    color: category.color
  })).filter((item) => item.value > 0), [expenses, categories, selectedMonth]);

  const trendData = useMemo(() => {
    const selected = new Date(`${selectedMonth}-01T12:00:00`);
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(selected);
      date.setMonth(date.getMonth() - (5 - index));
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return {
        month: date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        total: expenses.filter((item) => item.date.slice(0, 7) === key)
          .reduce((sum, item) => sum + Number(item.amount), 0)
      };
    });
  }, [expenses, selectedMonth]);

  return <section className="analytics-grid">
    <article className="panel chart-panel"><div className="panel-heading"><div><p className="eyebrow">SPENDING BREAKDOWN</p><h2>By category</h2></div></div>
      {categoryData.length === 0 ? <div className="chart-empty">Add expenses to see your category breakdown.</div> :
        <div className="chart-area"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3}>{categoryData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip formatter={(value) => formatMoney(value)} /><Legend /></PieChart></ResponsiveContainer></div>}
    </article>
    <article className="panel chart-panel"><div className="panel-heading"><div><p className="eyebrow">LAST SIX MONTHS</p><h2>Spending trend</h2></div></div>
      <div className="chart-area"><ResponsiveContainer width="100%" height={250}><BarChart data={trendData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf5" /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis tickFormatter={(value) => `₹${value}`} tickLine={false} axisLine={false} width={58} /><Tooltip formatter={(value) => formatMoney(value)} /><Bar dataKey="total" name="Spending" fill="#4968b5" radius={[7, 7, 0, 0]} /></BarChart></ResponsiveContainer></div>
    </article>
  </section>;
}
