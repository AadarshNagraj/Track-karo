// js/script.js
// Wait for the page to fully load before running the map script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize the Map centered on a tier-2 city (e.g., Patiala, Punjab)
    const map = L.map('map').setView([30.3398, 76.3869], 13); // Coordinates for Patiala

    // Add OpenStreetMap tiles (free to use)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 2. Create custom icons for different vehicle types
    const busIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const autoIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const vanIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // 3. Define fake routes (line coordinates) for different vehicles
    const busRoute = [
        [30.3500, 76.3650], // Start point
        [30.3450, 76.3800],
        [30.3400, 76.3900], // Railway Station (approx)
        [30.3350, 76.4000],
        [30.3300, 76.4100]  // End point
    ];

    const autoRoute = [
        [30.3480, 76.3700],
        [30.3420, 76.3850], // Main Market (approx)
        [30.3380, 76.3950],
        [30.3320, 76.4050]
    ];

    const vanRoute = [
        [30.3520, 76.3600],
        [30.3470, 76.3750],
        [30.3430, 76.3880],
        [30.3370, 76.3980]
    ];

    // Draw the routes on the map as grey lines
    L.polyline(busRoute, {color: 'blue'}).addTo(map);
    L.polyline(autoRoute, {color: 'green'}).addTo(map);
    L.polyline(vanRoute, {color: 'orange'}).addTo(map);

    // 4. Add markers for important stops (e.g., Railway Station, Main Market)
    const mainStops = [
        {
            name: "Patiala Railway Station",
            position: [30.3400, 76.3900]
        },
        {
            name: "Main Market",
            position: [30.3420, 76.3850]
        }
    ];

    mainStops.forEach(stop => {
        L.marker(stop.position)
            .addTo(map)
            .bindPopup(`<b>${stop.name}</b>`);
    });

    // 5. Create live vehicle markers and add them to the map
    const liveVehicles = [
        {
            type: "Bus",
            number: "101",
            route: busRoute,
            marker: L.marker(busRoute[0], {icon: busIcon}).addTo(map),
            currentIndex: 0
        },
        {
            type: "Shared Auto",
            number: "",
            route: autoRoute,
            marker: L.marker(autoRoute[0], {icon: autoIcon}).addTo(map),
            currentIndex: 0
        },
        {
            type: "Shared Van",
            number: "15",
            route: vanRoute,
            marker: L.marker(vanRoute[0], {icon: vanIcon}).addTo(map),
            currentIndex: 0
        }
    ];

    // Add popups to each vehicle marker
    liveVehicles.forEach(vehicle => {
        vehicle.marker.bindPopup(`<b>${vehicle.type} ${vehicle.number}</b>`);
    });

    // 6. Function to simulate live movement
    function moveVehicles() {
        liveVehicles.forEach(vehicle => {
            // Move to the next point on the route
            vehicle.currentIndex = (vehicle.currentIndex + 1) % vehicle.route.length;
            const nextPosition = vehicle.route[vehicle.currentIndex];
            
            // Smoothly animate the marker to the new position
            vehicle.marker.setLatLng(nextPosition);
            
            // Update the popup with the new location
            vehicle.marker.setPopupContent(`<b>${vehicle.type} ${vehicle.number}</b><br>Moving to next stop...`);
        });

        // Update the ETAs in the Live List sidebar (simplified)
        updateETAs();
    }

    // 7. Simple function to update the ETAs in the sidebar (fake logic)
    function updateETAs() {
        // This is a simplified example. In a real app, you would calculate real ETAs.
        document.querySelectorAll('.badge').forEach((badge, index) => {
            const times = ["5 min", "7 min", "DUE", "12 min", "15 min"];
            badge.textContent = times[index];
        });
    }

    // 8. Move vehicles every 5 seconds to simulate live tracking
    setInterval(moveVehicles, 5000);

    // 9. Add a click event to the "Plan My Route" button
    document.querySelector('.btn-primary.w-100').addEventListener('click', function() {
        const fromInput = document.getElementById('fromInput').value;
        const toInput = document.getElementById('toInput').value;
        
        if(fromInput && toInput) {
            alert(`Planning your journey from ${fromInput} to ${toInput}...\n\nThis advanced feature would calculate the best route using real data!`);
        } else {
            alert('Please enter both start and destination locations.');
        }
    });

});
