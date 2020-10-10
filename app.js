// Customer Class: Represents a Customer
class Customer {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// UI Class: Handle UI tasks
class UI {
    static displayCustomers() {
        const StoredCustomers = [{
                name: 'Harry Benneton',
                email: 'hbenneton@mail.com',
                phone: '999-555-555'
            },
            {
                name: 'Cindy Foster',
                email: 'cfoster@mail.com',
                phone: '666-658-458'
            }
        ];

        const customers = StoredCustomers;

        customers.forEach((customer) => UI.addCustomerToList(customer));
    }

    static addCustomerToList(customer) {
        const list = document.querySelector('#customer-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteCustomer(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phone').value = '';
    }
}

// Store Class: Handles Storage

// Event: Display Customers
document.addEventListener('DOMContentLoaded', UI.displayCustomers);

// Event: Add a Customer
document.querySelector('#customer-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    // Instantiate customer
    const customer = new Customer(name, email, phone);

    // Add Customer to UI
    UI.addCustomerToList(customer);

    // Clear fields
    UI.clearFields();
})

// Event: Remove a Customer
document.querySelector('#customer-list').addEventListener('click', (e) => {
    UI.deleteCustomer(e.target);
});