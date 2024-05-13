import './AnnModal.css'; // Import CSS file
 
const questionsAnswers = [
    { button: "my button", question: "Data types in JavaScript?", answer: "Data types in JavaScript define the data type that a variable can store. JavaScript includes primitive and non-primitive data types." },
    { button: "my button", question: "Object-oriented programming (OOP)?", answer: "OOP) is a programming paradigm that allows us to model real-world objects in our code. OOP in JavaScript is based on creating objects that have properties (features) and methods (functions that can perform actions)." },
    { button: "my button", question: "Scope?", answer: "Scope determines the accessibility of variables, objects, and functions from different parts of the code." },
    { button: "my button", question: "Functions in JavaScript?", answer: "Functions are blocks of reusable code that perform a specific task. In JavaScript, functions are first-class objects, which means they can be passed around like any other value." },
    { button: "my button", question: "Arrays in JavaScript?", answer: "Arrays are special types of objects that store multiple values in a single variable. They are used to store collections of data, such as lists of items or sets of values." },
    { button: "my button", question: "Conditional statements in JavaScript?", answer: "Conditional statements are used to execute different code based on different conditions. The most common conditional statements in JavaScript are if, else if, and else." },
    { button: "my button", question: "Loops in JavaScript?", answer: "Loops are used to execute the same block of code repeatedly until a specified condition is met. JavaScript supports several types of loops, including for, while, and do-while loops." }
    // Add more objects as needed
];
 
function openModal() {
    // Ensure DOM content is loaded before accessing elements
    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("modal");
        const modalBody = modal.querySelector('.modal-body');
        if (!modal || !modalBody) {
            console.error("Modal element or modal body not found.");
            return;
        }

        // Clear previous content
        modalBody.innerHTML = '';

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

        modal.style.display = "block";

        // Close the modal when the user clicks on the close button
        modal.querySelector('.modal-header .close').onclick = function () {
            modal.style.display = "none";
        }

        // Close the modal when the user clicks anywhere outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
}
 
export default openModal;