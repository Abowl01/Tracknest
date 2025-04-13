function initApp() {
  // Show loader, then reveal content
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
    loadExpenses();
    loadBalance();
  }, 1200);
}

// Add Expense
function addExpense(event) {
  event.preventDefault();
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const tags = document.getElementById('tags').value;
  const note = document.getElementById('note').value;

  if (isNaN(amount) || amount <= 0) return;

  // Save expense to localStorage
  const expense = { category, amount, date, tags, note };
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Update the table
  updateTable(expenses);

  // Deduct from bank balance
  let currentBalance = parseFloat(localStorage.getItem('balance') || 0);
  let newBalance = currentBalance - amount;
  localStorage.setItem('balance', newBalance.toFixed(2));
  document.getElementById('bank-balance').textContent = newBalance.toFixed(2);

  // Clear form
  document.querySelector('form').reset();
}

// Load Expenses
function loadExpenses() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  updateTable(expenses);
}

// Update Table
function updateTable(expenses) {
  const tbody = document.getElementById('expense-table-body');
  tbody.innerHTML = '';
  expenses.forEach(exp => {
    const row = `<tr>
      <td>${exp.date}</td><td>${exp.category}</td><td>₹${exp.amount}</td>
      <td>${exp.tags}</td><td>${exp.note}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Update Bank Balance
function updateBalance(e) {
  e.preventDefault();
  const input = parseFloat(document.getElementById('balance-input').value);
  const current = parseFloat(localStorage.getItem('balance') || 0);
  const newBalance = current + input;
  localStorage.setItem('balance', newBalance.toFixed(2));
  document.getElementById('bank-balance').textContent = newBalance.toFixed(2);
  document.getElementById('balance-input').value = '';
}

// Load Bank Balance
function loadBalance() {
  const bal = localStorage.getItem('balance') || 0;
  document.getElementById('bank-balance').textContent = parseFloat(bal).toFixed(2);
}
window.onload = function () {
  alert("Welcome or should I say Bonjour Amigo Or should i say Kudu... Kudu...Kudu... welcome !");
  loadExpenses();
  loadBalance();
};