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
        document.getElementById(jour).innerHTML = `${jour.slice(0)} ${formattedDate}`; // Afficher le jour avec la date
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

function afficherdetail() {
    var nomevent = document.getElementById("nomevent").value;
    var jourdepart = document.getElementById("jourdepart").value;
    var jourfin = document.getElementById("jourfin").value;
    var heuredebut = document.getElementById("heuredebut").value;
    var heurefin = document.getElementById("heurefin").value;
    var colorevent = document.getElementById("colorevent").value;
    alert("Voici le recap : \nNom de l'évenement : "+ nomevent + " \ndébut de l'évenement : " + jourdepart + " à " + heuredebut + " \nfin de l'évenement : " +jourfin+ " à " + heurefin + "\ncode couleur : " +colorevent);
}