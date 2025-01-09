let currentMonday; // Déclaration de currentMonday en tant que variable globale

function joursemaine() {
    let today = new Date();
    let dayOfWeek = today.getDay();
    
    currentMonday = new Date(today); // Assurez-vous que currentMonday est défini ici
    
    if (dayOfWeek === 0) {
        currentMonday.setDate(today.getDate() - 6);
    } else {
        currentMonday.setDate(today.getDate() - (dayOfWeek - 1));
    }
    
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
    });
    
    afficherDatePlanning(monday); // Déplacez cet appel ici pour qu'il soit exécuté après la boucle
}

function afficherDatePlanning(monday) {
    const jours = monday.getDate() ;
    const mois = monday.toLocaleString('fr-FR', { month: 'long' });
    const annee = monday.getFullYear();
    const datePlanningElement = document.getElementById("datePlanning");
    
 if (datePlanningElement) {
        datePlanningElement.innerHTML = ` Semaine du ${jours} ${mois.charAt(0).toUpperCase() + mois.slice(1)} ${annee}`;
    }
}

function semainePlus() {
    if (currentMonday) {
        currentMonday.setDate(currentMonday.getDate() + 7);
        afficherSemaine(currentMonday);
    } else {
        console.error("currentMonday n'est pas défini");
    }
}

function semaineMoins() {
    if (currentMonday) {
        currentMonday.setDate(currentMonday.getDate() - 7);
        afficherSemaine(currentMonday);
    } else {
        console.error("currentMonday n'est pas défini");
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        semainePlus();
    } else if (event.key === 'ArrowLeft') {
        semaineMoins();
    }
});

function resetEvenements() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les événements ?")) {
        localStorage.removeItem("events");
        alert("Tous les événements ont été réinitialisés.");
    }
}

window.onload = function() {
    console.log("LocalStorage au chargement de ap1.html :");
    console.log(JSON.parse(localStorage.getItem("events")));
    joursemaine(); // Appel de joursemaine pour définir currentMonday
    console.log("currentMonday après joursemaine :", currentMonday); // Vérifiez la valeur de currentMonday
    planning.afficherEvenements(); // Appel correct de la méthode
};