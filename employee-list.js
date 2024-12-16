import { LitElement, html, css } from 'lit';

 

class EmployeeList extends LitElement {

  static properties = {

    employees: { type: Array },

    currentPage: { type: Number },

    recordsPerPage: { type: Number },

    currentView: { type: String },

    searchTerm: { type: String }

  };

 

  static styles = css`

    /* CSS */

  `;

 

  render() {

    return html`

      <div>

        <label for="viewSelect">Select View:</label>

        <select id="viewSelect" @change="${this.changeView}">

          <option value="list">List</option>

          <option value="table">Table</option>

        </select>

      </div>

      <div>

        <label for="searchInput">Search:</label>

        <input type="text" id="searchInput" placeholder="Search employees..." @input="${this.updateSearchTerm}">

      </div>

      <div id="employeeContainer">

        ${this.currentView === 'list' ? this.renderList() : this.renderTable()}

      </div>

      <div id="pagination">

        <button @click="${this.prevPage}">Previous</button>

        <span>Page ${this.currentPage} of ${Math.ceil(this.employees.length / this.recordsPerPage)}</span>

        <button @click="${this.nextPage}">Next</button>

      </div>

    `;

  }

 

  changeView(event) {

    this.currentView = event.target.value;

  }

 

  updateSearchTerm(event) {

    this.searchTerm = event.target.value.toLowerCase();

  }

 

  renderList() {

    const employeesToShow = this.employees.slice((this.currentPage - 1) * this.recordsPerPage, this.currentPage * this.recordsPerPage);

    return html`

      <ul>

        ${employeesToShow.map(employee => html`

          <li>

            ${employee.name} - ${employee.position}

            <button @click="${() => this.editEmployee(employee)}">Edit</button>

            <button @click="${() => this.deleteEmployee(employee)}">Delete</button>

          </li>

        `)}

      </ul>

    `;

  }

 

  renderTable() {

    const employeesToShow = this.employees.slice((this.currentPage - 1) * this.recordsPerPage, this.currentPage * this.recordsPerPage);

    return html`

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Position</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          ${employeesToShow.map(employee => html`

            <tr>

              <td>${employee.name}</td>

              <td>${employee.position}</td>

              <td>

                <button @click="${() => this.editEmployee(employee)}">Edit</button>

                <button @click="${() => this.deleteEmployee(employee)}">Delete</button>

              </td>

            </tr>

          `)}

        </tbody>

      </table>

    `;

  }

 

  prevPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }

 

  nextPage() {

    if (this.currentPage * this.recordsPerPage < this.employees.length) {

      this.currentPage++;

    }

  }

 

  editEmployee(employee) {

    this.dispatchEvent(new CustomEvent('edit-employee', { detail: employee }));

  }

 

  deleteEmployee(employee) {

    this.dispatchEvent(new CustomEvent('delete-employee', { detail: employee }));

  }

}

 

customElements.define('employee-list', EmployeeList);