# MB Bank — Banking Dashboard UI

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-34A853?style=flat)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

> **Banking dashboard UI — pure HTML/CSS/JS, no framework dependencies.**  
> A clean, professional fintech-grade interface built entirely with vanilla web technologies.

---

## 🚀 How to Run

```
Open index.html in any modern browser
```

No build step. No `npm install`. No server required. Just open and go.

**Demo credentials:**
- Customer ID: `user`
- IPIN: `password123`

---

## ✨ Features

- **Login page** with secure session handling (`sessionStorage`), animated background, mock credential validation
- **Dashboard** with account summary cards (Savings, Current, Fixed Deposit), quick action buttons, recent transactions widget
- **Spending chart** drawn with Canvas API (no Chart.js or external charting library)
- **Transactions page** with:
  - 20 realistic Indian banking transactions (NEFT, UPI, ATM, salary credit, etc.)
  - Date range / type / text filters (live search)
  - Working CSV export with BOM header (opens correctly in Excel)
  - Pagination (10 per page) with page number controls
  - Summary stats (total credits, total debits, net flow)
- **Fully responsive** layout — works on mobile, tablet, and desktop
- **Indian number formatting** — ₹1,24,560.00 (en-IN locale)
- **No dependencies** — zero npm packages, zero CDN libraries (except Google Fonts for Inter)

---

## 📁 File Structure

```
banking-dashboard/
├── index.html          ← Login page
├── dashboard.html      ← Main dashboard
├── transactions.html   ← Full transaction history
├── css/
│   ├── main.css        ← Shared styles, login page, sidebar, topbar
│   └── dashboard.css   ← Dashboard & transaction page specific styles
├── js/
│   ├── auth.js         ← Login/logout, session guard, toast helper
│   ├── dashboard.js    ← Account data, recent transactions, Canvas chart
│   └── transactions.js ← Filter logic, pagination, CSV export
└── README.md
```

---

## 🎨 Design Decisions

| Property       | Value                                               |
|----------------|-----------------------------------------------------|
| Primary color  | `#1a73e8` (Google Blue — professional fintech feel) |
| Font           | Inter (Google Fonts)                                |
| Theme          | Light — white + soft blue-grey backgrounds          |
| Inspiration    | HDFC NetBanking, Paytm Business Dashboard           |
| Chart          | Pure Canvas API — no Chart.js                       |
| Auth           | `sessionStorage` — clears on tab close              |

---

## 📸 Screenshots

> _Screenshots coming soon. Run locally to see the UI._

---

## 🔗 Notes

- **Built as a frontend portfolio piece** — designed to serve as the UI layer for a `banking-account-service` REST API.
- All transaction data is mock/hardcoded. Replace with `fetch()` calls to your API endpoints.
- Session auth is demo-only. A production version would use JWT tokens and HTTPS.
- The Canvas chart can be extended to support line/area charts by adding bezier curve rendering.
