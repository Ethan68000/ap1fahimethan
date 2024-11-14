let currentMonday; // Variable pour stocker le lundi actuel

function joursemaine() {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    let today = new Date();
    let dayOfWeek = today.getDay();
    currentMonday = new Date(today);
    if (dayOfWeek === 0) {
        currentMonday.setDate(today.getDate() - 6);
    } else {
        currentMonday.setDate(today.getDate() - (dayOfWeek - 1));
    }

    afficherSemaine(currentMonday);
}

function afficherSemaine(monday) {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    jours.forEach((jour, index) => {
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + index);
        let formattedDate = currentDay.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' });

        const element = document.getElementById(jour);
        if (element) {
            element.innerHTML = `${jour.slice(0)} ${formattedDate}`;
        }
    });
}

function semainePlus() {
    currentMonday.setDate(currentMonday.getDate() + 7);
    afficherSemaine(currentMonday);
}

function semaineMoins() {
    currentMonday.setDate(currentMonday.getDate() - 7);
    afficherSemaine(currentMonday);
}

function afficherdetail(event) {
    event.preventDefault();

    var nomevent = document.getElementById("nomevent").value;
    var jourdepart = document.getElementById("jourdepart").value;
    var jourfin = document.getElementById("jourfin").value;
    var heuredebut = document.getElementById("heuredebut").value;
    var heurefin = document.getElementById("heurefin").value;
    var colorevent = document.getElementById("colorevent").value;

    // Validation de l'heure
    if (heuredebut >= heurefin & jourdepart == jourfin) {
        alert("L'heure de début doit être inférieur à l'heure de fin.");
        return;
    }

    if (nomevent && jourdepart && heuredebut && colorevent) {
        alert("Voici le recap : \nNom de l'évenement : " + nomevent + 
              " \nDébut de l'évenement : " + jourdepart + " à " + heuredebut + 
              "\nCode couleur : " + colorevent);
    }
}

window.onload = function() {
    joursemaine();
};
