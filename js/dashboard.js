/**
 * dashboard.js — Account summary, recent transactions, spending chart
 * Uses Canvas API for chart — no Chart.js or external libs needed.
 */

// ----------------------------------------------------------------
// Account data — would normally come from banking-account-service API
// ----------------------------------------------------------------

const accountData = {
  savings: {
    balance: 124560.00,
    accountNo: 'XXXX XXXX 4821',
    trend: '+2.4%'
  },
  current: {
    balance: 85200.00,
    accountNo: 'XXXX XXXX 7302',
    trend: '0%'
  },
  fd: {
    balance: 500000.00,
    accountNo: 'FD-2024-XXXX-9011',
    maturity: '15 Mar 2025'
  }
};

// Monthly spending + income data — last 6 months
// In a real app this comes from the transaction aggregation endpoint
const monthlyData = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  spending: [42800, 38500, 67200, 51300, 44900, 39600],
  income:   [85000, 85000, 85000, 85000, 85000, 85000]
};

// Recent 5 transactions for the dashboard widget
const recentTransactions = [
  {
    merchant: 'NEFT-SALARY-INFOSYS',
    ref:      'NEFT/2024031500012',
    date:     '15 Mar 2024',
    amount:   85000.00,
    type:     'credit',
    icon:     'IN',
    status:   'Completed'
  },
  {
    merchant: 'UPI/9876543210/Rent-Mar',
    ref:      'UPI/24031401/Mr.Sharma',
    date:     '14 Mar 2024',
    amount:   22000.00,
    type:     'debit',
    icon:     'UP',
    status:   'Completed'
  },
  {
    merchant: 'Amazon Pay / Order #408',
    ref:      'AMZN/IND/20240312',
    date:     '12 Mar 2024',
    amount:   3499.00,
    type:     'debit',
    icon:     'AZ',
    status:   'Completed'
  },
  {
    merchant: 'Swiggy Food Order',
    ref:      'SWGY/BLR/20240310',
    date:     '10 Mar 2024',
    amount:   487.00,
    type:     'debit',
    icon:     'SW',
    status:   'Completed'
  },
  {
    merchant: 'ATM-HDFC-DELHI-CP',
    ref:      'ATM/HDFC/11032024/1432',
    date:     '11 Mar 2024',
    amount:   10000.00,
    type:     'debit',
    icon:     'AT',
    status:   'Completed'
  }
];

// ----------------------------------------------------------------
// HDFC-style amount formatting — comma separated Indian system
// e.g. 124560 → ₹1,24,560.00
// ----------------------------------------------------------------

