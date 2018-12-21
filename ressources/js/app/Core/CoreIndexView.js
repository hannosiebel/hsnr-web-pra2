/*
requires:

app/Core/CoreView.js
*/

window.Core = window.Core || {};

Core.IndexView = class IndexView extends Core.CoreView {
    constructor(template_spl, eventController_to_publish, path_to_ressource) {
        super(template_spl);
        this.ressource_path = path_to_ressource;
        this.eventController = eventController_to_publish;
    }

    index() {
        Core.CoreRequest.get(this.ressource_path)
            .then(data => this.render(data))
            .catch(err => alert(err));
    }

    delete(id) {
        Core.CoreRequest.delete(this.ressource_path + '/' + id)
            .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
            .catch(err => alert(err));
    }

    eventHandler(event, that) {
        if (event.target.tagName.toLowerCase() === "td") {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement !== false) {
                selectedElement.classList.remove("clSelected");
            }

            event.target.parentNode.classList.add("clSelected");
            event.preventDefault();
        }

        if (event.target.id === "showEntry") {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement === false) {
                alert("Bitte zuerst einen Eintrag auswählen!");
                return;
            }

            APPUTIL.es_o.publish_px(that.eventController, ["show", selectedElement.id]);
            event.preventDefault();
        }

        if (event.target.id === 'deleteEntry') {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement === false) {
                alert("Bitte zuerst einen Eintrag auswählen!");
                return;
            }

            APPUTIL.es_o.publish_px(that.eventController, ["delete", selectedElement.id]);
            event.preventDefault();
        }

        if (event.target.id === 'createEntry') {
            APPUTIL.es_o.publish_px(that.eventController, ["create", null]);
        }
    }

    getSelectedEntry() {
        let selectedEntry = document.querySelector(".clSelected");

        if (selectedEntry == null) {
            return false;
        }

        return selectedEntry;
    }
};