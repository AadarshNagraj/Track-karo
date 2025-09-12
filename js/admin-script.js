// js/admin-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the admin map
    const adminMap = L.map('adminMap').setView([30.3398, 76.3869], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}/.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(adminMap);

    // You can add more admin-specific map features here
    // For example: all vehicles, detailed routes, control points, etc.
    L.marker([30.3400, 76.3900])
        .addTo(adminMap)
        .bindPopup("<b>Patiala Railway Station</b><br>Major Hub")
        .openPopup();
});
