import App from "./App.js";

//Ovo je glavni kontejner u koji ubacujemo sve
const root = document.getElementById("app");
const app = new App(root);

//Dogadjaji za otvaranje aside menu na mobile screens
const bar = document.querySelector(".fa-bars");
const aside_container = document.querySelector(".aside_container");

bar.onclick = () => {
    aside_container.style.left = "0%";
}

const exit = document.querySelector(".fa-times");
exit.onclick = () => {
    aside_container.style.left = "-100%";
}