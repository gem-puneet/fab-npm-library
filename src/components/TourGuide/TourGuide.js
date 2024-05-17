import { driver } from "driver.js";
import 'driver.js/dist/driver.css';
import './TourGuide.css';
import configSteps from '../../clientConfig.json';

const TourGuide = () => {
    const step = configSteps.page1.contextualGuide.steps;
    const theme = configSteps.page1.contextualGuide.theme.default;
    let driverSteps = [];

    step.forEach(step => {
        const [side, align] = step.position.split('-');
        driverSteps.push({
            element: step.targetSelector,
            popover: {
                title: step.title,
                description: step.content,
                side: side,
                align: align
            }
        });
    });

    if (theme === "#fde047") {
        driverSteps.forEach((step) => {
            step.popover.popoverClass = 'driverjs-theme';
        });

        const yellowDriverObj = driver({
            showProgress: true,
            animate: false,
            nextBtnText: '—›',
            prevBtnText: '‹—',
            doneBtnText: '✕',
            steps: driverSteps
        });

        return yellowDriverObj.drive();

    } else {
        const defaultDriverObj = driver({
            showProgress: true,
            animate: false,
            steps: driverSteps
        });

        return defaultDriverObj.drive();

    }
};

export default TourGuide;