class Creneau {
    constructor(evenement, jourHrsDebut=null,jourHrsFin=null){
        this.evenement = evenement;
        this.jourHrsDebut = jourHrsDebut;

        if (typeof(jourHrsFin) == "number")
        {
            this.jourHrsFin = new Date(this.jourHrsDebut);
            this.jourHrsFin.setMinutes(this.jourHrsFin.getMinutes())
        }
        else
        {
            this.jourHrsFin = jourHrsFin
        }

    }


    static heure2String(date)
    {
        var h = date.getHours()
        if (h < 10){
            '0' + h
        }
        var m = date.getMinutes()
        if(m < 10){
            '0' + m
        }
        return h +":" + m 
    }

    static date2String(date)
    {
        var j = date.getDay()

        var m = date.getMonth()

        var y = date.getFullYear()

        return j + "/" + m + "/" + y
    }

    getHeureDebut2String()
    {
        return Creneau.heure2String(this.jourHrsDebut)
    }

    creeObjetHTML(plJour, x, width, hourStart){
        var plHeure = plJour.children[0];
        var heureHeight = plHeure.offsetHeight + 1;

        var c = document.createElement("div");
        c.className = "PlCreneau";
        c.style.backgroundColor = this.evenement.getCouleur();
        c.style.width = width + "px";
        c.style.left = x + "px";
        //Calcule la largeur du bloc de planning  c.style.height = this.calculerDureeEnMinutes()* hourHeight;

        var h = this.jourHrsDebut.getHours() - hourStart;
        var y = (h*60 + this.jourHrsDebut.getMinutes());
        c.style.top = y + "px";

        var str = "<div><span>" + this.getHeureDebut2String;
        str += "<div><span>" + this.evenement.getLibelle();
        c = innerHTML = str;

        plJour.appendChild(c);
    }
}