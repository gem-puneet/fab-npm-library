// AnnModal.js
import "./AnnModal.css";
import AnnouncementStrip from "./AnnouncementStrip.svg";
import newSvg from "./New.svg";

const AnnModal = (options) => {
    const { questionsAnswers, onClose } = options;

    // Load CSS file dynamically
    // const loadCssFile = (url) => {
    //     const link = document.createElement('link');
    //     link.rel = 'stylesheet';
    //     link.href = url;
    //     document.head.appendChild(link);
    // };

    // loadCssFile('./AnnModal.css'); // Load the CSS file
    
    const createModal = () => {
        console.log("abc");
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "modal";
        modal.classList.add("AnnModal-modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("AnnModal-modal-content");

        const modalHeader = document.createElement("div");
        modalHeader.classList.add("AnnModal-modal-header");
        modalHeader.innerHTML = `
            <img src="${newSvg}" alt="icon" class="AnnModal-new-img">
            <h2 class="AnnModal-modal-title">Announcements!!!</h2>
            <span class="AnnModal-close">&times;</span>
        `;
        console.log("mno");
        const modalBody = document.createElement("div");
        modalBody.classList.add("AnnModal-modal-body");

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);

        // Populate modal content
        questionsAnswers.forEach(item => {
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('AnnModal-content-div');

            const contentButton = document.createElement('button');
            contentButton.innerHTML = item.button;
            contentButton.classList.add('AnnModal-content-button');

            const question = document.createElement('h3');
            question.textContent = item.question;
            question.classList.add('AnnModal-content-h3');

            const answer = document.createElement('p');
            answer.textContent = item.answer;
            answer.classList.add('AnnModal-content-p');

            contentDiv.appendChild(contentButton);
            contentDiv.appendChild(question);
            contentDiv.appendChild(answer);

            modalBody.appendChild(contentDiv);
        });

        // Append modal to the document body
        document.body.appendChild(modal);
        console.log("xyz");
        // Event listeners for closing modal
        modal.querySelector('.AnnModal-close').addEventListener('click', () => {
            closeModal();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        return modal;
    };

    const openModal = () => {
        console.log("open modal clicked");
        const modal = createModal();
        console.log("open modal clicked 2");
        modal.style.display = "block";
    };

    const closeModal = () => {
        console.log("close modal clicked");
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = "none";
            onClose(); // Call onClose callback provided by the user
        }
    };

    return {
        openModal,
        closeModal
    };
};

export default AnnModal;
