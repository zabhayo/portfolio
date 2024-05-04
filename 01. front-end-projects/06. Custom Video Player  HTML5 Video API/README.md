# Video Player

This JavaScript code provides functionality for a basic video player with play, pause, stop, progress bar, and timestamp display features.

## Features

- **Play/Pause**: Clicking the play button toggles between playing and pausing the video.
- **Stop**: Clicking the stop button stops the video and resets playback to the beginning.
- **Progress Bar**: The progress bar visually indicates the current position of the video and allows users to seek to different parts of the video by clicking on it.
- **Timestamp Display**: Shows the current playback time in minutes and seconds.

## Usage

1. Include the provided JavaScript code in your HTML file.
2. Ensure that your HTML file contains elements with IDs `video` (for the video element), `play` (for the play/pause button), `stop` (for the stop button), `progress` (for the progress bar), and `timestamp` (for the timestamp display).
3. Add Font Awesome icons for play and pause (`fa-play` and `fa-pause` classes) to the play button.
4. The video will be controlled through the play/pause button, stop button, and progress bar.
5. The timestamp display shows the current playback time in the format `mm:ss`.

## Functions

- `togglePlay()`: Toggles between play and pause states of the video.
- `stopVideo()`: Stops the video and resets playback time to the beginning.
- `updateProgress()`: Updates the progress bar and timestamp display as the video plays.
- `setVideoProgress()`: Sets the video playback time based on the position of the progress bar.

## Event Listeners

- Click on the video or play button to toggle play/pause.
- Click on the stop button to stop the video.
- As the video plays, the progress bar and timestamp display are updated accordingly.
- Click on the progress bar to set the video playback time.
