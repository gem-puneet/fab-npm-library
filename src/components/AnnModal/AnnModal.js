import "./AnnModal.css";
import newSvg from "./New.svg";
import AnnouncementStripBG from "./AnnouncementStrip.svg";

const AnnModal = (options) => {
    const { questionsAnswers, onClose } = options;

    const createModal = () => {
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
            <span class="AnnModal-close">×</span>
        `;

        const modalBody = document.createElement("div");
        modalBody.classList.add("AnnModal-modal-body");

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);

        // Populate modal content
        questionsAnswers.forEach((item, index) => {
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

            // Set a fixed line height in CSS and calculate the height of two lines
            const lineHeight = 20; // Adjust this value based on your design
            const twoLinesHeight = lineHeight * 2;

            // Truncate answer to show only two lines initially
            answer.style.maxHeight = `${twoLinesHeight}px`;
            answer.style.overflow = 'hidden';

            setTimeout(() => {
                if (answer.scrollHeight > twoLinesHeight) {
                    const readMoreLink = document.createElement('a');
                    readMoreLink.textContent = 'Read More';
                    readMoreLink.classList.add('AnnModal-read-more');

                    readMoreLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        if (contentDiv.classList.contains('AnnModal-content-div-expanded')) {
                            answer.style.maxHeight = `${twoLinesHeight}px`; // Truncate to two lines when collapsing
                            readMoreLink.textContent = 'Read More';
                        } else {
                            answer.style.maxHeight = null; // Show full content when expanding
                            readMoreLink.textContent = 'Read Less';
                        }

                        contentDiv.classList.toggle('AnnModal-content-div-expanded');
                    });
        
                    contentDiv.appendChild(readMoreLink);
                }
            }, 0);

            modalBody.appendChild(contentDiv);

            // Add horizontal line between content divs
            if (index !== questionsAnswers.length - 1) {
                const hr = document.createElement('hr');
                hr.classList.add('AnnModal-horizontal-line');
                modalBody.appendChild(hr);
            }
        });

        // Append modal to the document body
        document.body.appendChild(modal);

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
        const modal = createModal();
        modal.style.display = "block";
    };

    const closeModal = () => {
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
