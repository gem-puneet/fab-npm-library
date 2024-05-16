import "./AnnouncementTicker.css";
class AnnouncementTickerInstance {
    constructor() {
        this.container = null;
    }

    createTicker() {
        // Create container
        const tickerContainer = document.createElement("div");
        tickerContainer.classList.add("AnnouncementTicker-container");

        // Create title section
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("AnnouncementTicker-title");

        const loudspeakerSvg = document.createElement("img");
        loudspeakerSvg.src = "./loudspeaker.svg";
        loudspeakerSvg.alt = "loudspeaker-Svg";
        loudspeakerSvg.classList.add("loudspeaker-svg");

        const titleText = document.createElement("span");
        titleText.textContent = "Announcement";
        titleText.classList.add("AnnouncementTicker-title-text");

        titleContainer.appendChild(loudspeakerSvg);
        titleContainer.appendChild(titleText);

        // Create list
        const announcementList = document.createElement("ul");
        announcementList.classList.add("AnnouncementTicker-ul");

        // Create list items
        const items = [
            "This script calculates the total height needed based on the provided dimensions",
            "According to your actual design",
            "63a054b0eca6c7459d2f1ab267d98656e99311d0"
        ];

        items.forEach((itemText, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("AnnouncementTicker-li");
            listItem.textContent = itemText;
            
            // Add link to the second item
            if (index === 1) {
                const linkSpan = document.createElement("span");
                linkSpan.textContent = "click here";
                linkSpan.classList.add("AnnouncementTicker-li-link");
                listItem.appendChild(linkSpan);
            }

            announcementList.appendChild(listItem);
        });

        // Append elements to container
        tickerContainer.appendChild(titleContainer);
        tickerContainer.appendChild(announcementList);

        // Append container to body
        document.body.appendChild(tickerContainer);

        this.container = tickerContainer;
    }
}

const AnnouncementTicker = new AnnouncementTickerInstance();
export default AnnouncementTicker;
