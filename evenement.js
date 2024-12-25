class Evenement {
    constructor(nomevent, jourdepart, jourfin, heuredebut, heurefin, colorevent) {
        this.nomevent = nomevent;
        this.jourdepart = jourdepart;
        this.jourfin = jourfin;
        this.heuredebut = heuredebut;
        this.heurefin = heurefin;
        this.colorevent = colorevent;
    }

    static validerEvenement(jourdepart, jourfin, heuredebut, heurefin) {
        if (heuredebut >= heurefin && jourdepart === jourfin) {
            alert("L'heure de début doit être inférieure à l'heure de fin.");
            return false;
        }
        if (jourfin < jourdepart) {
            alert("Le jour de départ doit être avant le jour de fin.");
            return false;
        }
        return true;
    }

    static sauvegarderEvenement(evenement) {
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(evenement);
        localStorage.setItem("events", JSON.stringify(events));
    }
}

// Fonction appelée lors de la soumission du formulaire
function afficherdetail(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const nomevent = document.getElementById("nomevent").value;
    const jourdepart = document.getElementById("jourdepart").value;
    const jourfin = document.getElementById("jourfin").value;
    const heuredebut = document.getElementById("heuredebut").value;
    const heurefin = document.getElementById("heurefin").value;
    const colorevent = document.getElementById("colorevent").value;

    // Valider les données
    if (!Evenement.validerEvenement(jourdepart, jourfin, heuredebut, heurefin)) {
        return;
    }

    // Créer un nouvel événement
    const evenement = new Evenement(nomevent, jourdepart, jourfin, heuredebut, heurefin, colorevent);

    // Afficher dans la console
    console.log("Événement créé :", evenement);

    // Sauvegarder l'événement
    Evenement.sauvegarderEvenement(evenement);

    // Afficher un récapitulatif
    alert(`Récapitulatif de l'événement :
    Nom : ${nomevent}
    Début : ${jourdepart} à ${heuredebut}
    Fin : ${jourfin} à ${heurefin}`);

    window.location.href = 'ap1.html';
}
