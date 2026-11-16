/*jslint browser, for */

// Global variables shared by the games below
// and by the inline script in games.html.
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const MAX_ATTEMPTS = 3;
const MONTH_NAMES = [
    "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
    "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

// Returns a random integer from min to max, both inclusive.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Asks until the user enters an integer from min to max.
// Returns that integer, or null when the user cancels the prompt.
function askForInteger(message, min, max) {
    let answer;
    let number;

    do {
        answer = window.prompt(message);
        if (answer === null) {
            return null;
        }
        number = parseInt(answer, 10);
    } while (Number.isNaN(number) || number < min || number > max);

    return number;
}

function showResult(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

// Winter wraps around the year end (12, 1, 2), so it is the default case.
function getSeason(monthNumber) {
    switch (monthNumber) {
    case 3:
    case 4:
    case 5:
        return "wiosna";
    case 6:
    case 7:
    case 8:
        return "lato";
    case 9:
    case 10:
    case 11:
        return "jesień";
    default:
        return "zima";
    }
}

function playMonthGame() {
    const secretMonth = getRandomInt(1, 12);
    const secretName = MONTH_NAMES[secretMonth - 1];
    const secretHtml = "<strong>" + secretName + "</strong>";
    let answer;
    let isGuessed = false;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS && !isGuessed; attempt += 1) {
        answer = window.prompt(
            "Próba " + attempt + " z " + MAX_ATTEMPTS
            + ". Podaj nazwę miesiąca, np. maj:"
        );
        if (answer === null) {
            break;
        }
        if (answer.trim().toLowerCase() === secretName) {
            isGuessed = true;
        } else {
            window.alert(
                "Pudło! Podpowiedź: pora roku to "
                + getSeason(secretMonth) + "."
            );
        }
    }

    if (isGuessed) {
        showResult(
            "month-result",
            "Brawo! Wylosowany miesiąc to " + secretHtml + "."
        );
    } else {
        showResult(
            "month-result",
            "Tym razem się nie udało. Wylosowany miesiąc to "
            + secretHtml + "."
        );
    }
}

// Guessing game for a number from MIN_NUMBER to MAX_NUMBER
// with a hint after each miss. The game ends when the number
// is guessed or after maxAttempts tries.
function playNumberGame(maxAttempts, resultId) {
    const secretNumber = getRandomInt(MIN_NUMBER, MAX_NUMBER);
    const secretHtml = "<strong>" + secretNumber + "</strong>";
    let attempt = 0;
    let guess;
    let isGuessed = false;

    while (attempt < maxAttempts && !isGuessed) {
        attempt += 1;
        guess = askForInteger(
            "Próba " + attempt + " z " + maxAttempts + ". Podaj liczbę od "
            + MIN_NUMBER + " do " + MAX_NUMBER + ":",
            MIN_NUMBER,
            MAX_NUMBER
        );
        if (guess === null) {
            break;
        }
        if (guess === secretNumber) {
            isGuessed = true;
        } else if (guess < secretNumber) {
            window.alert(guess + " to za mało.");
        } else {
            window.alert(guess + " to za dużo.");
        }
    }

    if (isGuessed) {
        showResult(
            resultId,
            "Brawo! Liczba " + secretHtml + " trafiona w próbie nr "
            + attempt + "."
        );
    } else {
        showResult(
            resultId,
            "Tym razem się nie udało. Wylosowana liczba to "
            + secretHtml + "."
        );
    }
}

function playThreeChancesGame() {
    playNumberGame(MAX_ATTEMPTS, "three-chances-result");
}

function playChosenAttemptsGame() {
    const maxAttempts = askForInteger(
        "Ile prób chcesz mieć? Podaj liczbę większą od zera:",
        1,
        Infinity
    );

    if (maxAttempts !== null) {
        playNumberGame(maxAttempts, "chosen-attempts-result");
    }
}

function playSumGame() {
    const count = askForInteger(
        "Ile liczb chcesz dodać? Podaj liczbę większą od zera:",
        1,
        Infinity
    );
    let answer;
    let number;
    let enteredCount = 0;
    let sum = 0;

    if (count === null) {
        return;
    }

    while (enteredCount < count) {
        answer = window.prompt(
            "Podaj liczbę nr " + (enteredCount + 1) + " z " + count + ":"
        );
        if (answer === null) {
            break;
        }
        // Polish users type decimals with a comma,
        // which parseFloat would silently cut off.
        number = parseFloat(answer.replace(",", "."));
        if (Number.isNaN(number)) {
            window.alert("To nie jest liczba. Spróbuj jeszcze raz.");
        } else {
            enteredCount += 1;
            sum += number;
            window.alert(
                "Suma dotychczas podanych liczb: "
                + sum.toLocaleString("pl-PL")
            );
        }
    }

    showResult(
        "sum-result",
        "Podane liczby: " + enteredCount + ", suma: <strong>"
        + sum.toLocaleString("pl-PL") + "</strong>."
    );
}

function addClickHandler(buttonId, handler) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", handler);
}

function setupGames() {
    addClickHandler("month-game-button", playMonthGame);
    addClickHandler("three-chances-button", playThreeChancesGame);
    addClickHandler("chosen-attempts-button", playChosenAttemptsGame);
    addClickHandler("sum-button", playSumGame);
}

window.addEventListener("DOMContentLoaded", setupGames);
