import { driver } from "driver.js";
import 'driver.js/dist/driver.css';
import './TourGuide.css';
import configSteps from '../../clientConfig.json';

const TourGuide = (theme, steps) => {
    const step = configSteps.page1.contextualGuide.steps;
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

    console.log("configSteps",configSteps);
    console.log("1st Arr",driverSteps);

    if (theme === "yellow") {
        console.log("2nd Arr",driverSteps);
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
        console.log("3rd Arr",driverSteps);
        const defaultDriverObj = driver({
            showProgress: true,
            animate: false,
            steps: steps
        });

        return defaultDriverObj.drive();

    }
};

export default TourGuide;