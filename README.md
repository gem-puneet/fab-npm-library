//File & folder structure
************************************************************************************************

config/: Contains the configuration file for Rollup (rollup.config.js).
dist/: Output directory for the bundled files.
src/: Source code directory, same as before.
tests/: Directory for unit tests.
node_modules/: Directory containing installed npm packages (auto-generated).
package.json: Configuration file for npm, containing metadata and dependencies.
README.md: Markdown file containing information about your package.
LICENSE: File containing the license for your package.

************************************************************************************************


//rollup.config.js
************************************************************************************************

input: Specifies the entry point for bundling, which is index.js in the src/ directory.
output: Specifies the output file and format. Here, we're outputting a UMD bundle named fab-plugins-library.js with the name myPackage.
plugins: Includes Rollup plugins to handle HTML and CSS files. rollup-plugin-html is used to handle HTML files, and rollup-plugin-postcss is used to handle CSS files.
handling JavaScript files is the default behavior of Rollup,Rollup will handle the JavaScript files imported in your index.js (and any files imported by those JavaScript files) without the need for additional plugins.

************************************************************************************************

// test case of modal and progressbar
************************************************************************************************

//in react project
******************

index.js
________

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import project-specific CSS
import 'fab-plugins-library/dist/fab-plugins-library.css'; // Import fab-plugins-library CSS
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));


App.js
______

import React, { useEffect } from 'react';
import { Modal, updateProgress } from 'fab-plugins-library';

function App() {
    useEffect(() => {
        // Initialize modal
        const modal = new Modal();

        // Open modal when component mounts
        modal.openModal();

        // Close modal after 3 seconds
        setTimeout(() => {
            modal.closeModal();
        }, 3000);
    }, []);

    return (
        <div>
            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>
            <button onClick={() => updateProgress(50)}>Update Progress</button>
        </div>
    );
}

export default App;



// In simple js project
***********************

<!-- <link rel="stylesheet" href="path/to/fab-plugins-library.css"> // to include css -->

<!-- <div class="progress-bar-container">
    <div class="progress-bar"></div>
</div>
<button onclick="updateProgress(50)">Update Progress</button>

<script>
    // Initialize modal
    const modal = new Modal();
</script> -->


************************************************************************************************
