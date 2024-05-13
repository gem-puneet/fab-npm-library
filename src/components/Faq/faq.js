export class FAQComponent {
    constructor(containerSelector, faqItems) {
        this.container = document.querySelector(containerSelector);
        this.faqItems = faqItems;
    }

    createHeader() {
        const header = document.createElement("header");
        header.classList.add("container-header");

        const headerText = document.createElement("div");
        headerText.classList.add("header-text");

        const faqTitle = document.createElement("div");
        faqTitle.innerHTML = "<span class='header-text-faq'>FAQs with FinBot</span><br/><span class='header-text-help'>Get help 24*7</span>";

        const svgImage = document.createElement("img");
        svgImage.classList.add("boat-img");
        svgImage.setAttribute("src", "./assets/icon/Chatbot.svg");

        headerText.appendChild(faqTitle);
        headerText.appendChild(svgImage);
        header.appendChild(headerText);
        this.container.appendChild(header);
    }

    createFAQComponent() {
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("body-container");

        this.createHeader();

        const inputElement = document.createElement("input");
        const searchImage = document.createElement("img");

        searchImage.classList.add("search-img");
        searchImage.setAttribute("src", "./assets/icon/search.svg");
        bodyContainer.appendChild(searchImage);

        inputElement.classList.add("search-box");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Cannot find what you need? Type here");

        function handleInputbox(e) {
            const inputValue = inputElement.value.trim().toLowerCase();
            faqItems.forEach(function (faqItem, index) {
                const faqContainer = document.getElementById("questions" + (index + 1));
                const image = document.getElementById("img" + (index + 1));
                if (faqItem.question.toLowerCase().includes(inputValue)) {
                    faqContainer.style.display = "block";
                    image.style.display = "block";
                } else {
                    faqContainer.style.display = "none";
                    image.style.display = "none";
                }
            });
        }

        inputElement.addEventListener("input", function (e) {
            handleInputbox(e);
        });

        bodyContainer.appendChild(inputElement);

        function toggleFAQItem(id) {
            const answerElement = document.getElementById("answer" + id);
            answerElement.classList.toggle("hidden");
            const queImage = document.getElementById("img" + id);
            if (answerElement.classList.contains("hidden")) {
                queImage.setAttribute("src", "./assets/icon/CircleDown.svg");
            } else {
                queImage.setAttribute("src", "./assets/icon/CircleUp.svg");
            }
        }

        const outerDiv = document.createElement("div");
        outerDiv.classList.add("outer-div");

        faqItems.forEach(function (faqItem, index) {
            const faqContainer = document.createElement("div");
            faqContainer.classList.add("questions-box");
            faqContainer.id = "questions" + (index + 1);

            const question = document.createElement("div");
            question.classList.add(`question`);
            question.id = "que" + (index + 1);
            question.textContent = faqItem.question;

            const answer = document.createElement("div");
            answer.classList.add("answer", "hidden");
            answer.id = "answer" + (index + 1);
            answer.textContent = faqItem.answer;

            faqContainer.appendChild(question);
            faqContainer.appendChild(answer);

            outerDiv.appendChild(faqContainer);
            const queImage = document.createElement("img");
            queImage.id = "img" + (index + 1);
            queImage.classList.add("que-img");
            queImage.setAttribute("src", "./assets/icon/CircleDown.svg");
            queImage.addEventListener("click", function () {
                toggleFAQItem(index + 1);
            });
            outerDiv.appendChild(queImage);
        });

        bodyContainer.appendChild(outerDiv);
        this.container.appendChild(bodyContainer);
    }
}

var faqItems = [
    { question: "How to create my account in FAB?", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How to create my account in FAB?", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" },
    { question: "How can I access Fab online banking", answer: "Dummy text" }
];



const faqComponent = new FAQComponent(".container-outer", faqItems);
faqComponent.createFAQComponent();
