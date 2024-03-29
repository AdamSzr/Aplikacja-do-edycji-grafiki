<center>
<h1> POLITECHNIKA BYDGOSKA</h1>
<h2> im. Jana i Jędrzeja Śniadeckich</h2>
<h2> WYDZIAŁ TELEKOMUNIKACJI, INFORMATYKI</h2>
<h2> I ELEKTROTECHNIKI </h2>

<b>na kierunku </b>Informatyka stosowana</br>
<img src="public/docs/pb-icon.png" alt ='Logo Politechnika Bydgoska' /> </br>
CHMURY OBLICZENIOWE </br >
PROJEKT

<h3><b> Aplikacja do edycji obrazów</b><h3>
</center>
<b>Pracę wykonali:</b></br>
Szreiber Adam</br>
Naskręt Cezary </br>
<b>Data:</b> </br>
2023-05-13


---

# <center> [LINK DO APLIKACJI](https://image-compression-app.vercel.app/image-editor) </center>

# Koncept Aplikacji

Motywem przewodnim stworzonej aplikacji do edycji zdjęć jest umożliwienie w łatwy sposób obróbki zdjęć, a przede wszystkim w pełni kompletne narzędzie do usuwania tła z obrazków na których znajduje się postać człowieka. Za priorytet obrano intuicyjny widok użytkownika w każdej fazie obróbki zdjęcia, bezstanowość aplikacji oraz poufność - wynikająca z braku persystentnego przechowywania przesłanych plików graficznych.

# Technologie i biblioteki
1. **Node.js** to open source'owe środowisko uruchomieniowe oparte na silniku JavaScript, który pozwala na uruchamianie kodu JavaScript poza przeglądarką internetową. Node.js pozwala deweloperom na tworzenie aplikacji serwerowych w JavaScript, a także na korzystanie z pakietów zewnętrznych z biblioteki npm.
Npm (Node Package Manager) to menedżer pakietów dla Node.js, umożliwia deweloperom łatwe pobieranie, instalowanie i zarządzanie zależnościami aplikacji z poziomu linii komend. Dzięki Node.js i npm deweloperzy mogą tworzyć aplikacje serwerowe w JavaScript, które wykorzystują różne biblioteki i moduły dostępne w bibliotece npm.

2. **Next.js** to open source'owa biblioteka JavaScript do tworzenia aplikacji webowych, która opiera się na frameworku React.
Oferuje wiele funkcji, które ułatwiają tworzenie zaawansowanych aplikacji internetowych, posiada także wsparcie dla języka TypeScript.
Biblioteka ta jest popularnym narzędziem dla deweloperów, ponieważ pozwala na szybkie tworzenie zaawansowanych aplikacji webowych w oparciu o React, bez konieczności pisania dużej ilości kodu i ręcznego zarządzania wieloma funkcjami. Dodatkowo w projekcie aplikacji Next.js można instalować szeroką gamę bibliotek które mogą być instalowane za pomocą narzędzie npm.

3. Do tworzenia interfejsu użytkownika wykorzystano popularną bibliotekę **Material-UI**, umożliwiającą szybkie tworzenie aplikacji zgodnych z wytycznymi Material Design.
Biblioteka ta zawiera wiele gotowych komponentów, takich jak przyciski, pola formularzy, karty, nawigacja, ikony i wiele innych, które można wykorzystać do tworzenia ładnie wyglądających i funkcjonalnych interfejsów. Dodatkowo dokumentacja biblioteki Material-UI jest bardzo obszerna i szczegółowa. Zawiera ona wiele przykładów kodu oraz wskazówek dotyczących stylowania i dostosowywania komponentów do indywidualnych potrzeb projektu. Dokumentacja biblioteki Material-UI jest bardzo rozbudowana i zawiera wiele cennych wskazówek dotyczących tworzenia interfejsów użytkownika

