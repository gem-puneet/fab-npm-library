// Import HTML template
import modalTemplate from './Modal.html';

// Import CSS
import './Modal.css';

// Modal component class
export class Modal {
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
