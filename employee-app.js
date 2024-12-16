import { LitElement, html, css } from 'lit';

import { router } from './router.js';

import './employee-list.js';

import './employee-form.js';

 

class EmployeeApp extends LitElement {

  static properties = {

    employees: { type: Array },

    currentPage: { type: Number },

    recordsPerPage: { type: Number },

    currentView: { type: String },

    searchTerm: { type: String },

    selectedEmployee: { type: Object }

  };

 

  constructor() {

    super();

    this.employees = JSON.parse(localStorage.getItem('employees')) || [];

    this.currentPage = 1;

    this.recordsPerPage = 5;

    this.currentView = 'list';

    this.searchTerm = '';

    this.selectedEmployee = null;

  }

 

  static styles = css`

    /* CSS */

  `;

 

  render() {

    return html`

      <nav>

        <a href="/">Home</a>

        <a href="/add">Add Employee</a>

      </nav>

      <main>

        <employee-list

          .employees="${this.filteredEmployees()}"

          .currentPage="${this.currentPage}"

          .recordsPerPage="${this.recordsPerPage}"

          .currentView="${this.currentView}"

          .searchTerm="${this.searchTerm}"

          @edit-employee="${this.handleEditEmployee}"

          @delete-employee="${this.handleDeleteEmployee}"

        ></employee-list>

        <employee-form

          .employee="${this.selectedEmployee}"

          @save-employee="${this.handleSaveEmployee}"

        ></employee-form>

      </main>

    `;

  }

 

  filteredEmployees() {

    return this.employees.filter(employee =>

      employee.name.toLowerCase().includes(this.searchTerm) ||

      employee.position.toLowerCase().includes(this.searchTerm)

    );

  }

 

  handleEditEmployee(event) {

    this.selectedEmployee = event.detail;

    router.navigate('/edit');

  }

 

  handleDeleteEmployee(event) {

    const employeeId = event.detail.id;

    this.employees = this.employees.filter(employee => employee.id !== employeeId);

    localStorage.setItem('employees', JSON.stringify(this.employees));

    this.requestUpdate();

  }

 

  handleSaveEmployee(event) {

    const employee = event.detail;

    if (employee.id) {

      // Edit existing employee

      const index = this.employees.findIndex(emp => emp.id === employee.id);

      this.employees[index] = employee;

    } else {

      // Add new employee

      employee.id = Date.now();

      this.employees.push(employee);

    }

    localStorage.setItem('employees', JSON.stringify(this.employees));

    this.selectedEmployee = null;

    router.navigate('/');

  }

}

 

customElements.define('employee-app', EmployeeApp);