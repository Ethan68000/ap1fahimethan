function joursemaine() {
    // Crée un nouvel objet Date représentant la date et l'heure actuelles
    let today = new Date();
    
    // Récupère le jour de la semaine actuel (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
    let dayOfWeek = today.getDay();
    
    // Crée une nouvelle date pour le lundi de la semaine actuelle
    currentMonday = new Date(today);
    
        // Si dimanche
    if (dayOfWeek === 0) {
        // Si c'est dimanche, on soustrait 6 jours pour obtenir le lundi précédent
        currentMonday.setDate(today.getDate() - 6);
    } else {
        // Sinon, décalage d'un jour car commencement a dimache
        currentMonday.setDate(today.getDate() - (dayOfWeek - 1));
    }
    
    // Appelle la fonction afficherSemaine en passant le lundi calculé
    afficherSemaine(currentMonday);
}

// Fonction qui affiche les jours de la semaine à partir d'un lundi donné
function afficherSemaine(monday) {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    
    // Parcourt chaque jour de la semaine avec son index
    jours.forEach((jour, index) => {
        // Crée une nouvelle date pour le jour actuel en ajoutant l'index au lundi
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + index);
        
        // Formate la date au format français (jour et mois avec deux chiffres)
        let formattedDate = currentDay.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' });
        
        // Récupère l'élément HTML correspondant au jour de la semaine
        const element = document.getElementById(jour);
        
        // Vérifie si l'élément existe dans le document
        if (element) {
            // Met à jour le contenu de l'élément avec le jour de la semaine et la date formatée
            element.innerHTML = `${jour.charAt(0).toUpperCase() + jour.slice(1)} ${formattedDate}`;
        }
        afficherDatePlanning(monday);
    });
}

function afficherDatePlanning(monday) {
    const mois = monday.toLocaleString('fr-FR', { month: 'long' });
    const annee = monday.getFullYear();
    const datePlanningElement = document.getElementById("datePlanning");
    
    if (datePlanningElement) {
        datePlanningElement.innerHTML = `${mois.charAt(0).toUpperCase() + mois.slice(1)} ${annee}`;
    }
}

function semainePlus() {
    currentMonday.setDate(currentMonday.getDate() + 7); //ajoute 7 jours à la date
    afficherSemaine(currentMonday);
    afficherEvenements();
}

function semaineMoins() {
    currentMonday.setDate(currentMonday.getDate() - 7); //enleve 7 jours à la date
    afficherSemaine(currentMonday);
    afficherEvenements();
}

function afficherdetail(event) {
    event.preventDefault();
    const nomevent = document.getElementById("nomevent").value; //prend la valeur correspondante
    const jourdepart = document.getElementById("jourdepart").value;
    const jourfin = document.getElementById("jourfin").value;
    const heuredebut = document.getElementById("heuredebut").value;
    const heurefin = document.getElementById("heurefin").value;
    const colorevent = document.getElementById("colorevent").value;

    // Validation des données
    if (heuredebut >= heurefin && jourdepart === jourfin) { //cas si heurededepart est avant heure de fin
        alert("L'heure de début doit être inférieure à l'heure de fin.");
        return;
    }
    if (jourfin < jourdepart) { // cas si jour de départ est après jour de fin
        alert("Le jour de départ doit être avant le jour de fin.");
        return;
    }

    // Sauvegarde de l'événement
    let evenement = { nomevent, jourdepart, jourfin, heuredebut, heurefin, colorevent };
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(evenement);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Recap de l'évenement \nnom : " + nomevent + "\ndepart évenement : " + jourdepart + " à " +heuredebut+ "\nfin de l'évenement : " +jourfin+ " à " +heurefin);
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
    events.forEach((evenement, index) => {
        const jourdepart = evenement.jourdepart;
        const jourfin = evenement.jourfin;
        const heuredebut = evenement.heuredebut;
        const heurefin = evenement.heurefin;

        // Création des dates en ajoutant 'Z' pour UTC
        const dateDebut = new Date(`${jourdepart}T${heuredebut}:00Z`);
        const dateFin = new Date(`${jourfin}T${heurefin}:00Z`);

        // Trouver la cellule correspondante à l'heure de début
        const jourDebut = dateDebut.toLocaleDateString("fr-FR", { weekday: 'long' }).toLowerCase();
        const heureDebut = dateDebut.getUTCHours().toString().padStart(2, '0') + ":00"; // Format HH:MM en UTC
        const affichage = document.querySelector(`td[data-jour="${jourDebut}"][data-heure="${heureDebut}"]`);

        // Appliquer la couleur et le texte de l'événement sur la cellule correspondante
        if (affichage) {
            affichage.style.backgroundColor = evenement.colorevent; // Applique la couleur
            affichage.innerHTML = `<strong class="event">${evenement.nomevent}<br>${heuredebut} - ${heurefin}</strong>
                                   <button onclick="supprimerEvenement(${index})">Supprimer</button> <button onclick="modifierEvenement(${index})">Modifier</button>`; // Ajoute le bouton Supprimer et modifier 
        }
    });
    console.log(events);
}
function modifierEvenement(index){

}

function supprimerEvenement(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.splice(index, 1); // Supprime l'événement à l'index spécifié
    localStorage.setItem("events", JSON.stringify(events)); // Met à jour le localStorage
    afficherEvenements(); // Met à jour l'affichage
}

function resetEvenements() {
    localStorage.removeItem("events"); // Supprime la clé "events" du localStorage
    alert("Tous les événements ont été réinitialisés.");
    afficherEvenements(); // Met à jour l'affichage pour refléter le changement
}

window.onload = function() {
    joursemaine();
    afficherEvenements();
};
