// Import CSS
import './ProgressBar.css';

// Function to update the progress of the progress bar
export function updateProgress(progress) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`;
}