4. Funkcjonalność usuwania tła zrealizowano za pomocą **tensorflow-models/body-pix**.
Biblioteka **tensorflow/tfjs** to biblioteka open-source stworzona przez Google, która umożliwia wykonywanie operacji związanych z uczeniem maszynowym w przeglądarce internetowej oraz w środowisku Node.js. 
Natomiast tensorflow-models/body-pix to narzędzie do segmentacji semantycznej obrazów, które wykorzystuje głębokie sieci neuronowe i bazuje na bibliotece TensorFlow.js. Pozwala na precyzyjne wykrywanie i segmentację różnych części ciała na obrazie, w tym twarzy, rąk, nóg czy całego ciała.
Biblioteka **body-pix** zawiera gotowe modele sieci neuronowych trenowane na dużej liczbie zdjęć, dzięki czemu pozwala na wysoką dokładność segmentacji. Możliwe jest także dostosowanie parametrów modelu, co umożliwia adaptację do różnych zastosowań.

5. Kompresowanie obrazków zrealizowano przy użyciu **browser-image-compression**. Działa ona w środowisku przeglądarki internetowej i umożliwia użytkownikom łatwe i szybkie zmniejszenie rozmiaru plików graficznych bez utraty jakości obrazu.
Jedną z głównych zalet tej biblioteki jest jej łatwość użycia. Deweloperzy mogą w łatwy sposób zintegrować bibliotekę, aby umożliwić użytkownikom kompresję obrazów bezpośrednio w przeglądarce internetowej. Obsługiwane formaty:
- JPEG - wykorzystuje standardowy algorytm kompresji JPEG do kompresji obrazów.
- PNG - wykorzystuje algorytm DEFLATE do kompresji obrazów w formacie PNG.
- WebP - wykorzystuje algorytm kompresji WebP do kompresji.
- Dodatkowo wykorzystuje HTML5 Canvas API do manipulacji i kompresji obrazów w przeglądarce.



# Wymagania funkcjonalne 
- funkcjonalność usuwania tła z obrazka
- możliwość zmiany ustawień mechanizmu usuwania tła
- możliwość usuwania obrazów z pamięci aplikacji i załadowanie z dysku innego
- możliwość rysowania ( przybory: pisak, okrąg, czworokąt  ) po załadowanych obrazkachjak i po czystej tablicy
- możliwość przywrócenia oryginalnego obrazka podczas rysowania, lub jeżeli rysowanie odbywa się po tablicy bez obrazka efektem czyszczenia będzie pusta tablica.
- możliwość zmiany rozmiaru tablicy
- możliwość kompresji wczytanego obrazka
# Wymagania niefunkcjonalne
- łatwy do nauki i wygodny w korzystaniu interfejs użytkownika
- interfejs użytkownika wykonany w neutralnych dla oczu kolorach
- przesłane pliki graficzne nie powinny być przechowywane czy udostępniane osobom trzecim
- zmiana rozmiaru tablicy powinna odbywać się jak najbardziej płynnie
- bezstanowość aplikacji



# Historyjki:

## **Nazwa**: Usuwanie tła z obrazka z postacią człowieka o dowolnym rozmiarze

**Opis**: Jako użytkownik, chcę mieć możliwość usunięcia tła z obrazka z postacią człowieka o dowolnym rozmiarze, aby uzyskać obrazek postaci z przezroczystym tłem.

**Cele**: Umożliwienie użytkownikowi usunięcia tła z obrazka z postacią człowieka o dowolnym rozmiarze w łatwy i intuicyjny sposób.
Otrzymanie dokładnego i czystego obrazu postaci bez tła, niezależnie od rozmiaru obrazka.
Zapewnienie możliwości zapisania obrazka postaci z przezroczystym tłem.

**Kryteria akceptacji**: Po usunięciu tła z obrazka, otrzymany obraz postaci nie posiada żadnych śladów tła i jest dokładny.
Użytkownik może w łatwy sposób  usunąć tło obrazka o dowolnym rozmiarze.
Wynikowy obraz posiada przezroczyste tło.
Użytkownik może zapisać otrzymany obraz postaci w formacie JPG.


## **Nazwa**: Możliwość zmiany parametrów funkcji usuwającej tło obrazka

