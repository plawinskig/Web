/*global document, window*/
"use strict";

function showCollections() {
    const images = document.images;
    const links = document.links;
    const forms = document.forms;
    const anchors = document.anchors;
    const lines = [
        "document.images.length: " + images.length,
        "document.images.item(0).alt: " + images.item(0).alt,
        "document.images.namedItem('collections-image').src: "
        + images.namedItem("collections-image").getAttribute("src"),
        "",
        "document.links.length: " + links.length,
        "document.links.item(0).href: " + links.item(0).getAttribute("href"),
        "document.links.namedItem('links-page-link').textContent: "
        + links.namedItem("links-page-link").textContent,
        "",
        "document.forms.length: " + forms.length,
        "document.forms.item(0).id: " + forms.item(0).id,
        "document.forms.namedItem('style-form').elements.length: "
        + forms.namedItem("style-form").elements.length,
        "",
        "document.anchors.length: " + anchors.length,
        "document.anchors.item(0).name: " + anchors.item(0).name,
        "document.anchors.namedItem('anchor-second').textContent: "
        + anchors.namedItem("anchor-second").textContent
    ];

    document.getElementById("collections-output").textContent = lines.join(
        "\n"
    );
}

function setupCollections() {
    document.getElementById("collections-button").addEventListener(
        "click",
        showCollections
    );
}

window.addEventListener("DOMContentLoaded", setupCollections);
