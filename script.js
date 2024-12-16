document.addEventListener("DOMContentLoaded", function () {
    const eventsContainer = document.getElementById("events-container");
    const createEventForm = document.getElementById("createEventForm");
    const ticketContainer = document.getElementById("ticket-container");
    const ticketDetails = document.getElementById("ticket-details");

    let events = JSON.parse(localStorage.getItem("events")) || [];

    // Display Events
    function displayEvents() {
        eventsContainer.innerHTML = "";
        events.forEach((event, index) => {
            eventsContainer.innerHTML += `
                <div class="event">
                    <img src="${event.image}" alt="Event Image" class="event-image"/>
                    <h3>${event.name}</h3>
                    <p>${event.date}</p>
                    <p>${event.description}</p>
                    <button onclick="registerEvent(${index})">Register</button>
                    <button onclick="deleteEvent(${index})" class="delete-btn">Delete</button>
                </div>`;
        });

        localStorage.setItem("events", JSON.stringify(events));
    }

    // Create Event
    if (createEventForm) {
        createEventForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const eventName = document.getElementById("eventName").value;
            const eventDate = document.getElementById("eventDate").value;
            const eventDescription = document.getElementById("eventDescription").value;
            const eventImage = document.getElementById("eventImage").files[0];

            if (eventImage) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageData = e.target.result;
                    events.push({
                        name: eventName,
                        date: eventDate,
                        description: eventDescription,
                        image: imageData
                    });

                    localStorage.setItem("events", JSON.stringify(events));
                    alert("Event Created Successfully!");
                    window.location.href = "index.html";
                };
                reader.readAsDataURL(eventImage);
            }
        });
    }

    // Register Event and Show Ticket
    window.registerEvent = function (index) {
        const ticketId = "TICKET-" + Math.floor(Math.random() * 1000000);
        const selectedEvent = events[index];

        ticketDetails.innerHTML = `
            <p><strong>Event Name:</strong> ${selectedEvent.name}</p>
            <p><strong>Date:</strong> ${selectedEvent.date}</p>
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
        `;

        ticketContainer.style.display = "block";
        ticketContainer.scrollIntoView({ behavior: "smooth" });
    };

    // Delete Event
    window.deleteEvent = function (index) {
        if (confirm("Are you sure you want to delete this event?")) {
            events.splice(index, 1);
            displayEvents();
        }
    };

    if (eventsContainer) displayEvents();
});