**Opis**: Jako użytkownik, chcę mieć możliwość zmiany parametrów funkcji usuwającej tło obrazka, aby uzyskać bardziej spersonalizowane efekty.

**Cele**: Umożliwienie użytkownikowi dostosowania parametrów funkcji usuwającej tło obrazka do jego indywidualnych potrzeb.
Zapewnienie większej kontroli nad procesem usuwania tła i uzyskaniem spersonalizowanych efektów.

**Kryteria akceptacji**: Użytkownik może zmieniać parametry funkcji usuwającej tło obrazka w łatwy i intuicyjny sposób.
Zmiana parametrów ma wpływ na efekt końcowy usuwania tła, co pozwala na uzyskanie bardziej spersonalizowanych efektów.
… podać parametry do ustawienia


## **Nazwa**: Możliwość usuwania obrazów z pamięci aplikacji i załadowanie z dysku innego

**Opis**: Jako użytkownik, chcę mieć możliwość usuwania obrazów z pamięci aplikacji oraz dodawania nowych obrazów z dysku, aby móc pracować na różnych plikach.

**Cele**:
Umożliwienie użytkownikowi usuwania obrazów z pamięci aplikacji w łatwy i intuicyjny sposób.
Zapewnienie użytkownikowi łatwego ładowania nowych obrazów z dysku do aplikacji.

**Kryteria akceptacji**:
Użytkownik ma możliwość usunięcia obrazu z pamięci aplikacji w prosty sposób.
Użytkownik ma możliwość ładowania nowych obrazów z dysku do aplikacji w łatwy i intuicyjny sposób.
Po usunięciu obrazu z pamięci aplikacji, aplikacja nie wyświetla już tego obrazu.


## **Nazwa**: Możliwość rysowania po tablicy

**Opis**: Jako użytkownik, chcę mieć możliwość rysowania na załadowanych obrazach lub na czystej tablicy, używając różnych narzędzi, takich jak pisak, okrąg lub czworokąt, aby móc wyrazić swoją kreatywność, zaznaczyć lub wyróżnić pewne fragmenty obrazka.

**Cele**:
Umożliwienie użytkownikowi rysowania na tablicy w łatwy i intuicyjny sposób.
Zapewnienie użytkownikowi narzędzi (tj. pisak, okrąg, czworokąt, ustawienie zmiany rozmiaru pisaka) do rysowania.

**Kryteria akceptacji**:
Użytkownik ma możliwość wyboru narzędzia do rysowania (pisak, okrąg, czworokąt).
Użytkownik ma możliwość zmiany rozmiaru szerokości pisaka.
Użytkownik ma możliwość rysowania na tablicy bezpośrednio na obrazku lub czystej tablicy.

## **Nazwa**: Możliwość przywrócenia oryginalnego obrazka lub wyczyszczenia tablicy podczas rysowania.

**Opis**:
Jako użytkownik, chcę mieć możliwość przywrócenia oryginalnego obrazka podczas rysowania, aby móc wrócić do poprzedniego stanu pracy, lub usunąć wszelkie zmiany i zacząć od nowa. Chcę również, aby jeśli rysowanie odbywa się po pustej tablicy, efektem będzie czysta tablica.

**Dane wejściowe:**
Załadowany obrazek w pamięci przeglądarki lub pusta tablica.
Narzędzia do rysowania.

**Dane wyjściowe:**
Oryginalny obrazek lub czysta tablica, w zależności od wybranej opcji.

**Kryteria akceptacji**:
Użytkownik może przywrócić stan początkowy tablicy w dowolnym momencie.


## **Nazwa**: Możliwość zmiany rozmiaru tablicy

**Opis**:
Jako użytkownik, chcę mieć możliwość zmiany rozmiaru tablicy lub obrazka, aby móc dostosować ją do moich potrzeb.
Widok aplikacji powinien zawierać przycisk "ZMIANA ROZMIARU", który po naciśnięciu przenosi do widoku z dwoma suwakami opisującymi kolejno szerokość oraz wysokość obrazka. Edycja odbywa się poprzez przesunięcie suwaka w odpowiednią stronę. Proces zmiany powinien być kontrolowany poprzez wyświetlenie zmieniającego się rozmiaru okna z obrazem.

