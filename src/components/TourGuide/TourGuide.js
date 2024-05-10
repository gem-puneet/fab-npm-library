import { driver } from "driver.js";
import 'driver.js/dist/driver.css';
import './TourGuide.css';

const TourGuide = (theme, steps) => {

    if (theme === "yellow") {

        steps.forEach((step) => {
            step.popover.popoverClass = 'driverjs-theme';
        });

        const yellowDriverObj = driver({
            showProgress: true,
            animate: false,
            nextBtnText: '—›',
            prevBtnText: '‹—',
            doneBtnText: '✕',
            steps: steps
        });

        return yellowDriverObj.drive();

    } else {

        const defaultDriverObj = driver({
            showProgress: true,
            animate: false,
            steps: steps
        });

        return defaultDriverObj.drive();

    }
};

export default TourGuide;