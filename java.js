console.log("Hello, World! Your web server is working.");

document.addEventListener("DOMContentLoaded", function () {
    const message = document.createElement("h1");
    message.textContent = "Hello, World!";
    document.body.appendChild(message);
});