**Cele** 
Umożliwienie użytkownikowi dostosowania rozmiaru tablicy do swoich potrzeb.
Umożliwienie użytkownikowi łatwej i intuicyjnej zmiany rozmiaru tablicy poprzez suwaki.
Zapewnienie interaktywnego procesu zmiany rozmiaru tablicy, który pozwala użytkownikowi na podgląd efektów natychmiast po dokonaniu zmian.
Oferowanie użytkownikowi pełnej kontroli nad procesem zmiany rozmiaru tablicy, aby zapewnić, że nowy rozmiar spełnia jego oczekiwania i potrzeby.
Umożliwienie użytkownikowi dostosowania rozmiaru obrazu do wymagań innych funkcji aplikacji, takich jak edycja, rysowanie, czy usuwanie tła.

**Kryteria akceptacji**:
Aplikacja pozwala na zmianę rozmiaru obrazu w opisany sposób, a nowy rozmiar jest poprawnie wyświetlany na ekranie.
Slider dla szerokości i wysokości jest wyświetlony w poprawny sposób, a slider przesuwany jest zgodnie z wartościami wybranej szerokości i wysokości.
Zmiana rozmiaru tablicy nie powoduje utraty dotychczasowych modyfikacji w obrazie.
Slider jest łatwy do obsługi i działa płynnie, a zmiany rozmiaru obrazka są natychmiastowe.
Zmiana rozmiaru obrazka nie wpływa na jakość obrazu lub kolory.
Limit wielkości obrazu do rozdzielczości FullHD


## **Nazwa**: Możliwość dostosowania stopnia kompresji wczytanego obrazka

**Opis**: Widok aplikacji posiada przycisk "Wczytaj obrazek", który umożliwia wybór i załadowanie obrazka do edytora. Po wczytaniu grafiki, pojawia się suwak umożliwiający regulowanie stopnia kompresji obrazka. Użytkownik może przesuwać suwak w prawo, aby zmniejszyć stopień kompresji, lub w lewo, aby zwiększyć. Podgląd wyświetlany jest po kliknięciu przycisku "start".
Użytkownik powinien widzieć jaki rozmiar pliku jest "oczekiwany" w wyniku kompresji, oraz rozmiar oryginalnego pliku.
Przesunięcie suwaka powinno skutkować ponowne przeliczenie oczekiwanego rozmiaru wyjściowego pliku.
Po przeprowadzeniu procesu kompresji dodatkowo użytkownik widzi autentyczną wielkość skompresowanego pliku.

**Cele**:
Umożliwienie użytkownikowi dostosowania stopnia kompresji wczytanego obrazka.
Zmniejszenie rozmiaru pliku graficznego i poprawa wydajności aplikacji.
Zachowanie jakości obrazu na akceptowalnym poziomie w zależności od preferencji użytkownika.

**Kryteria akceptacji**:
Po wczytaniu obrazka, suwak stopnia kompresji powinien być widoczny i dostępny dla użytkownika.
Użytkownik powinien mieć możliwość regulowania stopnia kompresji za pomocą suwaka.
Podgląd efektu kompresji powinien być aktualizowany po przyciśnięciu przycisku "start".
Aplikacja powinna zachować jakość obrazu na akceptowalnym poziomie w zależności od preferencji użytkownika.


---
# Wykonanie aplikacji

## Paleta kolorów:

![](/public/docs/color-palette.png)</br>
**Ryc 1.** Paleta kolorów wykorzystana w projekcie.

Paleta kolorów to zbiór wybranych kolorów, które są używane w projektowaniu graficznym, projektowaniu stron internetowych. Paleta kolorów może składać się z kilku lub wielu kolorów, które zostały dobrane w taki sposób, aby tworzyć harmonijne kombinacje.

W przypadku witryny internetowej, paleta kolorów jest kluczowym elementem w tworzeniu spójnego i atrakcyjnego wyglądu strony. Poprawnie dobrane kolory mogą wpływać na odbiór treści, kontrast, czy łatwość czytania.

