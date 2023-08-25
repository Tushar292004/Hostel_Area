document.addEventListener("DOMContentLoaded", function() {
    const getLocationButton = document.getElementById("getLocation");
    const resultPopup = document.getElementById("result");
    const message = document.getElementById("message");
    const closeBtn = document.getElementById("closeBtn");

    // Define the latitude and longitude coordinates for Times Square, New York
    const timesSquareCoordinates = {
        latitude: 40.758896,
        longitude: -73.985130
    };

    // Define a radius for the Times Square area (you can adjust this as needed)
    const timesSquareRadius = 0.01; // This is a small radius for demonstration purposes

    getLocationButton.addEventListener("click", function() {
        if ("geolocation" in navigator) {
            // Use the Geolocation API to get the user's location
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;

                // Calculate the distance between user's location and Times Square
                const distance = calculateDistance(userLatitude, userLongitude, timesSquareCoordinates.latitude, timesSquareCoordinates.longitude);

                // Check if the user's location is within the predefined radius of Times Square
                if (distance <= timesSquareRadius) {
                    message.textContent = "Your location is near Times Square, New York.";
                } else {
                    message.textContent = "Your location is not near Times Square, New York.";
                }

                resultPopup.style.display = "block";
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });

    closeBtn.addEventListener("click", function() {
        resultPopup.style.display = "none";
    });

    // Function to calculate the distance between two sets of latitude and longitude coordinates
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515; // Distance in miles
        return dist;
    }
});
