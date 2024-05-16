import "./AnnModal.css";
import newSvg from "./New.svg";

class AnnModalInstance {
    constructor() {
        this.questionsAnswers = [
            { button: "my button", question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
            { button: "my button", question: "Object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
            { button: "my button", question: "Scope?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
            { button: "my button", question: "Functions in JavaScript?", answer: "Functions are blocks of reusable code that perform a specific task. In JavaScript, functions are first-class objects, which means they can be passed around like any other value." },
            { button: "my button", question: "Arrays in JavaScript?", answer: "Arrays are special types of objects that store multiple values in a single variable. They are used to store collections of data, such as lists of items or sets of values." },
            { button: "my button", question: "Conditional statements in JavaScript?", answer: "Conditional statements are used to execute different code based on different conditions. The most common conditional statements in JavaScript are if, else if, and else." },
            { button: "my button", question: "Loops in JavaScript?", answer: "Loops are used to execute the same block of code repeatedly until a specified condition is met. JavaScript supports several types of loops, including for, while, and do-while loops." }
        ];
    }

    createModal() {
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
        this.questionsAnswers.forEach((item, index) => {
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
            if (index !== this.questionsAnswers.length - 1) {
                const hr = document.createElement('hr');
                hr.classList.add('AnnModal-horizontal-line');
                modalBody.appendChild(hr);
            }
        });

        // Event listeners for closing modal
        modal.querySelector('.AnnModal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal(modal);
            }
        });

        // Append modal to the document body
        document.body.appendChild(modal);

        return modal;
    }

    openModal() {
        const modal = this.createModal();
        modal.style.display = "block";
    }

    closeModal(modal) {
        if (modal && modal.parentNode) {
            console.log("closed");
            modal.parentNode.removeChild(modal);
        }
    }
}

const AnnModal = new AnnModalInstance();
export default AnnModal;
