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
}

function semaineMoins() {
    currentMonday.setDate(currentMonday.getDate() - 7); //enleve 7 jours à la date
    afficherSemaine(currentMonday);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        semainePlus();
    } else if (event.key === 'ArrowLeft') {
        semaineMoins(); 
    }
});

 function resetEvenements() {
    localStorage.removeItem("events"); // Supprime la clé "events" du localStorage
    alert("Tous les événements ont été réinitialisés.");
}

window.onload = function() {
    console.log("LocalStorage au chargement de ap1.html :");
    console.log(JSON.parse(localStorage.getItem("events")));
    joursemaine();
};
