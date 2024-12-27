class Planning {
    afficherEvenements() {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        console.log("Événements chargés :", events);
    
        // Réinitialisation des cellules
        document.querySelectorAll("td[data-heure]").forEach(cell => {
            cell.style.backgroundColor = "";
            cell.innerHTML = "";
        });
    
        events.forEach((evenement, index) => {
            const jourdepart = evenement.jourdepart;
            const jourfin = evenement.jourfin;
            const heuredebut = evenement.heuredebut;
            const heurefin = evenement.heurefin;
    
            // Création des dates
            let currentDate = new Date(`${jourdepart}T${heuredebut}`);
            const dateFin = new Date(`${jourfin}T${heurefin}`);
    
            while (currentDate <= dateFin) {
                const jour = currentDate.toLocaleDateString("fr-FR", { weekday: 'long' }).toLowerCase();
                const heure = currentDate.getHours().toString().padStart(2, '0') + ":00";
    
                console.log(`Traitement cellule pour jour=${jour}, heure=${heure}`);
                const cellule = document.querySelector(`td[data-jour="${jour}"][data-heure="${heure}"]`);
    
                if (cellule) {
                    console.log(`Cellule trouvée pour jour=${jour}, heure=${heure}`);
                    cellule.style.backgroundColor = evenement.colorevent;
                    if (!cellule.innerHTML) {
                        cellule.innerHTML = `<div class="event">
                                                <strong>${evenement.nomevent}</strong><br>
                                                ${heuredebut} - ${heurefin}<br>
                                                <button onclick="supprimerEvenement(${index})">Supprimer</button>
                                                <button onclick="modifierEvenement(${index})">Modifier</button>
                                            </div>`;
                    }
                } else {
                    console.log(`Cellule introuvable pour jour=${jour}, heure=${heure}`);
                }
    
                currentDate.setHours(currentDate.getHours() + 1);
            }
        });
    }
    
    ajoutEvenement(evenement) {
        // Ajout d'un événement dans le localStorage
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(evenement);
        localStorage.setItem("events", JSON.stringify(events));
        this.afficherEvenements(); // Mise à jour de l'affichage
    }

    supprimerEvenement(index) {
        // Suppression d'un événement par son index
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        this.afficherEvenements(); // Mise à jour de l'affichage
    }

    modifierEvenement(index) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const evenement = events[index];

        if (evenement) {
            // Remplir le formulaire avec les données de l'événement à modifier
            document.getElementById("nomevent").value = evenement.nomevent;
            document.getElementById("jourdepart").value = evenement.jourdepart;
            document.getElementById("jourfin").value = evenement.jourfin;
            document.getElementById("heuredebut").value = evenement.heuredebut;
            document.getElementById("heurefin").value = evenement.heurefin;
            document.getElementById("colorevent").value = evenement.colorevent;

            // Suppression de l'événement actuel pour qu'il soit remplacé
            events.splice(index, 1);
            localStorage.setItem("events", JSON.stringify(events));

            // Rediriger vers la page de formulaire
            window.location.href = "evenement.html";
        }
    }
}

// Fonctions globales pour interagir avec la classe Planning
const planning = new Planning();

function supprimerEvenement(index) {
    planning.supprimerEvenement(index);
}

function modifierEvenement(index) {
    planning.modifierEvenement(index);
}

// Charger les événements à l'ouverture de la page
window.onload = function () {
    planning.afficherEvenements();
};