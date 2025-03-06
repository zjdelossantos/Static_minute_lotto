    document.addEventListener("DOMContentLoaded", function () {
        const playBtn = document.querySelector(".play-btn");

        playBtn.addEventListener("click", function () {
            // Check if the user is logged in (Example: using localStorage)
            const isLoggedIn = localStorage.getItem("isLoggedIn");

            if (isLoggedIn === "true") {
                // Redirect to the main page if logged in
                window.location.href = "../main/main.html";
            } else {
                // Redirect to login page if not logged in
                window.location.href = "../login/logsgin.html";
            }
        });
    });
