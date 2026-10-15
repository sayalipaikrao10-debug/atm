// Educational ATM demo only.
// The balance is stored in browser memory and resets on page reload.

const DEMO_PIN = "1234";

let balance = 10000;
let transactions = [];

function login() {
    const pin = document.getElementById("pin").value;
    const loginMessage = document.getElementById("loginMessage");

    if (pin === DEMO_PIN) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");

        updateBalance();
        loginMessage.textContent = "";
        showMessage("Login successful!");
    } else {
        loginMessage.textContent = "Incorrect PIN. Try again.";
    }
}

function updateBalance() {
    document.getElementById("balance").textContent =
        balance.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR"
        });
}

function getAmount() {
    const input = document.getElementById("amount");
    const amount = Number(input.value);

    if (!input.value || !Number.isSafeInteger(amount) || amount <= 0) {
        showMessage("Enter a valid positive whole amount.");
        return null;
    }

    return amount;
}

function checkBalance() {
    showMessage("Your balance is ₹" + balance.toLocaleString("en-IN"));
}

function withdraw() {
    const amount = getAmount();

    if (amount === null) return;

    if (amount > balance) {
        showMessage("Insufficient balance!");
        return;
    }

    balance -= amount;

    addTransaction("Withdrawal", amount);
    updateBalance();
    showMessage("Please collect your cash: ₹" + amount);
    clearAmount();
}

function deposit() {
    const amount = getAmount();

    if (amount === null) return;

    if (amount > Number.MAX_SAFE_INTEGER - balance) {
        showMessage("Amount is too large.");
        return;
    }

    balance += amount;

    addTransaction("Deposit", amount);
    updateBalance();
    showMessage("Deposit successful: ₹" + amount);
    clearAmount();
}

function addTransaction(type, amount) {
    transactions.unshift({
        type,
        amount,
        time: new Date().toLocaleTimeString()
    });

    const history = document.getElementById("history");
    history.replaceChildren();

    transactions.forEach(transaction => {
        const item = document.createElement("li");

        item.textContent =
            `${transaction.type}: ₹${transaction.amount.toLocaleString("en-IN")} — ${transaction.time}`;

        history.appendChild(item);
    });
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

function clearAmount() {
    document.getElementById("amount").value = "";
}

function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");

    document.getElementById("pin").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("loginMessage").textContent = "";
}