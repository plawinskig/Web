# Zadanie 3 (HTML_2) – odpowiedzi na zagadnienia

## 1. Jak przebiega walidacja formularzy?

Przeglądarka sprawdza pola w momencie wysyłania formularza (*constraint validation*). Pod uwagę bierze ograniczenia zapisane w typie pola i atrybutach:

- `required` – pole nie może być puste,
- typ pola – np. `email` (adres e-mail), `url` (adres URL), `number` (liczba),
- `pattern` – cała wartość musi pasować do wyrażenia regularnego,
- `min`, `max`, `step`, `minlength`, `maxlength`.

Jeśli któreś pole jest niepoprawne, formularz nie zostaje wysłany: przeglądarka przenosi fokus na pierwsze błędne pole i pokazuje dymek z komunikatem (przy `pattern` dołącza treść atrybutu `title`). Niepoprawne pola można wyróżnić w CSS pseudoklasą `:invalid`, a w JavaScripcie obsłużyć przez Constraint Validation API (`checkValidity()`, `setCustomValidity()`).

**Czy wszystkie dane są walidowane automatycznie?** Nie. Sprawdzane są tylko ograniczenia wynikające z typu pola i atrybutów:

- pole `text` bez atrybutów przyjmie dowolną wartość,
- `tel` i `search` nie sprawdzają formatu – dlatego numer telefonu na stronie `registration.html` jest walidowany atrybutem `pattern`,
- `email` sprawdza tylko składnię – adres `anna@example` również zostanie przyjęty,
- pola `disabled` i `readonly` są pomijane.

Walidację po stronie klienta łatwo obejść (np. narzędziami deweloperskimi), więc dane trzeba ponownie sprawdzić na serwerze.

**Jak wymusić brak walidacji?**

- atrybut `novalidate` na elemencie `<form>` – wyłącza walidację całego formularza,
- atrybut `formnovalidate` na przycisku wysyłania – pomija walidację tylko przy wysyłaniu tym przyciskiem (np. „Zapisz szkic”).

## 2. Czy pole `date` w każdej przeglądarce wygląda tak samo?

Nie. Wygląd i sposób wyboru daty zależą od przeglądarki i systemu:

| Przeglądarka | Wygląd pola `date` |
|---|---|
| Chrome, Edge (komputer) | pole z maską `dd.mm.rrrr` i ikoną kalendarza rozwijanego pod polem |
| Firefox (komputer) | podobna maska, ale własny wygląd kalendarza |
| Safari (macOS) | pola segmentowe zgodne z ustawieniami systemu i własny kalendarz; wersje starsze niż 14.1 pokazują zwykłe pole tekstowe |
| Safari (iOS) | systemowy wybierak daty (kółka lub kalendarz) |
| Chrome (Android) | okno dialogowe z kalendarzem w stylu Material Design |
| Stare przeglądarki, np. Internet Explorer | zwykłe pole tekstowe, bez kalendarza i bez walidacji |

Format wyświetlanej daty zależy od języka przeglądarki lub systemu, ale wysyłana wartość ma zawsze format `RRRR-MM-DD`. Wyglądu wbudowanego kalendarza nie da się w pełni ujednolicić samym CSS.

## 3. Czy atrybut `placeholder` można zastosować do wszystkich typów pól?

Nie. Specyfikacja HTML dopuszcza `placeholder` tylko dla typów `text`, `search`, `url`, `tel`, `email`, `password` i `number` (oraz dla `<textarea>`). Nie można go użyć m.in. dla typów:

- `color`,
- `range`,
- `month` i pozostałych typów daty i czasu (`date`, `week`, `time`, `datetime-local`),
- `checkbox` i `radio`,
- `file`.

Walidator W3C zgłasza w takim przypadku błąd: *Attribute “placeholder” is only allowed when the input type is “email”, “number”, “password”, “search”, “tel”, “text”, or “url”.* Dlatego w formularzu na stronie `profile.html` podpowiedzi `placeholder` mają tylko pola `search` i `url`, a pola `color`, `month` i `range` opisują etykiety.
