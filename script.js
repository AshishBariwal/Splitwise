// Data Storage
let users = [
    { id: '1', name: 'Ashish', email: 'ashish@example.com' },
    { id: '2', name: 'Ramneet', email: 'ramneet@example.com' },
    { id: '3', name: 'Pari', email: 'pari@example.com' }
];

let expenses = [];

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2
    }).format(amount);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Calculate balances
function calculateBalances() {
    const balances = {};
    
    // Initialize balances
    users.forEach(user => {
        balances[user.id] = 0;
    });

    // Calculate balances
    expenses.forEach(expense => {
        const paidAmount = expense.amount;
        const splitAmount = paidAmount / expense.splitBetween.length;
        
        // Add what they paid
        balances[expense.paidBy] += paidAmount;
        
        // Subtract what they owe
        expense.splitBetween.forEach(userId => {
            balances[userId] -= splitAmount;
        });
    });

    return balances;
}

// Calculate settlements
function calculateSettlements() {
    const balances = calculateBalances();
    const settlements = [];
    
    // Create individual settlements for each person who owes money
    Object.entries(balances).forEach(([userId, balance]) => {
        if (balance < 0) { // This person owes money
            const amountOwed = Math.abs(balance);
            
            // Find who this person owes money to
            Object.entries(balances).forEach(([creditorId, creditorBalance]) => {
                if (creditorBalance > 0 && creditorId !== userId) { // This person is owed money
                    const amountToPay = Math.min(amountOwed, creditorBalance);
                    
                    if (amountToPay > 1) { // Avoid tiny amounts (₹1)
                        settlements.push({
                            from: userId,
                            to: creditorId,
                            amount: Math.round(amountToPay)
                        });
                    }
                }
            });
        }
    });
    
    return settlements;
}

// UI Functions
function updateDashboard() {
    const balances = calculateBalances();
    const settlements = calculateSettlements();
    
    // Update summary cards
    document.getElementById('friendsCount').textContent = users.length;
    const heroFriendsEl = document.getElementById('heroFriendsCount');
    if (heroFriendsEl) {
        heroFriendsEl.textContent = `${users.length} Friend${users.length === 1 ? '' : 's'}`;
    }
    document.getElementById('expensesCount').textContent = expenses.length;
    document.getElementById('totalAmount').textContent = '₹' + formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0));
    document.getElementById('settlementsCount').textContent = settlements.length;
    
    // Update balances
    updateBalancesDisplay(balances);
    
    // Update settlements
    updateSettlementsDisplay(settlements);
    
    // Update expenses
    updateExpensesDisplay();
    
    // Update modals
    updateModals();

    // Update sidebar friends list if visible
    renderSidebarFriends();
}

function updateBalancesDisplay(balances) {
    const balancesGrid = document.getElementById('balancesGrid');
    balancesGrid.innerHTML = '';
    
    users.forEach(user => {
        const balance = balances[user.id] || 0;
        const balanceClass = balance > 0 ? 'balance-positive' : balance < 0 ? 'balance-negative' : 'balance-zero';
        
        const balanceItem = document.createElement('div');
        balanceItem.className = 'balance-item';
        balanceItem.innerHTML = `
            <div class="balance-avatar">
                ${getInitials(user.name)}
            </div>
            <div class="balance-info">
                <div class="balance-name">${user.name}</div>
                <div class="balance-amount ${balanceClass}">
                    ${formatCurrency(balance)}
                </div>
            </div>
            <button class="remove-friend-btn" onclick="showRemoveFriendModal('${user.id}')" title="Remove ${user.name}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        balancesGrid.appendChild(balanceItem);
    });
}

function updateSettlementsDisplay(settlements) {
    const settlementsSection = document.getElementById('settlementsSection');
    const settlementsList = document.getElementById('settlementsList');
    
    if (settlements.length === 0) {
        settlementsSection.style.display = 'none';
        return;
    }
    
    settlementsSection.style.display = 'block';
    settlementsList.innerHTML = '';
    
    settlements.forEach(settlement => {
        const fromUser = users.find(u => u.id === settlement.from);
        const toUser = users.find(u => u.id === settlement.to);
        
        const settlementItem = document.createElement('div');
        settlementItem.className = 'settlement-item';
        settlementItem.innerHTML = `
            <div class="settlement-avatar">
                <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="settlement-info">
                <strong>${fromUser.name}</strong> owes <strong>${toUser.name}</strong>
            </div>
            <div class="settlement-amount">
                ${formatCurrency(settlement.amount)}
            </div>
        `;
        
        settlementsList.appendChild(settlementItem);
    });
}

function updateExpensesDisplay() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
    
    expenses.slice(0, 5).forEach(expense => {
        const paidByUser = users.find(u => u.id === expense.paidBy);
        
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-avatar">
                <i class="fas fa-receipt"></i>
            </div>
            <div class="expense-info">
                <div class="expense-description">${expense.description}</div>
                <div class="expense-details">
                    Paid by ${paidByUser.name} • ${expense.date.toLocaleDateString()}
                </div>
            </div>
            <div class="expense-amount">
                ${formatCurrency(expense.amount)}
            </div>
        `;
        
        expensesList.appendChild(expenseItem);
    });
}

