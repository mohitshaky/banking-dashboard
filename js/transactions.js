/**
 * transactions.js — Full transaction table with filtering, pagination, CSV export.
 * All 20 transactions are realistic Indian banking entries.
 */

// ----------------------------------------------------------------
// Full mock transaction dataset — Indian banking context
// Balance column simulates running account balance
// ----------------------------------------------------------------

// might need to paginate this better once real API returns 3+ months data
var allTransactions = [
  {
    id:          'TX001',
    date:        '2024-03-15',
    dateDisplay: '15 Mar 2024',
    description: 'NEFT-SALARY-INFOSYS-LTD',
    type:        'credit',
    amount:      85000.00,
    balance:     124560.00,
    status:      'Completed',
    category:    'Salary'
  },
  {
    id:          'TX002',
    date:        '2024-03-14',
    dateDisplay: '14 Mar 2024',
    description: 'UPI/9876543210/Rent-Sharma',
    type:        'debit',
    amount:      22000.00,
    balance:     39560.00,
    status:      'Completed',
    category:    'Rent'
  },
  {
    id:          'TX003',
    date:        '2024-03-13',
    dateDisplay: '13 Mar 2024',
    description: 'IMPS/Priya-Kumar/Gift',
    type:        'credit',
    amount:      5000.00,
    balance:     61560.00,
    status:      'Completed',
    category:    'Transfer'
  },
  {
    id:          'TX004',
    date:        '2024-03-12',
    dateDisplay: '12 Mar 2024',
    description: 'Amazon Pay / Order #408-76432',
    type:        'debit',
    amount:      3499.00,
    balance:     56560.00,
    status:      'Completed',
    category:    'Shopping'
  },
  {
    id:          'TX005',
    date:        '2024-03-11',
    dateDisplay: '11 Mar 2024',
    description: 'ATM-HDFC-DELHI-CONNAUGHT-PL',
    type:        'debit',
    amount:      10000.00,
    balance:     60059.00,
    status:      'Completed',
    category:    'ATM Withdrawal'
  },
  {
    id:          'TX006',
    date:        '2024-03-10',
    dateDisplay: '10 Mar 2024',
    description: 'Swiggy Food / SWGY-BLR-20240310',
    type:        'debit',
    amount:      487.00,
    balance:     70059.00,
    status:      'Completed',
    category:    'Food & Dining'
  },
  {
    id:          'TX007',
    date:        '2024-03-09',
    dateDisplay: '09 Mar 2024',
    description: 'HDFC-LIC-PREMIUM-AUTO-DEBIT',
    type:        'debit',
    amount:      12500.00,
    balance:     70546.00,
    status:      'Completed',
    category:    'Insurance'
  },
  {
    id:          'TX008',
    date:        '2024-03-08',
    dateDisplay: '08 Mar 2024',
    description: 'NEFT/Ananya-Mehta/Loan-Repay',
    type:        'credit',
    amount:      8000.00,
    balance:     83046.00,
    status:      'Completed',
    category:    'Transfer'
  },
  {
    id:          'TX009',
    date:        '2024-03-07',
    dateDisplay: '07 Mar 2024',
    description: 'Zomato / ZOM-DL-007-20240307',
    type:        'debit',
    amount:      632.00,
    balance:     75046.00,
    status:      'Completed',
    category:    'Food & Dining'
  },
  {
    id:          'TX010',
    date:        '2024-03-06',
    dateDisplay: '06 Mar 2024',
    description: 'BSES-ELECTRICITY-BILL-MARCH',
    type:        'debit',
    amount:      2145.00,
    balance:     75678.00,
    status:      'Completed',
    category:    'Utilities'
  },
  {
    id:          'TX011',
    date:        '2024-03-05',
    dateDisplay: '05 Mar 2024',
    description: 'Airtel Postpaid / Bill-Mar-2024',
    type:        'debit',
    amount:      999.00,
    balance:     77823.00,
    status:      'Completed',
    category:    'Telecom'
  },
  {
    id:          'TX012',
    date:        '2024-03-04',
    dateDisplay: '04 Mar 2024',
    description: 'UPI/8800112233/Vikram-Bhatia',
    type:        'debit',
    amount:      1500.00,
    balance:     78822.00,
    status:      'Completed',
    category:    'UPI Transfer'
  },
  {
    id:          'TX013',
    date:        '2024-03-03',
    dateDisplay: '03 Mar 2024',
    description: 'Netflix India / NTFLX-MAR-2024',
    type:        'debit',
    amount:      649.00,
    balance:     80322.00,
    status:      'Completed',
    category:    'Entertainment'
  },
  {
    id:          'TX014',
    date:        '2024-03-02',
    dateDisplay: '02 Mar 2024',
    description: 'ATM-SBI-NOIDA-SECTOR62',
    type:        'debit',
    amount:      5000.00,
    balance:     80971.00,
    status:      'Completed',
    category:    'ATM Withdrawal'
  },
  {
    id:          'TX015',
    date:        '2024-03-01',
    dateDisplay: '01 Mar 2024',
    description: 'INTEREST-CREDIT-FEB-2024',
    type:        'credit',
    amount:      739.50,
    balance:     85971.00,
    status:      'Completed',
    category:    'Interest'
  },
  {
    id:          'TX016',
    date:        '2024-02-28',
    dateDisplay: '28 Feb 2024',
    description: 'BigBasket / BB-ORD-8823-GRG',
    type:        'debit',
    amount:      2318.00,
    balance:     85231.50,
    status:      'Completed',
    category:    'Grocery'
  },
  {
    id:          'TX017',
    date:        '2024-02-25',
    dateDisplay: '25 Feb 2024',
    description: 'Ola / OLA-RIDE-DL-20240225',
    type:        'debit',
    amount:      245.00,
    balance:     87549.50,
    status:      'Completed',
    category:    'Transport'
  },
  {
    id:          'TX018',
    date:        '2024-02-20',
    dateDisplay: '20 Feb 2024',
    description: 'NEFT-SALARY-INFOSYS-LTD',
    type:        'credit',
    amount:      85000.00,
    balance:     87794.50,
    status:      'Completed',
    category:    'Salary'
  },
  {
    id:          'TX019',
    date:        '2024-02-18',
    dateDisplay: '18 Feb 2024',
    description: 'Reliance Digital / RD-1299-ORD',
    type:        'debit',
    amount:      4599.00,
    balance:     2794.50,
    status:      'Completed',
    category:    'Electronics'
  },
  {
    id:          'TX020',
    date:        '2024-02-15',
    dateDisplay: '15 Feb 2024',
    description: 'NEFT/FD-Maturity-Credit-Q4',
    type:        'credit',
    amount:      15000.00,
    balance:     7393.50,
    status:      'Completed',
    category:    'FD Credit'
  }
];

