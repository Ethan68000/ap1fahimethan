
window.onload = function() {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    let today = new Date();
    let dayOfWeek = today.getDay();
    let monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Ajuster pour le lundi

    jours.forEach((jour, index) => {
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + index);
        let formattedDate = currentDay.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' });
        document.getElementById(jour).innerHTML += ` ${formattedDate}`;
    });
};
