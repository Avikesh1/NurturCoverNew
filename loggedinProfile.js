let loggedIn = false; // simulate login state

// Example: when login form is submitted
document.querySelector("#loginModal form").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload

    // Here, you would validate credentials...
    loggedIn = true; 

    // Show profile icon and hide login/register
    if (loggedIn) {
        document.getElementById("profileIcon").style.display = "flex";
        document.getElementById("openLogin").style.display = "none";
        document.getElementById("openRegister").style.display = "none";
        loginModal.style.display = "none"; // close modal
    }
});
