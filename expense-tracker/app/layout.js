import "./globals.css";

export const metadata = {
  title: "Expense Tracker",
  description: "AI-Assisted Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
