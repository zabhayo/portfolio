// Selecting DOM elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

// Initialize movie price from the selected value in the dropdown
let moviePrice = movieSelect.value;

// Function to save selected movie data to localStorage
function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Function to update the price and count of selected seats
const updatePrice = () => {
    // Selecting all currently selected seats
    let selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Counting the number of selected seats
    selectedSeatsCount = selectedSeats.length;

    // Updating the count displayed on the UI
    count.innerText = selectedSeatsCount;
    
    // Calculating the total price based on the number of selected seats and movie price
    total.innerText = selectedSeatsCount * moviePrice;

    // Mapping the index of selected seats and saving them to localStorage
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
};

// Function to populate UI with saved data from localStorage
function populateUI() {
    // Retrieving selected seats from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    // If there are selected seats, mark them as selected on UI
    if (selectedSeats) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    // Selecting the previously selected movie from localStorage
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event listener for change in movie selection
movieSelect.addEventListener("change", (e) => {
    // Update movie price and save the selected movie data
    moviePrice = +e.target.value;
    saveMovieData(e.target.selectedIndex, e.target.value);
    // Update the displayed price and count
    updatePrice();
});

// Event listener for selecting seats
container.addEventListener("click", (e) => {
    // Toggle seat selection only if it's not occupied
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        // Update the displayed price and count
        updatePrice();
    }
});

// Initial population of UI with saved data
populateUI();
// Initial update of price and count
updatePrice();
