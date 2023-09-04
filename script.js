// Coordinates and radii for different hostels
const hostelData = {
    St_Anthony_Illam_Boys_Hostel: { lat: 12.870395999094573, lng: 80.22424001419108, radius: 45.2 },
    MGR_IllamBoys_Hostel: { lat: 12.871296988176596, lng: 80.21899597808388, radius: 70 },
    Gopalakrishnan_Illam_Boys_Hostel: { lat: 12.872120382563974, lng: 80.21933513902287, radius: 50 }
};

// Get references to the HTML elements
const checkCustomLocationButton = document.getElementById("checkCustomLocation");
const autoLocationButton = document.getElementById("autoLocation");
const userLocationDiv = document.getElementById("userLocation");
const resultDiv = document.getElementById("result");
const attendancePopup = document.getElementById("attendancePopup");
const giveAttendanceButton = document.getElementById("giveAttendance");
const attendanceSuccess = document.getElementById("attendanceSuccess");

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

// Function to get the user's location automatically
function getAutoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Update the latitude and longitude input fields
            document.getElementById("latitude").value = userLat.toFixed(6);
            document.getElementById("longitude").value = userLng.toFixed(6);

            userLocationDiv.innerHTML = `Your Location: Latitude ${userLat.toFixed(6)}, Longitude ${userLng.toFixed(6)}`;
        });
    } else {
        resultDiv.innerHTML = "Geolocation is not supported by your browser.";
    }
}

// Function to show the attendance popup
function showAttendancePopup() {
    attendancePopup.style.display = "block";
}

// Function to give attendance
function giveHostelAttendance() {
    attendanceSuccess.style.display = "block";
    giveAttendanceButton.disabled = true;
}

// Function to check proximity to a selected hostel
function checkCustomLocation() {
    const selectedHostel = document.getElementById("hostel").value;
    const userLat = parseFloat(document.getElementById("latitude").value);
    const userLng = parseFloat(document.getElementById("longitude").value);

    if (isNaN(userLat) || isNaN(userLng)) {
        resultDiv.innerHTML = "Please enter valid coordinates.";
        resultDiv.classList.remove("popup");
    } else {
        const hostel = hostelData[selectedHostel];
        const distance = calculateDistance(userLat, userLng, hostel.lat, hostel.lng);

        // Display the user's custom location
        userLocationDiv.innerHTML = `Your Custom Location: Latitude ${userLat.toFixed(6)}, Longitude ${userLng.toFixed(6)}`;

        if (distance <= hostel.radius) {
            resultDiv.innerHTML = `You are near ${selectedHostel} Boys Hostel.`;
            resultDiv.classList.add("popup");
            
            // Show attendance popup
            showAttendancePopup();
        } else {
            resultDiv.innerHTML = `You are not near ${selectedHostel} Boys Hostel.`;
            resultDiv.classList.remove("popup");
        }
    }
}

// Add click event listeners to the buttons
autoLocationButton.addEventListener("click", getAutoLocation);
checkCustomLocationButton.addEventListener("click", checkCustomLocation);
giveAttendanceButton.addEventListener("click", giveHostelAttendance);

// ...

// Function to give attendance
function giveHostelAttendance() {
    const selectedHostel = document.getElementById("hostel").value;
    const userLat = parseFloat(document.getElementById("latitude").value);
    const userLng = parseFloat(document.getElementById("longitude").value);

    if (isNaN(userLat) || isNaN(userLng)) {
        resultDiv.innerHTML = "Please enter valid coordinates.";
        resultDiv.classList.remove("popup");
    } else {
        const hostel = hostelData[selectedHostel];
        const distance = calculateDistance(userLat, userLng, hostel.lat, hostel.lng);

        if (distance <= hostel.radius) {
            attendanceSuccess.style.display = "block";
            giveAttendanceButton.disabled = true;
        } else {
            resultDiv.innerHTML = "You are not near the selected hostel. Attendance cannot be given.";
            resultDiv.classList.remove("popup");
        }
    }
}

// Function to close the attendance popup
function closeAttendancePopup() {
    attendancePopup.style.display = "none";
}

// Add a click event listener to the close icon
const closeIcon = document.getElementById("closeIcon");
closeIcon.addEventListener("click", closeAttendancePopup);


// ...
