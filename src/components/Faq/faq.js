import ChatbotIcon from "./assets/icon/Chatbot.svg";
import MessageIconImg from "./assets/icon/MessageIocn.svg";
import SearchIcon from "./assets/icon/search.svg";
import CircleDownIcon from "./assets/icon/CircleDown.svg";
import CircleUpIcon from "./assets/icon/CircleUp.svg";
 import "./faq.css";

var faqItems = [
    { question: "How do I open a bank account with FAB?", answer: "To create your account with FAB, you can visit their website and follow the instructions for account opening. You may need to provide personal information and identification documents" },
    { question: " What are the requirements for opening a bank account with FAB?", answer: "Typically, you will need to provide proof of identity such as a passport or national ID card, proof of address, and possibly other documents depending on the type of account you wish to open." },
    { question: "How can I access FAB's online banking services?", answer: "You can access FAB's online banking by visiting their website and logging in with your account credentials. Alternatively, you may download their mobile banking app from the App Store or Google Play Store and log in using your account details." },
    { question: "What services are offered through FAB's online banking platform?", answer: "FAB's online banking platform typically offers services such as account balance inquiries, fund transfers, bill payments, account statements, and more, depending on the specific features available to you as a customer." },
    { question: "Is there a mobile app for FAB's banking services?", answer: "Yes, FAB usually offers a mobile banking app that allows customers to conveniently access banking services on their smartphones or tablets. You can download the app from the App Store or Google Play Store." },
    { question: "How do I reset my online banking password with FAB?", answer: "If you forget your online banking password with FAB, you can usually initiate a password reset process through their website or mobile app. Follow the prompts to verify your identity and create a new password." },
    { question: "What should I do if I notice suspicious activity on my FAB account?", answer: " If you suspect unauthorized activity on your FAB account, it's important to contact the bank immediately. They will guide you through the necessary steps to secure your account and investigate any fraudulent transactions." },
    { question: "Can I link external accounts to my FAB account for transfers?", answer: "Yes, FAB typically allows customers to link external accounts for fund transfers. You may need to verify ownership of the external account before initiating transfers." },
    { question: "What are the fees associated with FAB's banking services?", answer: " Fees vary depending on the type of account and services you use. Common fees may include account maintenance fees, transaction fees, ATM withdrawal fees, and international transfer fees. It's best to consult FAB's fee schedule or contact their customer service for specific information" },
    { question: "How long does it take for a fund transfer to be processed through FAB?", answer: "The processing time for fund transfers with FAB can vary depending on factors such as the destination of the transfer and the transfer method used. Domestic transfers may be processed within the same business day, while international transfers may take a few business days to complete." }
];

export class FAQComponent {
    constructor(containerElement) {
        this.faqOuterDiv = containerElement;
      }
    createHeader() {
        const header = document.createElement("div");
        header.classList.add("faq-container-header");

        const headerText = document.createElement("div");
        headerText.classList.add("faq-header-text");

        const faqTitle = document.createElement("div");
        faqTitle.innerHTML = "<span class='header-text-faq'>FAQs with FinBot</span><br/><span class='faq-header-text-help'>Get help 24*7</span>";

        const svgImage = document.createElement("img");
        svgImage.classList.add("faq-boat-img");
        svgImage.setAttribute("src", ChatbotIcon);

        const MessageIcon = document.createElement("img");
        MessageIcon.classList.add("faq-msz-img");
        MessageIcon.setAttribute("src", MessageIconImg);
        
        const closeIcon = document.createElement("span");
        closeIcon.classList.add("close-icon");
        closeIcon.textContent = "×";
        closeIcon.addEventListener("click", function() {
        faqOuterDiv.style.display = "none"; 
        });

        headerText.appendChild(faqTitle);
        headerText.appendChild(svgImage);
        headerText.appendChild(MessageIcon);
        headerText.appendChild(closeIcon);
        header.appendChild(headerText);
        return header;
    }

    createFAQComponent() {
        const FAQContainerOuter = document.createElement("div");
        FAQContainerOuter.classList.add("faq-container-outer position-bottom-right");
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("faq-body-container");

        var FAQHeader = this.createHeader();

        FAQContainerOuter.appendChild(FAQHeader);

            
        FAQContainerOuter.querySelector('.close-icon').addEventListener('click', () => {
            this.closeFAQ(FAQContainerOuter);
        });
        const inputElement = document.createElement("input");
        const searchImage = document.createElement("img");

        searchImage.classList.add("faq-search-img");
        searchImage.setAttribute("src", SearchIcon);
        bodyContainer.appendChild(searchImage);

        inputElement.classList.add("faq-search-box");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Cannot find what you need? Type here");

        const handleInputbox = () => {
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
            answerElement.classList.toggle("faq-hidden");
            const queImage = document.getElementById("img" + id);
            if (answerElement.classList.contains("faq-hidden")) {
                queImage.setAttribute("src", CircleDownIcon);
            } else {
                queImage.setAttribute("src", CircleUpIcon);
            }
        }

        const outerDiv = document.createElement("div");
        outerDiv.classList.add("faq-outer-div");

        faqItems.forEach(function (faqItem, index) {
            const faqContainer = document.createElement("div");
            faqContainer.classList.add("faq-questions-box");
            faqContainer.id = "questions" + (index + 1);

            const question = document.createElement("div");
            question.classList.add(`faq-question`);
            question.id = "que" + (index + 1);
            question.textContent = faqItem.question;

            const answer = document.createElement("div");
            answer.classList.add("faq-answer", "faq-hidden");
            answer.id = "answer" + (index + 1);
            answer.textContent = faqItem.answer;

            faqContainer.appendChild(question);
            faqContainer.appendChild(answer);

            outerDiv.appendChild(faqContainer);
            const queImage = document.createElement("img");
            queImage.id = "img" + (index + 1);
            queImage.classList.add("faq-que-img");
            queImage.setAttribute("src", CircleDownIcon);
            queImage.addEventListener("click", function () {
                toggleFAQItem(index + 1);
            });
            outerDiv.appendChild(queImage);
        });      
        bodyContainer.appendChild(outerDiv);
        FAQContainerOuter.appendChild(bodyContainer);

        document.body.appendChild(FAQContainerOuter);

        return FAQContainerOuter;
    }

    openFAQ() {
        const FAQCont = this.createFAQComponent();
        FAQCont.style.display = "block";
    }

    closeFAQ(FAQContainerOuter) {
        if (FAQContainerOuter && FAQContainerOuter.parentNode) {
            FAQContainerOuter.parentNode.removeChild(FAQContainerOuter);
        }
    }
}


const FAQGuide = new FAQComponent();
export default FAQGuide;

