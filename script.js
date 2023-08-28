// Get a reference to the button and result div
const checkLocationButton = document.getElementById("checkLocation");
const resultDiv = document.getElementById("result");

//St.Anthony Illam Boys Hostel coordinates (latitude and longitude)
const universityLat = 12.870395999094573;
const universityLng = 80.22424001419108
;

// Radius in meters
const radius = 45.2;

// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
}

// Function to check the user's location
function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const distance = calculateDistance(userLat, userLng, universityLat, universityLng);

            // Display the user's location
            const userLocationDiv = document.getElementById("userLocation");
            userLocationDiv.innerHTML = `Your Location: Latitude ${userLat.toFixed(6)}, Longitude ${userLng.toFixed(6)}`;

            if (distance <= radius) {
                resultDiv.innerHTML = "You are in St.Anthony Illam Boys Hostel.";
                resultDiv.classList.add("popup"); // Add the popup class
            } else {
                resultDiv.innerHTML = "You are not in St.Anthony Illam Boys Hostel.";
                resultDiv.classList.remove("popup"); // Remove the popup class if not near
            }
        });
    } else {
        resultDiv.innerHTML = "Geolocation is not supported by your browser.";
    }
}


// Add a click event listener to the button
checkLocationButton.addEventListener("click", checkLocation);


// Get references to the custom location input fields and button
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const checkCustomLocationButton = document.getElementById("checkCustomLocation");

// Function to check a custom location
function checkCustomLocation() {
    const userLat = parseFloat(latitudeInput.value);
    const userLng = parseFloat(longitudeInput.value);

    if (isNaN(userLat) || isNaN(userLng)) {
        resultDiv.innerHTML = "Please enter valid coordinates.";
        resultDiv.classList.remove("popup");
    } else {
        const distance = calculateDistance(userLat, userLng, universityLat, universityLng);

        // Display the user's custom location
        const userLocationDiv = document.getElementById("userLocation");
        userLocationDiv.innerHTML = `Your Custom Location: Latitude ${userLat.toFixed(6)}, Longitude ${userLng.toFixed(6)}`;

        if (distance <= radius) {
            resultDiv.innerHTML = "You are near St.Anthony Illam Boys Hostel.";
            resultDiv.classList.add("popup");
        } else {
            resultDiv.innerHTML = "You are not near St.Anthony Illam Boys Hostel.";
            resultDiv.classList.remove("popup");
        }
    }
}

// Add a click event listener to the custom location button
checkCustomLocationButton.addEventListener("click", checkCustomLocation);