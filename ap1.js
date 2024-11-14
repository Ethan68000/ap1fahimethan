let currentMonday; // Variable pour stocker le lundi actuel

function joursemaine() {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    let today = new Date();
    let dayOfWeek = today.getDay();
    currentMonday = new Date(today); // Initialiser currentMonday
    if (dayOfWeek === 0) {
        // Si c'est dimanche, soustraire 6 jours
        currentMonday.setDate(today.getDate() - 6);
    } else {
        // Sinon, soustraire 1 car ca commence à 0
        currentMonday.setDate(today.getDate() - (dayOfWeek - 1));
    } // Ajuster pour le lundi

    afficherSemaine(currentMonday); // Appeler la fonction pour afficher la semaine
}

function afficherSemaine(monday) {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    jours.forEach((jour, index) => {
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + index);
        let formattedDate = currentDay.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' });

        const element = document.getElementById(jour);
        if (element) { // Vérifie si l'élément existe avant de le modifier
            element.innerHTML = `${jour.slice(0)} ${formattedDate}`;
        }
    });
}

function semainePlus() {
    currentMonday.setDate(currentMonday.getDate() + 7); // Avancer d'une semaine
    afficherSemaine(currentMonday); // Mettre à jour l'affichage
}

function semaineMoins() {
    currentMonday.setDate(currentMonday.getDate() - 7); // Reculer d'une semaine
    afficherSemaine(currentMonday); // Mettre à jour l'affichage
}

function afficherdetail(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    var nomevent = document.getElementById("nomevent").value;
    var jourdepart = document.getElementById("jourdepart").value;
    var jourfin = document.getElementById("jourfin").value;
    var heuredebut = document.getElementById("heuredebut").value;
    var heurefin = document.getElementById("heurefin").value;
    var colorevent = document.getElementById("colorevent").value;

    // Vérifier si tous les champs sont remplis
    if (nomevent && jourdepart && jourfin && heuredebut && heurefin && colorevent) {
        alert("Voici le recap : \nNom de l'évenement : " + nomevent + 
              " \nDébut de l'évenement : " + jourdepart + " à " + heuredebut + 
              " \nFin de l'évenement : " + jourfin + " à " + heurefin + 
              "\nCode couleur : " + colorevent);
    }
}

window.onload = function() {
    joursemaine(); // Initialise les jours de la semaine
}