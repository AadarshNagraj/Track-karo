// js/script.js - SIMULATED/PROTOTYPE VERSION
document.addEventListener('DOMContentLoaded', function() {

    // 1. Fake Coordinates for Gwalior (Adjust based on your map image!)
    // These are percentages of the map container's width/height, not real lat/long!
    const busStops = [
        { x: 20, y: 80 },  // Stop 1
        { x: 40, y: 60 },  // Stop 2
        { x: 60, y: 40 },  // Stop 3 (Main Market)
        { x: 80, y: 20 }   // Stop 4
    ];

    const autoStops = [
        { x: 10, y: 10 },
        { x: 30, y: 30 },
        { x: 50, y: 50 }, // Railway Station
        { x: 70, y: 70 }
    ];

    // 2. Create Vehicle Objects with their fake routes
    const vehicles = [
        {
            type: 'bus',
            number: '101',
            stops: busStops,
            currentStopIndex: 0,
            element: null // Will hold the HTML element
        },
        {
            type: 'auto',
            number: '',
            stops: autoStops,
            currentStopIndex: 0,
            element: null
        }
    ];

    // 3. Function to create a marker on the static map
    function createMarker(vehicle) {
        const mapContainer = document.getElementById('static-map-container');
        const marker = document.createElement('div');
        
        marker.classList.add('moving-marker');
        marker.classList.add(vehicle.type + '-marker');
        marker.id = vehicle.type + '-' + vehicle.number;
        
        mapContainer.appendChild(marker);
        return marker;
    }

    // 4. Function to move a vehicle to its next stop
    function moveVehicle(vehicle) {
        // Get the next stop coordinates
        const nextStop = vehicle.stops[vehicle.currentStopIndex];
        
        // Position the marker (using % of container size)
        vehicle.element.style.left = nextStop.x + '%';
        vehicle.element.style.top = nextStop.y + '%';
        
        // Update the index for the next move
        vehicle.currentStopIndex = (vehicle.currentStopIndex + 1) % vehicle.stops.length;
    }

    // 5. Initialize all vehicles
    vehicles.forEach(vehicle => {
        vehicle.element = createMarker(vehicle);
        moveVehicle(vehicle); // Place them at their first stop
    });

    // 6. Move all vehicles every 3 seconds
    setInterval(function() {
        vehicles.forEach(moveVehicle);
        updateETAs(); // Also update the sidebar ETAs
    }, 3000);

    // 7. Simple function to update the ETAs in the sidebar
    function updateETAs() {
        document.querySelectorAll('.badge').forEach((badge, index) => {
            const times = ["5 min", "7 min", "DUE", "12 min", "15 min"];
            // Just cycle through the times to simulate changing data
            badge.textContent = times[Math.floor(Math.random() * times.length)];
        });
    }

    // 8. Add a click event to the "Plan My Route" button
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
