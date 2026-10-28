
/* Henter tilbakemeldingsskjemaet */
const feedbackForm = document.querySelector(".feedback-form");

/* Lytter etter innsending av skjemaet */
feedbackForm.addEventListener("submit", function(event) {

    /* Hindrer at nettsiden lastes inn på nytt */
    event.preventDefault();

    /* Henter navn og melding fra skjemaet */
    const navn = document.querySelector("#navn").value;
    const melding = document.querySelector("#melding").value;

/* Henter tidligere lagrede tilbakemeldinger */
const lagredeTilbakemeldinger =
    JSON.parse(localStorage.getItem("tilbakemeldinger")) || [];

/* Legger til den nye tilbakemeldingen */
lagredeTilbakemeldinger.push({
    navn: navn,
    melding: melding
});

/* Lagrer tilbakemeldingene i nettleseren */
localStorage.setItem(
    "tilbakemeldinger",
    JSON.stringify(lagredeTilbakemeldinger)
);


    /* Henter området med kundeanmeldelser */
    const feedbackGrid = document.querySelector(".feedback-grid");

    /* Oppretter et nytt anmeldelseskort */
    const nyttKort = document.createElement("article");
    nyttKort.classList.add("feedback-card");

    /* Legger til fem stjerner */
    const stjerner = document.createElement("div");
    stjerner.classList.add("stjerner");
    stjerner.textContent = "★★★★★";
    stjerner.setAttribute("aria-label", "5 av 5 stjerner");

    /* Oppretter anmeldelsesteksten */
    const anmeldelse = document.createElement("p");
    anmeldelse.classList.add("feedback-text");
    anmeldelse.textContent = melding;

    /* Legger til kundens navn */
    const forfatter = document.createElement("p");
    forfatter.classList.add("feedback-author");
    forfatter.textContent = navn;

    /* Setter sammen anmeldelseskortet */
    nyttKort.append(stjerner, anmeldelse, forfatter);

    /* Legger kortet til på nettsiden */
    feedbackGrid.appendChild(nyttKort);

    /* Tømmer skjemaet */
    feedbackForm.reset();

    /* Viser en melding i konsollen */
    console.log("Tilbakemeldingen ble lagt til!");
});



/* Henter lagrede tilbakemeldinger */
const tidligereTilbakemeldinger =
    JSON.parse(localStorage.getItem("tilbakemeldinger")) || [];

/* Henter området med kundeanmeldelser */
const anmeldelsesOmrade = document.querySelector(".feedback-grid");

/* Viser alle lagrede tilbakemeldinger */
tidligereTilbakemeldinger.forEach(function(tilbakemelding) {

    /* Oppretter et nytt kort */
    const kort = document.createElement("article");
    kort.classList.add("feedback-card");

    /* Legger til fem stjerner */
    const stjerner = document.createElement("div");
    stjerner.classList.add("stjerner");
    stjerner.textContent = "★★★★★";
    stjerner.setAttribute("aria-label", "5 av 5 stjerner");

    /* Legger til anmeldelsesteksten */
    const tekst = document.createElement("p");
    tekst.classList.add("feedback-text");
    tekst.textContent = tilbakemelding.melding;

    /* Legger til kundens navn */
    const forfatter = document.createElement("p");
    forfatter.classList.add("feedback-author");
    forfatter.textContent = tilbakemelding.navn;

    /* Setter sammen kortet */
    kort.append(stjerner, tekst, forfatter);

    /* Viser kortet på nettsiden */
    anmeldelsesOmrade.appendChild(kort);
});


/* Hindrer booking av datoer i fortiden */
const datoFelt = document.querySelector("#dato");

/* Henter dagens lokale dato */
const iDag = new Date();
const aar = iDag.getFullYear();
const maaned = String(iDag.getMonth() + 1).padStart(2, "0");
const dag = String(iDag.getDate()).padStart(2, "0");

const dagensDato = `${aar}-${maaned}-${dag}`;

/* Setter tidligste tillatte dato */
datoFelt.min = dagensDato;

/* Fjerner tidligere valgt dato hvis den er utløpt */
if (datoFelt.value && datoFelt.value < dagensDato) {
    datoFelt.value = "";
}
