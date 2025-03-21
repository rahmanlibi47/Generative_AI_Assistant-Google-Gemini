console.log("Super external script is running!");
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".notion-collection-card__anchor").forEach(card => {
        card.style.backgroundColor = "blue";
    });
});
