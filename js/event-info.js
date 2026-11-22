/*global document, window*/
"use strict";

function showEventInfo(elementId, text) {
    document.getElementById(elementId).textContent = text;
}

function describeModifierKeys(event) {
    return "altKey: " + event.altKey
    + ", ctrlKey: " + event.ctrlKey
    + ", shiftKey: " + event.shiftKey;
}

function showHoverState(event) {
    event.currentTarget.classList.toggle(
        "event-area-active",
        event.type === "mouseover"
    );
    showEventInfo("hover-info", "Ostatnie zdarzenie: " + event.type);
}

function showMousePosition(event) {
    showEventInfo(
        "move-info",
        "mousemove – clientX: " + event.clientX
        + ", clientY: " + event.clientY
        + ", screenX: " + event.screenX
        + ", screenY: " + event.screenY
        + ", " + describeModifierKeys(event)
    );
}

function showMouseDown(event) {
    showEventInfo("down-info", "mousedown – " + describeModifierKeys(event));
}

// keyCode exists only on keyboard events, so it is shown on keydown.
function showKeyDown(event) {
    showEventInfo(
        "key-info",
        "keydown – keyCode: " + event.keyCode
        + ", " + describeModifierKeys(event)
    );
}

function setupEventInfo() {
    const area = document.getElementById("event-area");

    area.addEventListener("mouseover", showHoverState);
    area.addEventListener("mouseout", showHoverState);
    area.addEventListener("mousemove", showMousePosition);
    area.addEventListener("mousedown", showMouseDown);
    document.addEventListener("keydown", showKeyDown);
}

window.addEventListener("DOMContentLoaded", setupEventInfo);
