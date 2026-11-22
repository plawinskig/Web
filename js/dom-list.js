/*global document, window*/
"use strict";

let listItemCount = 0;

function getDomList() {
    return document.getElementById("dom-list");
}

function createListItem() {
    const item = document.createElement("li");

    listItemCount += 1;
    item.appendChild(document.createTextNode("element " + listItemCount));
    return item;
}

function appendListItem() {
    getDomList().appendChild(createListItem());
}

function insertListItem() {
    const list = getDomList();

    list.insertBefore(createListItem(), list.firstElementChild);
}

function replaceFirstListItem() {
    const firstItem = getDomList().firstElementChild;

    if (firstItem !== null) {
        firstItem.parentNode.replaceChild(createListItem(), firstItem);
    }
}

function removeLastListItem() {
    const lastItem = getDomList().lastElementChild;

    if (lastItem !== null) {
        lastItem.parentNode.removeChild(lastItem);
    }
}

function setupDomList() {
    document.getElementById("append-item-button").addEventListener(
        "click",
        appendListItem
    );
    document.getElementById("insert-item-button").addEventListener(
        "click",
        insertListItem
    );
    document.getElementById("replace-item-button").addEventListener(
        "click",
        replaceFirstListItem
    );
    document.getElementById("remove-item-button").addEventListener(
        "click",
        removeLastListItem
    );
}

window.addEventListener("DOMContentLoaded", setupDomList);
