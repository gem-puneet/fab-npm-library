import "./AnnouncementTicker.css"; // Import the CSS file
import loudspeakerSvg from "./loudspeaker.svg"; // Import the loudspeaker SVG

class AnnouncementTickerInstance {
    constructor() {
        this.container = null;
        this.loudspeakerSvg = loudspeakerSvg;
    }

    createTicker() {
        // Create the container
        const container = document.createElement("div");
        container.classList.add("AnnouncementTicker-container");

        // Create the title section
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("AnnouncementTicker-title");

        // Create the loudspeaker image
        const loudspeakerImg = document.createElement("img");
        loudspeakerImg.src = this.loudspeakerSvg;
        loudspeakerImg.alt = "loudspeaker-Svg";
        loudspeakerImg.classList.add("loudspeaker-svg");
        titleDiv.appendChild(loudspeakerImg);

        function rotateImage() {
            loudspeakerImg.classList.toggle('rotateLoudspeakerSvg');
        }
        setInterval(rotateImage, 2000);

        // Create the dot elements
        const dotOuter = document.createElement("span");
        dotOuter.classList.add("AnnouncementTicker-dot-outer");
        titleDiv.appendChild(dotOuter);

        const dotMiddle = document.createElement("span");
        dotMiddle.classList.add("AnnouncementTicker-dot-middle");
        titleDiv.appendChild(dotMiddle);

        const dotInner = document.createElement("span");
        dotInner.classList.add("AnnouncementTicker-dot-inner");
        titleDiv.appendChild(dotInner);

        // Create the title text
        const titleText = document.createElement("span");
        titleText.textContent = "Announcement";
        titleText.classList.add("AnnouncementTicker-title-text");
        titleDiv.appendChild(titleText);

        // Append titleDiv to container
        container.appendChild(titleDiv);

        // Create the unordered list
        const ul = document.createElement("ul");
        ul.classList.add("AnnouncementTicker-ul");

        // Create list items
        const items = [
            "This script calculates the total height needed based on the provided dimensions",
            "According to your actual design",
            "63a054b0eca6c7459d2f1ab267d98656e99311d0"
        ];

        items.forEach((itemText, index) => {
            const li = document.createElement("li");
            li.textContent = itemText;
            li.classList.add("AnnouncementTicker-li");
        
            // Check if it's the second item
            if (index === 1) {
                const linkSpan = document.createElement("span");
                linkSpan.textContent = "click here";
                linkSpan.classList.add("AnnouncementTicker-li-link");
                li.appendChild(linkSpan);
            }
        
            ul.appendChild(li);
        });
        

        // Append ul to container
        container.appendChild(ul);

        // Append container to the document body
        document.body.appendChild(container);

        // Set the container property
        this.container = container;
    }
}

const AnnouncementTicker = new AnnouncementTickerInstance();

export default AnnouncementTicker;
