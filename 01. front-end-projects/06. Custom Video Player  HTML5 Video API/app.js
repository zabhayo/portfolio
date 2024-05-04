// JavaScript code for controlling video playback and progress bar

// Selecting elements from the DOM
const video = document.querySelector('#video'); // Video element
const play = document.getElementById('play'); // Play button
const stop = document.querySelector('#stop'); // Stop button
const progress = document.querySelector('#progress'); // Progress bar
const timestamp = document.querySelector('#timestamp'); // Timestamp display

// Function to toggle between play and pause
function togglePlay() {
    if (video.paused) { // If video is paused, play it
        video.play();
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'; // Change play icon to pause icon
    } else { // If video is playing, pause it
        video.pause();
        play.innerHTML ='<i class="fa fa-play fa-2x"></i>'; // Change pause icon to play icon
    }
}

// Function to stop the video
function stopVideo() {
    video.currentTime = 0; // Set video playback time to the beginning
    video.pause(); // Pause the video
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; // Change pause icon to play icon
}

// Function to update the progress bar and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100; // Calculate progress percentage

    let mins = Math.floor(video.currentTime / 60); // Calculate minutes
    if (mins < 10) {
        mins = "0" + String(mins); // Add leading zero if minutes is less than 10
    }

    let secs = Math.floor(video.currentTime % 60); // Calculate seconds
    if (secs < 10) {
        secs = "0" + String(secs); // Add leading zero if seconds is less than 10
    }

    timestamp.innerHTML = `${mins}:${secs}`; // Display timestamp as minutes:seconds
}

// Function to set video playback time based on progress bar
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100; // Calculate new playback time
}

// Event Listeners
video.addEventListener("click", togglePlay); // Toggle play/pause on video click
play.addEventListener("click", togglePlay); // Toggle play/pause on button click
stop.addEventListener("click", stopVideo); // Stop video on button click

video.addEventListener("timeupdate", updateProgress); // Update progress bar and timestamp as video plays

progress.addEventListener("click", setVideoProgress); // Set video playback time on progress bar click
