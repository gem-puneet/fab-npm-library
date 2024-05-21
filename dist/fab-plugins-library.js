(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fabPluginsLibrary = factory());
})(this, (function () { 'use strict';

    // // Import modal and progress bar components
    // import { updateProgress } from './components/ProgressBar/ProgressBar.js';
    // import { Modal } from './components/Modal/Modal.js'; // This imports the modal component and its associated CSS and HTML files
    // import TourGuide from './components/tourGuide/tourGuide.js';
    // import AnnModal from './components/AnnModal/AnnModal.js';
    // import { FAQComponent } from './components/Faq/faq.js';
    // import { HeadingComponent } from './components/Heading/heading.js';
    // import AnnouncementTicker from './components/AnnouncementTicker/AnnouncementTicker.js';

    // // Export components or functions as needed
    // export { updateProgress, Modal, TourGuide, AnnModal, FAQComponent, HeadingComponent, AnnouncementTicker };

    function square(number) {
        return number * number;
    }

    var index = { square };

    return index;

}));
