(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fabPluginsLibrary = {}));
})(this, (function (exports) { 'use strict';

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

    var src = { square };
    var src_1 = src.square;

    exports.default = src;
    exports.square = src_1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
