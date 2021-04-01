import './style.css';


const input = document.querySelector('input'); //pobranie elementów //
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='; //główna składowa zapytania //
const apiKey = '&appid=7ce58377dc08f3e23c4ea96b25c56d7c';// mój klucz//
const units = '&units=metric'; //miara  stopni celciusza //

let $city; /* to jest w/w zmienna input do której przypisane jest  pole input */
let url;


const getWeather = () => {
    // () ? true : false  ==> to jest operator waunkowy
    $city = (!input.value) ? 'Kraków' : input.value; /* jeśli to: !input.value nie zróci nam false to podstawi nam Kraków  a jaśl zwróci folsa to podstawi bieżącą wartośc inputa !!!!!!!!!!!!!!, zero zwraca false, puste zwraca false.  */
    url = apiLink + $city + apiKey + units; /* to jest budowa endpointa/ zapytania poprzez składanie w/w zmiennych */

    axios.get(url) /* pobranie danych z api,  axiosem z getem*/
        .then(res => { /* tu odpowiedź już w formie obiektu */
            const temp = res.data.main.temp; /* wyciągnięcie  szukanych przez nas danych z obiektu i przypisanie ich do zmiennych*/
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather); /* rozsmarowana tablica - za pomocą spred opeeatorem ... wyjęto z niej elementy i umieszczono w zwykłym  obiekcie, za pomocą object.assign wkawalismy te elementy do nowego obiektu*/

            cityName.textContent = res.data.name; /* prekazanie danych uzyskanych z api a już zawartych w w/w zmiennych do elementów w Html uchwyconych jw. */
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + ' °C';
            humidity.textContent = hum + ' %';

            warning.textContent = ''; /* czyścimy ostrzezenie jeśli nasz w/w warunek napisania poprawnego nazwy miesta jest spełniony a w tym miejscu kodu wiemy ze warunke jest prawdziwy skoro kod przechodzi do tego miejsca !!!!!!!!!!!!! */
            input.value = ''; /* czyścimy inputa  jeśli nasz w/w warunek napisania poprawnego nazwy miesta jest spełniony i chcemy mieś czysty input dla wpisania kolejnego miasta !!!!!!!!*/

            /* warunki dla poszczególnych id pogody pobierające odpowiedni obrazek */
            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', "src/thunderstorm.png");
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', "src/drizzle.png");
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', "src/rain.png");
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', "src/ice.png");
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', "src/fog.png");
            } else if (status.id === 800) {
                photo.setAttribute('src', "src/sun.png");
            } else if (status.id >= 800 && status.id < 900) {
                photo.setAttribute('src', "src/cloud.png");
            } else {
                photo.setAttribute('src', "src/unknow.png");
            }
        })
        /* teraz catch dla wychwycenia błędu w pisaniu nazwy miasta */
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta.')

};

/* funkcja  uruchamiania  wysyłania na  przycisk enter */
const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather();

    }
};


getWeather(); /* musimy mieć początkowe wywołąnie  funkcji bo jest  ona przypięta do btn na click i dlatego przypierwszym załadowaniu strony nie mielibyśmy żadnej wartości w tym domyślnej w inpucie i byłaby  "nieładna" wizualnie strona bez obrazka poogodowego i bez danych  w dole  tabelki */
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);


