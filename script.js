document.addEventListener("click", () => {
    document.getElementById("backgroundMusic").play().catch(() => {});
}, { once: true });

let yesClicks = 0;
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const title = document.getElementById("title");
const catImage = document.getElementById("catImage");
const countdownTitle = document.getElementById("countdownTitle");
const countdown = document.getElementById("countdown");
const resetButton = document.getElementById("resetButton");

yesButton.addEventListener("click", () => {
    yesClicks++;
    if (yesClicks === 1) {
        title.innerText = "Are you sure?";
    } else if (yesClicks === 2) {
        title.innerText = "Blow me a kiss first.";
        yesButton.innerText = "Done";
    } else if (yesClicks === 3) {
        title.innerText = "Perfect. Let's Grab Dinner. Wear something Cute.";
        yesButton.classList.add("hidden");
        countdownTitle.classList.remove("hidden");
        countdown.classList.remove("hidden");
        resetButton.classList.remove("hidden");
        startCountdown();
    }
    catImage.src = "images/cat_2.gif"; // Updated from PNG to GIF
});

noButton.addEventListener("click", () => {
    const maxX = window.innerWidth - noButton.clientWidth - 20;
    const maxY = window.innerHeight - noButton.clientHeight - 20;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    catImage.src = "images/cat_3.gif";
});

resetButton.addEventListener("click", () => {
    localStorage.removeItem("countdownTime");
    location.reload();
});

function startCountdown() {
    let targetTime = localStorage.getItem("countdownTime");
    if (!targetTime) {
        targetTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (59 * 60 * 1000);
        localStorage.setItem("countdownTime", targetTime);
    }
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = targetTime - now;
        if (remaining <= 0) {
            clearInterval(interval);
            countdown.innerText = "It's Date Time!";
        } else {
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            countdown.innerText = `${days}D ${hours}H ${minutes}M ${seconds}S`;
        }
    }, 1000);
}

if (localStorage.getItem("countdownTime")) {
    title.innerText = "Perfect. Let's Grab Dinner. Wear something Cute.";
    yesButton.classList.add("hidden");
    countdownTitle.classList.remove("hidden");
    countdown.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    startCountdown();
}
