document.addEventListener("DOMContentLoaded", function () {
    console.log("Super script is running!");

    // Get today's date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Select all event cards
    document.querySelectorAll(".notion-collection-card__anchor").forEach(card => {
        // Find the date inside the same card
        const dateElement = card.closest(".notion-collection-card")?.querySelector(".notion-property__date");

        if (dateElement) {
            const dateText = dateElement.innerText.trim();
            console.log("Found date:", dateText);

            // Convert date text to Date object
            const eventDate = new Date(Date.parse(dateText));
            eventDate.setHours(0, 0, 0, 0);

            console.log("Converted Date:", eventDate);

            // Check if the event is in the past
            if (!isNaN(eventDate) && eventDate < today) {
                console.log("Past event detected:", dateText);
                card.style.backgroundColor = "red"; // Change background to red
            }
        }
    });
});
