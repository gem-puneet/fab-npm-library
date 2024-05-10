(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myPackage = {}));
})(this, (function (exports) { 'use strict';

    // Import CSS

    // Function to update the progress of the progress bar
    function updateProgress(progress) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = `${progress}%`;
    }

    var modalTemplate = "<div class=\"modal\"> <div class=\"modal-content\"> <span class=\"close\">&times;</span> <h2>Modal Header</h2> <p>This is a modal example.</p> <button class=\"modal-button\">Close Modal</button> </div> </div> ";

    // Import HTML template

    // Modal component class
    class Modal {
        constructor() {
            // Append modal HTML to the document body
            document.body.innerHTML += modalTemplate;

            // Get modal element
            this.modal = document.querySelector('.modal');
            this.modalButton = document.querySelector('.modal-button');
            this.closeButton = document.querySelector('.close');

            // Event listeners to open and close the modal
            this.modalButton.addEventListener('click', this.openModal.bind(this));
            this.closeButton.addEventListener('click', this.closeModal.bind(this));
        }

        // Function to open the modal
        openModal() {
            this.modal.style.display = 'block';
        }

        // Function to close the modal
        closeModal() {
            this.modal.style.display = 'none';
        }
    }

    exports.Modal = Modal;
    exports.updateProgress = updateProgress;

}));
