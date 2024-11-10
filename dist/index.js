"use strict";
class DebitAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. Remaining balance: ${this.balance}`);
        }
        else {
            console.log(`Attempted to withdraw: ${amount}. Insufficient funds. Available balance: ${this.balance}`);
        }
    }
    displayInfo() {
        console.log(`Account Number: ${this.accountNumber}, Balance: ${this.balance}`);
    }
}
class CreditAccount {
    constructor(accountNumber, balance, creditLimit) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.creditLimit = creditLimit;
        this.currentDebt = 0;
    }
    deposit(amount) {
        let effectiveAmount = amount;
        if (this.currentDebt > 0) {
            if (amount >= this.currentDebt) {
                effectiveAmount = amount - this.currentDebt;
                console.log(`Deposited ${amount}. Debt of ${this.currentDebt} cleared. New balance: ${this.balance + effectiveAmount}`);
                this.currentDebt = 0;
            }
            else {
                this.currentDebt -= amount;
                console.log(`Deposited ${amount}. Reduced debt by ${amount}. Remaining debt: ${this.currentDebt}. No change in balance.`);
                effectiveAmount = 0;
            }
        }
        else {
            this.balance += effectiveAmount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        }
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. Remaining balance: ${this.balance}`);
        }
        else {
            const overdraft = amount - this.balance;
            const availableCredit = this.creditLimit - this.currentDebt;
            if (overdraft <= availableCredit) {
                this.currentDebt += overdraft;
                this.balance = 0;
                console.log(`Withdrew total of ${amount} including overdraft of ${overdraft}. New balance: ${this.balance}. Current debt: ${this.currentDebt}`);
            }
            else {
                console.log(`Attempted to withdraw: ${amount}. Available balance: ${this.balance}, available credit: ${availableCredit}. Credit limit exceeded. Transaction cancelled.`);
            }
        }
    }
    displayInfo() {
        console.log(`Account Number: ${this.accountNumber}, Balance: ${this.balance}, Current Debt: ${this.currentDebt}`);
    }
}
const debitAccount = new DebitAccount("123456789", 1000);
const creditAccount = new CreditAccount("987654321", 500, 1000);
debitAccount.displayInfo();
debitAccount.deposit(200);
debitAccount.withdraw(500);
debitAccount.withdraw(800);
debitAccount.displayInfo();
creditAccount.displayInfo();
creditAccount.deposit(100);
creditAccount.withdraw(700);
creditAccount.displayInfo();
creditAccount.withdraw(800);
creditAccount.withdraw(500);
creditAccount.displayInfo();
