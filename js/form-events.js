/*global document, window*/
"use strict";

function getHelpText(field) {
    return document.getElementById(field.getAttribute("aria-describedby"));
}

function showHelpText(event) {
    getHelpText(event.target).hidden = false;
}

function hideHelpText(event) {
    getHelpText(event.target).hidden = true;
}

function confirmSubmit(event) {
    if (!window.confirm("Czy na pewno chcesz wysłać formularz?")) {
        event.preventDefault();
    }
}

function confirmReset(event) {
    if (!window.confirm("Czy na pewno chcesz wyczyścić formularz?")) {
        event.preventDefault();
    }
}

function setupHelpText(field) {
    // Hints are hidden here, not in HTML, so they stay visible without JS.
    // A field focused by autofocus keeps its hint visible.
    getHelpText(field).hidden = field !== document.activeElement;
    field.addEventListener("focus", showHelpText);
    field.addEventListener("blur", hideHelpText);
}

function setupConfirmations(form) {
    form.addEventListener("submit", confirmSubmit);
    form.addEventListener("reset", confirmReset);
}

function setupFormEvents() {
    document.querySelectorAll("form [aria-describedby]").forEach(setupHelpText);
    document.querySelectorAll("form").forEach(setupConfirmations);
}

window.addEventListener("DOMContentLoaded", setupFormEvents);