Odpowiednia paleta kolorów może wzmocnić wrażenie wizualne, zapewnić spójność i przejrzystość oraz pomóc w budowaniu rozpoznawalnego wizerunku marki.

![](/public/docs/no-img-loaded-view.png)</br>
**Ryc 2.** Widok aplikacji bez załadowanego zdjęcia.

Przesłanie zdjęcia do edycji odbywa się poprzez przycisk “Choose File”, który został umieszczony w panelu menu.
Natomiast jeżeli nie chcemy przesyłać pliku graficznego, możemy skorzystać z pustej tablicy, która pojawi się po kliknięciu przycisku “Rysuj”


![](/public/docs/loaded-img-view.png) </br>
**Ryc 3.** Widok tablicy - z automatycznie załadowanym plikiem graficznym.


Załadowanie pliku graficznego poprzez input znajdujący się na górze strony w menu spowoduje załadowanie pliku do aplikacji oraz zostaniemy przeniesieni do widoku tablicy, w którym to zdjęcie zostaje wyświetlone użytkownikowi.Gdy mamy wgrany plik, otrzymujemy dostęp do szeregu opcji edycji z poziomu menu. Również ukazuje się nam widoczny z prawej strony przycisk pobierania - który odpowiada za umożliwienie użytkownikowi pobrania aktualnie wyświetlanego zdjęcia. Możliwe jest to dzięki zastosowaniu React.Context który otacza całą aplikację, a elementy udostępnione przez kontekst dostępne są z wszystkich miejsc w aplikacji.

![](/public/docs/download-btn-code.png)</br>
**Ryc 4.** Komponent przycisku pobierania.

Najważniejszymi funkcjonalnościami które zaimplementowano:
przycisk jest funkcjonalny niezależnie od witryny na której jest wyświetlany
możliwość ukrywania przycisku w widokach aplikacji zadeklarowanych w tablicy “hidenWhenView”
czysto html’owe podejście do realizacji pobierania grafiki


![](/public/docs/draw-tool.png)</br>
**Ryc 5.** Widok edytora graficznego oraz zaprezentowanie działania wszystkich dostępnych przyborów.

Przechodząc do zakładki “Rysuj” otrzymujemy estetyczny i intuicyjny widok. 
Zaimplementowane przybory:
czyszczenie - przywraca oryginalną grafikę
pisak - umożliwia rysowanie zgodnie z ruchem myszy
czworokąt - rysuje czworokąt w zadanym rozmiarze
okrąg - rysuje okrąg w zadanym rozmiarze
wybór koloru - umożliwia wygodny wybór koloru
wybór szerokości linii - umożliwia zmianę szerokości rysowanej linii


Mechanizm rysowania zaimplementowano przy użyciu elementu canvas który jest natywnym elementem stron internetowych przeznaczonym do obróbki obrazów i tworzenia animacji z użyciem języka JavaScript.
Canvas HTML oferuje szereg wbudowanych funkcji rysowania, natomiast do realizacji projektu użyto tylko niektóre:
arc(x, y, radius, startAngle, endAngle) - funkcja odpowiadająca za rysowanie okręgu, jako parametry przyjmuje: środek okręgu ( parametr x, y ), promień narysowanego okręgu, początek okręgu ( w tym przypadku 0° ), koniec okręgu ( w tym przypadku 2*Math.PI). Przy zastosowaniu powyższych parametrów rysowany jest pełen okrąg o zadanym środku i promieniu.
rect(x, y, width, height) - metoda tworzy czworokąt o punkcie startowym x,y, o zadanej szerokości i wysokości
moveTo ( x, y ) - umożliwia przesunięcie pióra na płótnie do określonej pozycji bez rysowania
lineTo( x, y ) - Metoda umożliwia rysowanie linii na płótnie od aktualnej pozycji pióra do określonej pozycji poprzez parametry x, y
lineWidth - oznacza grubość linii rysowanej na płótnie (canvas).
strokeStyle - właściwość ta określa styl (kolor, gradient lub wzór) linii, która będzie rysowana na płótnie


