/*
requires:

app/Core/CoreIndexView.js

 */
window.Employee = window.Employee || {};

Employee.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'employees', 'qsmitarbeiter');
    }
};