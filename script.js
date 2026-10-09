// ==================================
// CHESS UNIVERSE — CORE INTERACTIONS
// ==================================

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

// Mobile navigation
if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after selecting a navigation link
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });
}

// Smooth navigation and active link feedback
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Console message for developers
console.log(
    "%c♟ CHESS UNIVERSE",
    "color:#61f5c5;font-size:24px;font-weight:bold;"
);

console.log("Welcome to your own chess universe.");
console.log("Build 001 — Website interface initialized.");