![](/public/docs/resize-tool.png) </br>
**Ryc 3.** Widok zmiany rozmiarów obrazka - oryginalne rozmiary

Wczytanie pliku graficznego odblokowuje pełen zakres możliwości aplikacji. 
Powyżej ukazano funkcjonalność zmiany rozmiaru pliku. Odbywa się to poprzez 2 suwaki które początkowo są zainicjalizowane szerokością i długością oryginalnego obrazka. Zmiana wielkości polega na wybraniu suwaku odpowiedniej wartości.
![](/public/docs/resize-tool-example.png)</br>
**Ryc 4.** Zmniejszenie obrazka z 540x360px na 64x53px

Na funkcjonalność nałożono ograniczenie w postaci maksymalnej wielkości FullHD, co za tym idzie maksymalna dopuszczalna szerokość to 1920, a wysokość 1080.


Kompresję zrealizowane przy użyciu biblioteki - "browser-image-compression" która umożliwia kompresję obrazów na poziomie klienta, czyli w przeglądarce internetowej. Dzięki temu zachowano bezstanowość i prywatność stworzonego rozwiązania. Sam biblioteka obsługuje wiele formatów plików graficznych, takich jak JPEG, PNG, BMP, GIF i TIFF. Użytkownik może wybrać poziom kompresji, który jest wykorzystywany podczas procesu kompresji. Dodatkowo zapewnia ona zachowanie oryginalnych proporcji obrazu.
Stosowanie tego typu bibliotek jest niezwykle ważne w przypadku tworzenia aplikacji które za cel obierają szybkość ładowania strony.

![](/public/docs/colored-backyard-original.png)</br>
**Ryc 5.** Przykład kompresji obrazu o wysokich szczegółach i kompresja z 3.4Mb do 500Kb

Podczas testów manualnych można było zauważyć nieznaczny spadek jakości…

opisać jak działa. że szczegóły są tracone dopiero w mocniejszych kompresjach

![](/public/docs/colored-backyard-compressed.png)</br>
**Ryc 6.** Przykład kompresji wpływającej w stopniu znaczącym, na jakość grafiki

![](/public/docs/lake-original.png)</br>
**Ryc 7.** Wgranie grafiki o mniejszej ilości kolorów i szczegółów
  
![](/public/docs/lake-compressed.png) </br>

**Ryc 8.** Skompresowany obraz

Podczas testów kompresji pliku graficznego, ustalono, że punktem granicznym dla zachowania jakości zdjęcia jest 100 KB. Poniżej tego rozmiaru pliki graficzne zaczynają tracić znacząco jakość, barwy oraz zwiększa się rozmycie obrazu.

Ważne jest znalezienie równowagi między rozmiarem pliku a jakością obrazu podczas kompresji graficznej. Konieczne jest uwzględnienie oczekiwań dotyczących jakości, kontekstu wykorzystania obrazu oraz ograniczeń dotyczących rozmiaru pliku, aby zapewnić jak najlepsze rezultaty.


![](/public/docs/lake-compressed-strong.png)</br>
**Ryc 9.** Przykład zbyt agresywnej kompresji

![](/public/docs/bg-remove-tool.png)</br>
**Ryc 10.** Widok narzędzia usuwania tła

![](/public/docs/bg-remove-tool-example1.png)</br>
**Ryc 11.** Przykład efektu usuwania tła

![](/public/docs/bg-remove-tool-example2.png)</br>
**Ryc 11.** Sprawdzenie algorytmu na grafice przedstawiającej 2 postacie.

![](/public/docs/bg-remove-tool-example3.png)</br>
**Ryc 12.** Zmiana architektury stosowanej  w procesie usuwania tła

# Przebieg sprintów

Cały roces tworzenia aplikacji trwał 4 inkrementacji, każda z nich trwających 2 tygodnie.
Każdy inkrement miał wyznaczone główne kamienie milowe. 

