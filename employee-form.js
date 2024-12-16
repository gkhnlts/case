import { LitElement, html, css } from 'lit';

 

class EmployeeForm extends LitElement {

  static properties = {

    employee: { type: Object }

  };

 

  constructor() {

    super();

    this.employee = {

      firstName: '',

      lastName: '',

      dateOfEmployment: '',

      dateOfBirth: '',

      phoneNumber: '',

      emailAddress: '',

      department: 'Analytics',

      position: 'Junior'

    };

  }

 

  static styles = css`

    /* CSS */

  `;

 

  render() {

    return html`

      <form @submit="${this.handleSubmit}">

        <label>

          First Name:

          <input type="text" .value="${this.employee.firstName}" @input="${e => this.employee.firstName = e.target.value}" required>

        </label>

        <label>

          Last Name:

          <input type="text" .value="${this.employee.lastName}" @input="${e => this.employee.lastName = e.target.value}" required>

        </label>

        <label>

          Date of Employment:

          <input type="date" .value="${this.employee.dateOfEmployment}" @input="${e => this.employee.dateOfEmployment = e.target.value}" required>

        </label>

        <label>

          Date of Birth:

          <input type="date" .value="${this.employee.dateOfBirth}" @input="${e => this.employee.dateOfBirth = e.target.value}" required>

        </label>

        <label>

          Phone Number:

          <input type="tel" .value="${this.employee.phoneNumber}" @input="${e => this.employee.phoneNumber = e.target.value}" required>

        </label>

        <label>

          Email Address:

          <input type="email" .value="${this.employee.emailAddress}" @input="${e => this.employee.emailAddress = e.target.value}" required>

        </label>

        <label>

          Department:

          <select .value="${this.employee.department}" @change="${e => this.employee.department = e.target.value}">

            <option value="Analytics">Analytics</option>

            <option value="Tech">Tech</option>

          </select>

        </label>

        <label>

          Position:

          <select .value="${this.employee.position}" @change="${e => this.employee.position = e.target.value}">

            <option value="Junior">Junior</option>

            <option value="Medior">Medior</option>

            <option value="Senior">Senior</option>

          </select>

        </label>

        <button type="submit">Save</button>

      </form>

    `;

  }

 

  handleSubmit(event) {

    event.preventDefault();

    this.dispatchEvent(new CustomEvent('save-employee', { detail: this.employee }));

  }

}

 

customElements.define('employee-form', EmployeeForm);