// ----------------------------------------------------------------
// State — current filter + pagination
// ----------------------------------------------------------------

var state = {
  filtered:    allTransactions.slice(), // working copy
  currentPage: 1,
  pageSize:    10
};

// ----------------------------------------------------------------
// HDFC-style amount formatting — same as dashboard.js
// ----------------------------------------------------------------

function formatINR(amount) {
  return '₹' + Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ----------------------------------------------------------------
// Filter transactions based on UI controls
// ----------------------------------------------------------------

function applyFilters() {
  const fromDate = document.getElementById('filterFromDate').value;  // YYYY-MM-DD
  const toDate   = document.getElementById('filterToDate').value;
  const typeVal  = document.getElementById('filterType').value;
  const search   = document.getElementById('filterSearch').value.trim().toLowerCase();

  state.filtered = allTransactions.filter(function(tx) {
    // Date range filter
    if (fromDate && tx.date < fromDate) return false;
    if (toDate   && tx.date > toDate)   return false;

    // Type filter
    if (typeVal !== 'all' && tx.type !== typeVal) return false;

    // Description search
    if (search && !tx.description.toLowerCase().includes(search)) return false;

    return true;
  });

  state.currentPage = 1;
  renderTable();
  renderPagination();
  updateStats();
}

function resetFilters() {
  document.getElementById('filterFromDate').value = '';
  document.getElementById('filterToDate').value   = '';
  document.getElementById('filterType').value     = 'all';
  document.getElementById('filterSearch').value   = '';

  state.filtered    = allTransactions.slice();
  state.currentPage = 1;
  renderTable();
  renderPagination();
  updateStats();
}

// ----------------------------------------------------------------
// Render transaction table rows for current page
// ----------------------------------------------------------------

function renderTable() {
  const tbody = document.getElementById('txTableBody');
  if (!tbody) return;

  const start = (state.currentPage - 1) * state.pageSize;
  const end   = start + state.pageSize;
  const page  = state.filtered.slice(start, end);

  if (page.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 40px; color: var(--text-muted);">
          No transactions found for the selected filters.
        </td>
      </tr>`;
    updateCountInfo(0, 0);
    return;
  }

  tbody.innerHTML = page.map(function(tx) {
    const amountClass = tx.type === 'credit' ? 'credit' : 'debit';
    const amountSign  = tx.type === 'credit' ? '+' : '−';

    return `
      <tr>
        <td class="tx-date">${tx.dateDisplay}</td>
        <td>
          <div style="font-weight:500; font-size:13px;">${tx.description}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:1px;">${tx.category} · ${tx.id}</div>
        </td>
        <td>
          <span class="badge ${tx.type === 'credit' ? 'badge-success' : 'badge-danger'}">
            ${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
          </span>
        </td>
        <td style="text-align:right;">
          <span class="tx-amount ${amountClass}" style="font-size:13.5px;">
            ${amountSign} ${formatINR(tx.amount)}
          </span>
        </td>
        <td style="text-align:right;" class="tx-balance">${formatINR(tx.balance)}</td>
        <td>
          <span class="badge badge-success">${tx.status}</span>
        </td>
      </tr>
    `;
  }).join('');

  updateCountInfo(start + 1, Math.min(end, state.filtered.length));
}

function updateCountInfo(from, to) {
  const el = document.getElementById('txCountInfo');
  if (el) {
    el.textContent = `Showing ${from}–${to} of ${state.filtered.length} transactions`;
  }
}

// ----------------------------------------------------------------
// Pagination controls
// ----------------------------------------------------------------

function renderPagination() {
  const total    = state.filtered.length;
  const pages    = Math.ceil(total / state.pageSize) || 1;
  const current  = state.currentPage;
  const infoEl   = document.getElementById('paginationInfo');
  const ctrlEl   = document.getElementById('paginationControls');

  if (infoEl) infoEl.textContent = `Page ${current} of ${pages}`;
  if (!ctrlEl) return;

  let html = '';

  // Prev button
  html += `<button class="page-btn" ${current === 1 ? 'disabled' : ''} data-page="${current - 1}">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>`;

  // Page number buttons — show up to 5 around current page
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || (p >= current - 1 && p <= current + 1)) {
      html += `<button class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
    } else if (p === current - 2 || p === current + 2) {
      html += `<span style="padding:0 4px; color:var(--text-muted); line-height:32px;">…</span>`;
    }
  }

  // Next button
  html += `<button class="page-btn" ${current === pages ? 'disabled' : ''} data-page="${current + 1}">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>`;

  ctrlEl.innerHTML = html;

  // Attach click handlers
  ctrlEl.querySelectorAll('.page-btn:not(:disabled)').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const page = parseInt(btn.getAttribute('data-page'), 10);
      if (!isNaN(page) && page !== state.currentPage) {
        state.currentPage = page;
        renderTable();
        renderPagination();
        // Scroll back to table top
        document.querySelector('.tx-card') && document.querySelector('.tx-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ----------------------------------------------------------------
// Summary stats at top of page
// ----------------------------------------------------------------

function updateStats() {
  const txns = state.filtered;

  const credits = txns.filter(t => t.type === 'credit');
  const debits  = txns.filter(t => t.type === 'debit');

  const totalCredit = credits.reduce((s, t) => s + t.amount, 0);
  const totalDebit  = debits.reduce((s, t) => s + t.amount, 0);
  const netFlow     = totalCredit - totalDebit;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('statTotalCredit', formatINR(totalCredit));
  set('statCreditCount', `${credits.length} transaction${credits.length !== 1 ? 's' : ''}`);
  set('statTotalDebit',  formatINR(totalDebit));
  set('statDebitCount',  `${debits.length} transaction${debits.length !== 1 ? 's' : ''}`);
  set('statTxCount',     txns.length.toString());

  const netEl = document.getElementById('statNetFlow');
  if (netEl) {
    netEl.textContent = (netFlow >= 0 ? '+' : '−') + ' ' + formatINR(Math.abs(netFlow));
    netEl.className   = 'tx-stat-value ' + (netFlow >= 0 ? 'credit' : 'debit');
  }

  // Date range display
  const dateRangeEl = document.getElementById('txDateRange');
  if (dateRangeEl && txns.length > 0) {
    const dates    = txns.map(t => t.date).sort();
    const earliest = txns.find(t => t.date === dates[0]);
    const latest   = txns.find(t => t.date === dates[dates.length - 1]);
    dateRangeEl.textContent = earliest && latest
      ? `${earliest.dateDisplay} – ${latest.dateDisplay}`
      : '';
  }
}

// ----------------------------------------------------------------
// CSV Export — generates a real downloadable CSV from filtered data
// ----------------------------------------------------------------

function exportToCSV() {
  const rows = state.filtered;

  if (rows.length === 0) {
    showToast('No transactions to export.');
    return;
  }

  // Build CSV content
  const headers = ['Transaction ID', 'Date', 'Description', 'Category', 'Type', 'Amount (INR)', 'Balance (INR)', 'Status'];

  const csvLines = [
    headers.join(','),
    ...rows.map(function(tx) {
      return [
        tx.id,
        tx.dateDisplay,
        '"' + tx.description.replace(/"/g, '""') + '"',
        tx.category,
        tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        (tx.type === 'debit' ? '-' : '') + tx.amount.toFixed(2),
        tx.balance.toFixed(2),
        tx.status
      ].join(',');
    })
  ];

  const csvContent = '\uFEFF' + csvLines.join('\r\n'); // BOM for Excel compatibility

  // Create Blob and trigger download — works in all modern browsers
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href     = url;
  link.download = 'MB_Bank_Statement_' + new Date().toISOString().split('T')[0] + '.csv';
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('Statement exported successfully (' + rows.length + ' transactions)');
}

// ----------------------------------------------------------------
// Set date display in topbar
// ----------------------------------------------------------------

function initTopbar() {
  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}

// ----------------------------------------------------------------
// Wire up event listeners and kick off the page
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  initTopbar();

  // Set default date range — last 60 days
  const toDate   = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 60);

  const fromEl = document.getElementById('filterFromDate');
  const toEl   = document.getElementById('filterToDate');
  if (fromEl) fromEl.value = fromDate.toISOString().split('T')[0];
  if (toEl)   toEl.value   = toDate.toISOString().split('T')[0];

  // Filter button
  const applyBtn = document.getElementById('applyFilterBtn');
  if (applyBtn) applyBtn.addEventListener('click', applyFilters);

  // Reset button
  const resetBtn = document.getElementById('resetFilterBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  // CSV export
  const exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportToCSV);

  // Live search — filter as user types (debounced slightly)
  const searchEl = document.getElementById('filterSearch');
  let searchTimer;
  if (searchEl) {
    searchEl.addEventListener('input', function() {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 300);
    });
  }

  // Type select — filter immediately on change
  const typeEl = document.getElementById('filterType');
  if (typeEl) typeEl.addEventListener('change', applyFilters);

  // Initial render — show all data
  applyFilters(); // applies default date range filter
});