## Sprint 1
**Cele sprintu:**
Przygotowanie podstawowej infrastruktury aplikacji z interfejsem graficznym użytkownika oraz mechanizmu odpowiedzialnego za obsługę wczytywania, zapisywania i wyświetlania obrazów.
Implementacja funkcjonalności usuwania obrazów z pamięci aplikacji oraz załadowanie z dysku innego.
Proces tworzenia aplikacji rozpoczął się od doboru kolorystyki - zdefiniowana została domyślna paleta kolorów, podjęto decyzję o wykorzystaniu dodatkowej biblioteki, (tj. Material-UI) przeznaczoną do tworzenia widoków użytkownika.

**Podsumowanie sprintu:**
Podczas trwania sprintu osiągnięto wszystkie kamienie milowe, a dodatkowy czas przeznaczono na ulepszanie widoku użytkownika

Czasochłonne okazał się proces planowania architektury kodu aplikacji, która musi być elastyczna i rozszerzalna. 
Natomiast dobrą decyzją było zastosowanie Material-UI, dzięki któremu sprawnie utworzono podstawowe widoki.

## Sprint 2
**Cele sprintu:**
Dodanie możliwości rysowania na załadowanych obrazkach oraz na czystej tablicy, z wykorzystaniem różnych narzędzi, takich jak pisak, okrąg, czy czworokąt.
Implementacja funkcjonalności przywracania oryginalnego obrazka podczas rysowania oraz czyszczenia ekranu.

Niniejszy sprint skupiał się na wprowadzeniu nowych funkcjonalności do naszej aplikacji, które umożliwią użytkownikom rysowanie na załadowanych obrazkach oraz na czystej tablicy. Wyznaczyliśmy sobie za cel zapewnienie narzędzi, takich jak pisak, okrąg czy czworokąt, podstawowych  kształtów i wzorów.
Użycie api udostępnionego przez element Canvas HTML zapewniło podstawowe funkcjonalności, lecz całą logikę rysowania pisakiem, określenie wielkości okręgu za pomocą notacji euklidesowej czy określenie wielkości czworokąto to elementu które pochłonęły dużo czasu.

**Podsumowanie sprintu:**
Utrudnieniem okazało się funkcjonalność pisania po tablicy.
Pisak na canvas wymaga złożonej logiki programowania w języku JavaScript, aby interakcja z użytkownikiem była płynna i intuicyjna. Należało rozważyć różne aspekty, takie jak rysowanie, wybieranie kolorów, obsługa myszy, usuwanie, itp.

## Sprint 3
**Cele sprintu:**
Dodanie możliwości zmiany rozmiaru tablicy.
Dodanie funkcjonalności usuwania tła z obrazka poprzez wykorzystanie dostępnych bibliotek w repozytorium npm,
Dodanie możliwości zmiany ustawień mechanizmu usuwania tła.

Dobór biblioteki do usuwania tła. Pod uwagę zostały wzięte biblioteki takie jak OpenCV.js tensorflow.js, oraz rozwiązania w postaci mikroserwisu udostępniającego api jakim jest remove.bg. Przeważającymi argumentami stojącymi za wyborem tensorflow.js były:
Wydajność - wykorzystanie technologii WebAssembly, która zapewnia wydajność na poziomie zbliżonym do natywnych aplikacji, co oznacza, że modele sztucznej inteligencji mogą być uruchamiane w przeglądarce internetowej z dużą szybkością,
Dostępność - TensorFlow.js jest dostępny za darmo i można go wykorzystać w różnych projektach, bez konieczności ponoszenia kosztów licencyjnych.
Ciągłe doskonalenie - relatywnie nowa biblioteka, jest ciągle rozwijana i udoskonalana, dzięki czemu dostępne są coraz to nowe modele sztucznej inteligencji.

**Podsumowanie sprintu:**
W tym sprincie podejmowane były kluczowe decyzje które mogły ostatecznie zadecydować o powodzeniu całego inkrementu jak i postawić pod znakiem zapytania dalszą realizację całego projektu.
Kluczowym okazała się obszerna dokumentacja tensorflow.js wraz z przykładami online, oraz community które dostarcza specjalistyczną wiedzę o modelach wykorzystywanych w bibliotece tensor.