function formatINR(amount) {
  // Using toLocaleString with en-IN locale for Indian number formatting
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ----------------------------------------------------------------
// Greeting based on time of day
// ----------------------------------------------------------------

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ----------------------------------------------------------------
// Render recent transactions table
// ----------------------------------------------------------------

function renderRecentTransactions() {
  const tbody = document.getElementById('recentTxBody');
  if (!tbody) return;

  // Icon background colours — merchant-specific tints
  const iconColors = {
    'IN': { bg: '#e6f4ea', color: '#1e8e3e' },  // salary — green
    'UP': { bg: '#fce8e6', color: '#d93025' },  // UPI debit — red
    'AZ': { bg: '#e8f0fe', color: '#1a73e8' },  // Amazon — blue
    'SW': { bg: '#fef7e0', color: '#b06000' },  // Swiggy — amber
    'AT': { bg: '#f1f3f4', color: '#5f6368' }   // ATM — grey
  };

  tbody.innerHTML = recentTransactions.map(function(tx) {
    const color = iconColors[tx.icon] || { bg: '#f1f3f4', color: '#5f6368' };
    const amountStr = formatINR(tx.amount);
    const amountClass = tx.type === 'credit' ? 'credit' : 'debit';
    const prefix = tx.type === 'credit' ? '+' : '−';

    return `
      <tr>
        <td>
          <div class="tx-merchant">
            <div class="tx-merchant-icon" style="background:${color.bg}; color:${color.color};">
              ${tx.icon}
            </div>
            <div>
              <div class="tx-merchant-name" title="${tx.merchant}">${tx.merchant}</div>
              <div class="tx-merchant-ref">${tx.ref}</div>
            </div>
          </div>
        </td>
        <td class="tx-date">${tx.date}</td>
        <td class="tx-amount ${amountClass}">${prefix} ${amountStr}</td>
        <td><span class="badge badge-success">${tx.status}</span></td>
      </tr>
    `;
  }).join('');
}

// ----------------------------------------------------------------
// Canvas bar chart — pure Canvas API, no external libraries
// might need to paginate this better if data grows beyond 12 months
// ----------------------------------------------------------------

function drawSpendingChart() {
  const canvas = document.getElementById('spendingChart');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const labels = monthlyData.labels;
  const spend  = monthlyData.spending;
  const income = monthlyData.income;

  // Set canvas resolution properly (crisp on retina)
  const dpr    = window.devicePixelRatio || 1;
  const width  = canvas.parentElement.offsetWidth;
  const height = 200;

  canvas.width  = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width  = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);

  // Chart margins
  const marginLeft   = 44;
  const marginRight  = 12;
  const marginTop    = 16;
  const marginBottom = 28;

  const chartWidth  = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const maxVal   = Math.max(...income, ...spend) * 1.15; // head room
  const barCount = labels.length;
  const groupW   = chartWidth / barCount;
  const barW     = groupW * 0.28; // each bar within group

  // ---- Grid lines ----
  ctx.strokeStyle = '#f1f3f4';
  ctx.lineWidth   = 1;
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const y = marginTop + (chartHeight / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(marginLeft + chartWidth, y);
    ctx.stroke();

    // Y axis labels
    const val = Math.round(maxVal - (maxVal / gridLines) * i);
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val, marginLeft - 6, y + 3.5);
  }

  // ---- Bars ----
  labels.forEach(function(label, i) {
    const groupX = marginLeft + i * groupW + groupW * 0.08;

    // Income bar (lighter blue)
    const incomeH = (income[i] / maxVal) * chartHeight;
    const incomeY = marginTop + chartHeight - incomeH;
    ctx.fillStyle = 'rgba(26, 115, 232, 0.18)';
    ctx.beginPath();
    // Slightly rounded top on bars
    const r = 3;
    ctx.moveTo(groupX, incomeY + r);
    ctx.arcTo(groupX, incomeY, groupX + barW, incomeY, r);
    ctx.arcTo(groupX + barW, incomeY, groupX + barW, incomeY + incomeH, r);
    ctx.lineTo(groupX + barW, marginTop + chartHeight);
    ctx.lineTo(groupX, marginTop + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Spending bar (solid blue)
    const spendH = (spend[i] / maxVal) * chartHeight;
    const spendY = marginTop + chartHeight - spendH;
    const spendX = groupX + barW + 3;
    ctx.fillStyle = '#1a73e8';
    ctx.beginPath();
    ctx.moveTo(spendX, spendY + r);
    ctx.arcTo(spendX, spendY, spendX + barW, spendY, r);
    ctx.arcTo(spendX + barW, spendY, spendX + barW, spendY + spendH, r);
    ctx.lineTo(spendX + barW, marginTop + chartHeight);
    ctx.lineTo(spendX, marginTop + chartHeight);
    ctx.closePath();
    ctx.fill();

    // X axis label
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, groupX + barW, marginTop + chartHeight + 16);
  });

  // Total spending annotation
  const totalSpend = spend.reduce((a, b) => a + b, 0);
  const totalEl = document.getElementById('chartTotalValue');
  if (totalEl) totalEl.textContent = formatINR(totalSpend);
}

// ----------------------------------------------------------------
// Set greeting + date in topbar
// ----------------------------------------------------------------

function initTopbar() {
  const greetingEl = document.getElementById('greetingText');
  const dateEl     = document.getElementById('todayDate');

  if (greetingEl) {
    greetingEl.textContent = getGreeting() + ', Rajesh Kumar';
  }
  if (dateEl) {
    dateEl.textContent = formatDate(new Date());
  }
}

// ----------------------------------------------------------------
// Init — runs when DOM is ready
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  initTopbar();
  renderRecentTransactions();

  // Small delay so layout is fully painted before measuring canvas width
  setTimeout(drawSpendingChart, 100);

  // Redraw chart on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawSpendingChart, 250);
  });
});
