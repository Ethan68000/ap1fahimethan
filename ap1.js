let currentMonday;
const joursMapping = {
    "lundi": "lundi",
    "mardi": "mardi",
    "mercredi": "mercredi",
    "jeudi": "jeudi",
    "vendredi": "vendredi",
    "samedi": "samedi",
    "dimanche": "dimanche"
};

function joursemaine() {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    let today = new Date();
    let dayOfWeek = today.getDay();
    currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
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
            element.innerHTML = `${jour.charAt(0).toUpperCase() + jour.slice(1)} ${formattedDate}`;
        }
    });
}

function semainePlus() {
    currentMonday.setDate(currentMonday.getDate() + 7);
    afficherSemaine(currentMonday);
    afficherEvenements();
}

function semaineMoins() {
    currentMonday.setDate(currentMonday.getDate() - 7);
    afficherSemaine(currentMonday);
    afficherEvenements();
}

function afficherdetail(event) {
    event.preventDefault();
    const nomevent = document.getElementById("nomevent").value;
    const jourdepart = document.getElementById("jourdepart").value;
    const jourfin = document.getElementById("jourfin").value;
    const heuredebut = document.getElementById("heuredebut").value;
    const heurefin = document.getElementById("heurefin").value;
    const colorevent = document.getElementById("colorevent").value;

    // Validation des données
    if (heuredebut >= heurefin && jourdepart === jourfin) {
        alert("L'heure de début doit être inférieure à l'heure de fin.");
        return;
    }
    if (jourfin < jourdepart) {
        alert("Le jour de départ doit être avant le jour de fin.");
        return;
    }

    // Sauvegarde de l'événement
    let evenement = { nomevent, jourdepart, jourfin, heuredebut, heurefin, colorevent };
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(evenement);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Évènement ajouté avec succès !");
    afficherEvenements(); // Afficher immédiatement l'événement
    window.location.href = 'ap1.html'; // Retourne au planning
}

function afficherEvenements() {
    const events = JSON.parse(localStorage.getItem("events")) || [];

    // Réinitialisation des cellules avant d'afficher les événements
    document.querySelectorAll("td[data-heure]").forEach(cell => {
        cell.style.backgroundColor = ""; // Réinitialisation du fond
        cell.innerHTML = ""; // Effacer le contenu
    });

    // Boucle pour afficher chaque événement
    events.forEach(evenement => {
        const jourdepart = evenement.jourdepart;
        const jourfin = evenement.jourfin;
        const heuredebut = evenement.heuredebut;
        const heurefin = evenement.heurefin;

        // Création des dates en ajoutant 'Z' pour UTC
        const dateDebut = new Date(`${jourdepart}T${heuredebut}:00Z`);
        const dateFin = new Date(`${jourfin}T${heurefin}:00Z`);

        // Vérifiez si les dates sont valides
        if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime())) {
            console.error("Date invalide:", dateDebut, dateFin);
            return; // Ignore cet événement si la date est invalide
        }

        // Trouver la cellule correspondante à l'heure de début
        const jourDebut = dateDebut.toLocaleDateString("fr-FR", { weekday: 'long' }).toLowerCase();
        const jourIdDebut = joursMapping[jourDebut]; // Utilise l'ID correspondant au jour
        const heureDebut = dateDebut.getUTCHours().toString().padStart(2, '0') + ":00"; // Format HH:MM en UTC
        const cellDebut = document.querySelector(`td[data-jour="${jourIdDebut}"][data-heure="${heureDebut}"]`);

        // Appliquer la couleur et le texte de l'événement sur la cellule correspondante
        if (cellDebut) {
            cellDebut.style.backgroundColor = evenement.colorevent; // Applique la couleur
            cellDebut.innerHTML = `<strong class="event">${evenement.nomevent}</strong>`; // Affiche l'événement
        }
    });
    console.log(events);
}


window.onload = function() {
    joursemaine();
    afficherEvenements();
};