## Sprint 4
**Cele sprintu:**
Analiza i testowanie aplikacji pod względem  funkcjonalnym i “user experience” 
Poprawa użyteczności aplikacji
Przygotowanie aplikacji do wdrożenia.
Wdrożenie aplikacji jako rozwiązanie chmurowe.

Sprint rozpoczął się dokładną analizą kodu aplikacji, postanowiono poprawić szereg nieoptymalnych rozwiązań i zastosować gruntową przebudowę aplikacji, tym samym wprowadzić architekturę KISS. Wprowadzono w ten sposób porządek w komponentach wyświetlanych użytkownikowi. Każda funkcjonalność aplikacji zostanie potraktowana jako osobny byt, co za tym idzie, wydzielono do osobnej witryny ( “/background-remove” ) kompletną funkcjonalność usuwania tła. 

Zarządzaniem stanem wyświetlanego komponentu, rozwiązano za pomocą wyboru a następnie zapisu do kontekstu całej aplikacji widoku. Do wyboru mamy "img-resize" | "compression" | "draw" | "background-remove" | 'diff' | "view". Każdy reprezentuje inną funkcjonalność zaimplementowaną w aplikacji. Przełączanie między nimi umożliwiono dzięki menu głównego, a dzięki temu że przeładowanie odbywa się w kontekście aplikacji nie jest konieczne przeładowanie czy przekierowanie na inną witrynę.

Do osadzenia aplikacji w chmurze wybrano rozwiązanie pod nazwą "Varcel".
Vercel to platforma do hostowania aplikacji internetowych, która zapewnia łatwe wdrożenie, skalowalność i zarządzanie projektami opartymi na frontendzie.
Wdrażanie aplikacji nie jest skomplikowanym procesem, tak na prawdę ogranicza się do następująch kroków:
- zalogowania się za pomocą Github
- wybranie z listy projektów - projekt który chcemy wdrożyć
- odpwoiednio skonfigurować komendy budujące oraz uruchamiające aplikację

Dodatkowo dzięki Vercel CI/CD można automatyzować proces wdrażania aplikacji, po każdym "commit" wrzuconym do GitHub, Varcel zostaje o tym powiadomiony i przebudowuje aplikację na nową wersję. Mamy wtedy ciągle aktualną aplikację, i nie musimy skupiać się na ręcznym wdrażaniu aplikacji. W ten sposób przyspiesza cykl rozwoju a deweloperom skupić się na tworzeniu kodu, a Vercel zajmuje się resztą procesu CI/CD.

**Podsumowanie sprintu**
Sprint zakończył się powodzeniem, aplikacja została wdrożona, a prędkość działania aplikacji i jakość kodu poprawiona poprzez obszerny proces refaktoryzacji.

![](/public/docs/deploy-after-login-view.png)</br>
**Ryc 13.** Widok varcel po zalogowaniu się poprzez konto Github.

![](/public/docs/product-deploy-config.png)</br>
**Ryc 14.** Wdrażanie projektu.

Aby wdrożyć projekt musimy…

![](/public/docs/deployed-app-view.png)</br>
**Ryc 15.** Widok poprawnie wdrożonej aplikacji.


# Dalsze możliwości rozwoju
- Dodanie obsługi innych formatów plików obrazowych, takich jak PNG czy GIF.
- Dodanie funkcjonalności dodawania tekstu do obrazka oraz zmiany jego rozmiaru, koloru i czcionki.
- Dodanie funkcjonalności edycji kontrastu, jasności i nasycenia obrazka.
- Wprowadzenie narzędzi do rysowania, takich jak linijki czy kształty nieregularne.
- Dodanie filtrów graficznych, takich jak efekty wizualne, sepia czy negatyw.
- Stworzenie interaktywnych efektów i filtrów dla grafik - np. efekt rozmycia, efekt szumu, efekt krawędzi.
- Implementacja funkcjonalności kolaboracyjnej edycji obrazka, umożliwiającej jednoczesną pracę nad nim przez wielu użytkowników.




