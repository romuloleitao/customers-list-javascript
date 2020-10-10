// Customer Class: Represents a Customer
class Customer {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// UI Class: Handle UI tasks
class UI {
    static displayCustomers() {
        const customers = Store.getCustomers();

        customers.forEach((customer) => UI.addCustomerToList(customer));
    }

    static addCustomerToList(customer) {
        const list = document.querySelector('#customer-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>${customer.id}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteCustomer(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#customer-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phone').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getCustomers() {
        let customers;
        if (localStorage.getItem('customers') === null) {
            customers = [];
        } else {
            customers = JSON.parse(localStorage.getItem('customers'));
        }

        return customers;
    }

    static addCustomer(customer) {
        const customers = Store.getCustomers();

        customers.push(customer);

        localStorage.setItem('customers', JSON.stringify(customers))
    }

    static removeCustomer(id) {
        const customers = Store.getCustomers();

        customers.forEach((customer, index) => {
            if (customer.id === id) {
                customers.splice(index, 1);
            }
        });

        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

// Event: Display Customers
document.addEventListener('DOMContentLoaded', UI.displayCustomers);

// Event: Add a Customer
document.querySelector('#customer-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    // Validate
    if (id === '' || name === '' || email === '' || phone === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instantiate customer
        const customer = new Customer(id, name, email, phone);

        // Add Customer to UI
        UI.addCustomerToList(customer);

        // Add Customer to Store
        Store.addCustomer(customer);

        // Show success message
        UI.showAlert('Customer Added', 'success');

        // Clear fields
        UI.clearFields();
    }
})

// Event: Remove a Customer
document.querySelector('#customer-list').addEventListener('click', (e) => {
    // Remove customer from UI
    UI.deleteCustomer(e.target);

    // Remove customer from store
    Store.removeCustomer(e.target.parentElement.previousElementSibling.textContent);

    // Show remove message
    UI.showAlert('Customer Removed', 'success');
});