function updateModals() {
    // Update paid by dropdown
    const paidBySelect = document.getElementById('expensePaidBy');
    paidBySelect.innerHTML = '<option value="">Select who paid</option>';
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        paidBySelect.appendChild(option);
    });
    
    // Update split options
    const splitOptions = document.getElementById('splitOptions');
    splitOptions.innerHTML = '';
    
    users.forEach(user => {
        const option = document.createElement('div');
        option.className = 'split-option';
        option.textContent = user.name;
        option.onclick = () => toggleSplitOption(option, user.id);
        splitOptions.appendChild(option);
    });
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
    document.getElementById('overlay').classList.remove('show');
}

function showAddExpenseModal() {
    showModal('addExpenseModal');
    updateModals();
}

function showAddFriendModal() {
    showModal('addFriendModal');
}

// Remove Friend Functions
let userToRemove = null;

function showRemoveFriendModal(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        userToRemove = user;
        document.getElementById('friendToRemoveName').textContent = user.name;
        showModal('removeFriendModal');
    }
}

function removeFriend() {
    if (userToRemove) {
        // Remove user from users list
        users = users.filter(user => user.id !== userToRemove.id);
        
        // Remove user from all expenses
        expenses = expenses.map(expense => ({
            ...expense,
            splitBetween: expense.splitBetween.filter(userId => userId !== userToRemove.id)
        })).filter(expense => {
            // Remove expenses where the user was the only one paying
            if (expense.paidBy === userToRemove.id && expense.splitBetween.length === 0) {
                return false;
            }
            // Update paidBy if the removed user was paying
            if (expense.paidBy === userToRemove.id && expense.splitBetween.length > 0) {
                expense.paidBy = expense.splitBetween[0];
            }
            return true;
        });
        
        userToRemove = null;
        closeModal('removeFriendModal');
        
        // Update UI
        updateDashboard();
    }
}

// Sidebar Functions
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Sidebar Friends rendering
function renderSidebarFriends() {
    const container = document.getElementById('sidebarFriendsList');
    if (!container || container.style.display === 'none') return;
    container.innerHTML = '';
    users.forEach(u => {
        const row = document.createElement('div');
        row.className = 'sidebar-friend';
        row.innerHTML = `
            <div class="info">
                <div class="name">${u.name}</div>
                <div class="email">${u.email}</div>
            </div>
            <div class="actions">
                <button data-user="${u.id}">Remove</button>
            </div>
        `;
        row.querySelector('button').addEventListener('click', () => {
            // reuse existing remove flow
            userToRemove = u;
            document.getElementById('friendToRemoveName').textContent = u.name;
            showModal('removeFriendModal');
        });
        container.appendChild(row);
    });
}

// Split Options Functions
let selectedSplitUsers = [];

function toggleSplitOption(element, userId) {
    const isSelected = selectedSplitUsers.includes(userId);
    
    if (isSelected) {
        selectedSplitUsers = selectedSplitUsers.filter(id => id !== userId);
        element.classList.remove('selected');
    } else {
        selectedSplitUsers.push(userId);
        element.classList.add('selected');
    }
}

// Add Functions
function addExpense() {
    const description = document.getElementById('expenseDescription').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const paidBy = document.getElementById('expensePaidBy').value;
    
    if (!description || !amount || !paidBy || selectedSplitUsers.length === 0) {
        alert('Please fill in all required fields and select at least one person to split with.');
        return;
    }
    
    const expense = {
        id: Date.now().toString(),
        description,
        amount,
        paidBy,
        splitBetween: [...selectedSplitUsers],
        date: new Date(),
        category: 'Other'
    };
    
    expenses.push(expense);
    
    // Reset form
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expensePaidBy').value = '';
    selectedSplitUsers = [];
    
    // Update UI
    updateDashboard();
    closeModal('addExpenseModal');
    
    // Reset split options
    document.querySelectorAll('.split-option').forEach(option => {
        option.classList.remove('selected');
    });
}

function addFriend() {
    const name = document.getElementById('friendName').value.trim();
    const email = document.getElementById('friendEmail').value.trim();
    
    if (!name || !email) {
        alert('Please fill in both name and email.');
        return;
    }
    
    const user = {
        id: Date.now().toString(),
        name,
        email
    };
    
    users.push(user);
    
    // Reset form
    document.getElementById('friendName').value = '';
    document.getElementById('friendEmail').value = '';
    
    // Update UI
    updateDashboard();
    closeModal('addFriendModal');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const menuBtn = document.querySelector('.menu-btn');
        
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Make the hero "Add Friends" span open the Add Friend modal
    document.querySelectorAll('.addfriend').forEach(el => {
        el.addEventListener('click', () => {
            showAddFriendModal();
        });
    });

    // Toggle Friends section in sidebar
    const sidebarFriends = document.getElementById('sidebarFriends');
    const sidebarFriendsList = document.getElementById('sidebarFriendsList');
    if (sidebarFriends && sidebarFriendsList) {
        sidebarFriends.addEventListener('click', () => {
            const showing = sidebarFriendsList.style.display !== 'none';
            sidebarFriendsList.style.display = showing ? 'none' : 'block';
            if (!showing) {
                renderSidebarFriends();
            }
        });
    }
});

// Initialize the application
updateDashboard();
