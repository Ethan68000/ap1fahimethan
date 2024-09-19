
// Script pour ajouter les dates locales aux jours de la semaine
window.onload = function() {
    // Récupérer le lundi de la semaine courante
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi

    // Ajuster pour commencer au lundi
    let monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); 

    // Sélectionner les cellules du tableau des jours
    const days = document.querySelectorAll("#premiereligne");

    // Ajouter la date à chaque jour de la semaine
    for (let i = 1; i <= 7; i++) { // De lundi à vendredi
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + (i - 1)); // Calculer la date correspondante

        // Formater la date en DD/MM
        let formattedDate = currentDay.toLocaleDateString("fr-FR");

        // Ajouter la date à côté du jour (Lundi, Mardi, ...)
        days[i].innerHTML += ` ${formattedDate}`;
    }
}
