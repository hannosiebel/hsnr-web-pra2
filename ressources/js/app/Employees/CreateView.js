/*
requires:

app/Core/CoreCreateView.js

 */
window.Employees = window.Employees || {};

Employees.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'first_name': 'required',
            'last_name': 'required',
            'type': 'required|min:1|max:2'
        };

        super(template_spl, 'employees', 'qsmitarbeiter', validation);
    }
};