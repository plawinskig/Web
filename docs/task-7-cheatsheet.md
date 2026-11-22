# Zadanie 7 (Javascript_2) – ściągawka

Strona: `dom-events.html` (punkty 1–4), formularze: `contact.html`, `registration.html` (punkt 5).
Każdy punkt ma osobny plik w `js/`, każdy zaczyna się od `"use strict";`.

## 1. Metody DOM (`js/dom-list.js`)

- `createElement("li")` tworzy element, `createTextNode("element 3")` tworzy węzeł tekstowy; oba istnieją tylko w pamięci, dopóki ich nie wstawię.
- `appendChild(node)` dodaje na końcu rodzica.
- `insertBefore(nowy, wzorzec)` wstawia przed wzorcem; gdy wzorzec to `null` (pusta lista), działa jak `appendChild`.
- `replaceChild(nowy, stary)` i `removeChild(dziecko)` wywołuje się na **rodzicu**, dlatego używam `element.parentNode`.
- Numer „element N” pochodzi z licznika, więc się nie powtarza po usunięciu; numery 1., 2., 3. dodaje sama lista `<ol>`.

## 2. Kolekcje (`js/collections.js`)

- `document.images` – wszystkie `<img>`; `document.forms` – wszystkie `<form>`.
- `document.links` – `<a>` i `<area>` **z atrybutem `href`** (stąd też linki z menu).
- `document.anchors` – tylko `<a>` **z atrybutem `name`**. W HTML5 `name` na `<a>` jest przestarzały (zalecane `id`), ale bez niego kolekcja byłaby pusta.
- `item(0)` – element po numerze (to samo co `[0]`), `namedItem("x")` – po `id` lub `name`; gdy brak, oba zwracają `null`.
- To kolekcje „żywe” (`HTMLCollection`): same się aktualizują po zmianie strony.

## 3. Zmiana stylów (`js/style-switcher.js`)

- `document.body.style.backgroundColor / color / fontFamily` – styl inline, ma pierwszeństwo przed arkuszem CSS. W JS nazwy w camelCase (`background-color` → `backgroundColor`).
- Jeden nasłuch zdarzenia `input` na formularzu: zdarzenie „bąbelkuje” (bubbling) z pól do formularza, więc obsłuży wszystkie trzy kontrolki.
- Kolor i czcionka dziedziczą się na całą stronę. Lista `<select>` zostaje w swojej czcionce, bo kontrolki formularza jej nie dziedziczą.
- Śmieszne czcionki są z Google Fonts. Wingdings i Comic Sans to czcionki Microsoftu: działają tylko tam, gdzie są zainstalowane (nie na Linuksie).

## 4. Obiekt `event` (`js/event-info.js`)

- `altKey`, `ctrlKey`, `shiftKey` – `true`/`false`, czy klawisz był wciśnięty w chwili zdarzenia.
- `clientX/Y` – pozycja względem okna przeglądarki (widoku); `screenX/Y` – względem całego ekranu. (Dla porównania `pageX/Y` – względem całej strony, z przewinięciem.)
- `keyCode` – kod klawisza, jest tylko w zdarzeniach klawiatury, więc pokazuję go na `keydown`. Jest przestarzały, dziś używa się `event.key` / `event.code`.
- `mouseover` / `mouseout` – wejście i wyjście kursora (podświetlenie pola). Różnica z `mouseenter` / `mouseleave`: te pierwsze „bąbelkują” i odpalają się też przy dzieciach elementu.
- Alt + klik na Linuksie (Cinnamon) przechwytuje menedżer okien, dlatego modyfikatory widać też przy `mousemove`.

## 5. Formularze (`js/form-events.js`)

- `focus` – pokazuje podpowiedź pola (element z `aria-describedby`), `blur` – chowa ją. Te zdarzenia nie bąbelkują, więc nasłuch jest na każdym polu.
- Podpowiedzi chowa JS przy starcie, więc bez JS są po prostu widoczne. Pole z `autofocus` od razu ma widoczną podpowiedź.
- `submit` / `reset` → `window.confirm(...)` zwraca `true`/`false`; przy „Anuluj” `event.preventDefault()` anuluje wysłanie lub czyszczenie.
- `submit` zachodzi dopiero po walidacji HTML (np. `required`), więc niepoprawny formularz nawet nie pyta.

## 6. Tryb ścisły

- `"use strict";` na początku pliku włącza tryb ścisły dla całego skryptu.
- Co zmienia: błąd przy przypisaniu do niezadeklarowanej zmiennej, `this` w zwykłej funkcji to `undefined`, brak `with`, błąd przy duplikacie nazw parametrów, przy zapisie do pól tylko do odczytu.
- Moduły ES (`type="module"`) i klasy są ściśle zawsze, bez dyrektywy.

## Inne pytania

- **Dlaczego `DOMContentLoaded`?** Skrypty są w `<head>`, więc czekają, aż HTML się wczyta i elementy będą istnieć. `load` czekałby jeszcze na obrazki.
- **`addEventListener` zamiast `onclick`?** Pozwala podpiąć kilka obsług jednego zdarzenia i oddziela JS od HTML.
- **`textContent` zamiast `innerHTML`?** Wstawia czysty tekst, bez interpretowania HTML (bezpieczniej, brak XSS).
- **Walidacja:** JSLint (wersja v2026.10.30) – wszystkie 5 plików bez uwag. Dyrektywa `/*global document, window*/` mówi JSLint o obiektach przeglądarki. Opcji `browser` nie używam, bo w niej JSLint pozwala tylko na `"use strict"` wewnątrz funkcji (pliki w przeglądarce bywają łączone w jeden).
