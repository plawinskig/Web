/*global document, window*/
"use strict";

function applyPageStyles() {
    const style = document.body.style;

    style.backgroundColor = document.getElementById("background-color").value;
    style.color = document.getElementById("text-color").value;
    style.fontFamily = document.getElementById("font-family").value;
}

function setupStyleSwitcher() {
    // The input event bubbles, so one listener covers all three controls.
    document.getElementById("style-form").addEventListener(
        "input",
        applyPageStyles
    );
}

window.addEventListener("DOMContentLoaded", setupStyleSwitcher);
