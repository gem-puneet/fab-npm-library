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
            console.log("h3 created")
            const answer = document.createElement('p');
            answer.textContent = item.answer;
            answer.classList.add('AnnModal-content-p');

            // Calculate line height for the paragraph
            const lineHeight = calculateLineHeight(answer);

            console.log("p created")
            // Check if the paragraph content exceeds a certain height (equivalent to two lines)
            // Check if the paragraph content exceeds a certain height
            if (isLongContent(answer, lineHeight)) {
                console.log("inside isLong 1")
                const readMoreLink = document.createElement('a');
                readMoreLink.textContent = 'Read More';
                readMoreLink.classList.add('AnnModal-read-more');
                readMoreLink.href = '#'; // Add your link destination here
                console.log("inside isLong 2")

                // Add click event listener to toggle between full and truncated content
                readMoreLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    contentDiv.classList.toggle('AnnModal-content-div-expanded');
                    readMoreLink.textContent = contentDiv.classList.contains('AnnModal-content-div-expanded') ? 'Read Less' : 'Read More';
                });

                // Append "Read More" link to contentDiv
                contentDiv.appendChild(readMoreLink);
                console.log("inside isLong 3")
            }

            console.log("inside isLong 5")
            contentDiv.appendChild(contentButton);
            contentDiv.appendChild(question);
            contentDiv.appendChild(answer);

            modalBody.appendChild(contentDiv);
            console.log("inside isLong 6")
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


    // Function to calculate line height for a paragraph
    const calculateLineHeight = (element) => {
        console.log("Calculating line height...");
        console.log("Element:", element);
        console.log("Computed style:", window.getComputedStyle(element));
        if (!(element instanceof Element)) {
            console.error("Invalid element:", element);
            return 0; // Return a default line height
        }
        console.log("Line height:", window.getComputedStyle(element).getPropertyValue("line-height"));

        const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
        console.log("Line height:", lineHeight);
        return lineHeight;
    };

    // Function to check if the paragraph content exceeds a certain height
    const isLongContent = (element, lineHeight) => {
        console.log("abc")
        console.log("x", element.scrollHeight)
        console.log("y", 2 * lineHeight)
        return element.scrollHeight > 2 * lineHeight;
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
