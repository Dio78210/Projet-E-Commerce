const row = document.getElementById("games-container");

const ol = document.querySelector("#panier");

const videPanier = document.getElementById("videPanier");

var total = document.getElementById("total");

var prixTotal = 0;

var reset = document.getElementById("btn")

if (typeof (localStorage.panier) != "undefined") {
    var panier = JSON.parse(localStorage.panier);
    for (let i = 0; i < panier.length; i++) {
        ajoutPanier(panier[i]);
    }
}
else {
    var panier = [];
}

var jeux;

fetch('jeux.json')
    .then((response) => response.json())
    .then((json) => {

        jeux = json.jeux;


        for (let i = 0; i < json.jeux.length; i++) {
        
            let col3 = document.createElement("div");
            row.appendChild(col3);
            col3.classList.add("col-6", "col-lg-3");

            let card = document.createElement("div");
            col3.appendChild(card);
            card.classList.add("card");

            let card_body = document.createElement("div");
            card.appendChild(card_body);
            card_body.classList.add("card-body");

            let poster_mini = document.createElement("img");
            poster_mini.src = json.jeux[i].affiche;
            card_body.appendChild(poster_mini);
            poster_mini.style.width = "150px";
            poster_mini.style.height = "190px";
            
            
            let title = document.createElement("h3");
            title.textContent = json.jeux[i].titre.substring(0, 30);
            card_body.appendChild(title);

            let description = document.createElement("p");
            description.textContent = json.jeux[i].description.substring(0, 130) + "...";
            card_body.appendChild(description);


            let prix = document.createElement("p");
            prix.textContent = json.jeux[i].prix + " €";
            card_body.appendChild(prix);

            let buttonDetails = document.createElement("button");
            card_body.appendChild(buttonDetails);
            buttonDetails.textContent = "En savoir plus";
            buttonDetails.classList.add("buttonDetails");
            
            // AJOUTER FENETRE MODALE BOUTON DETAILS  

            let buttonAcheter = document.createElement("button");
            card_body.appendChild(buttonAcheter);
            buttonAcheter.textContent = "Acheter";
            buttonAcheter.classList.add("buttonAchat");
            
            // AJOUTER EventListener => ENVOIE DANS LE PANIER AU CLICK
            buttonAcheter.addEventListener("click", function () {

                panier.push(json.jeux[i]);
                localStorage.panier = JSON.stringify(panier);
                ajoutPanier(json.jeux[i]);

                

            });

            
        }

        
        
    });

    // bouton de genre avec event au clic

    let aventure = document.getElementById("aventure");
    aventure.addEventListener("click", () => {
        buttonGenre("Aventure");

    })

    let combat = document.getElementById("combat");
    combat.addEventListener("click", () => {
        buttonGenre("Combat");

    })

    let fps = document.getElementById("fps");
    fps.addEventListener("click", () => {
        buttonGenre("FPS");

    })

    let sport = document.getElementById("sport");
    sport.addEventListener("click", () => {
        buttonGenre("Sport");

    })

    function buttonGenre (genre) {

        row.innerHTML = " ";

        for (let i = 0; i < jeux.length; i++){
        
            if ( jeux[i].genre == genre){

            let col3 = document.createElement("div");
            row.appendChild(col3);
            col3.classList.add("col-6", "col-lg-3");

            let card = document.createElement("div");
            col3.appendChild(card);
            card.classList.add("card");

            let card_body = document.createElement("div");
            card.appendChild(card_body);
            card_body.classList.add("card-body");

            let poster_mini = document.createElement("img");
            poster_mini.src = jeux[i].affiche;
            card_body.appendChild(poster_mini);
            poster_mini.style.width = "150px";
            poster_mini.style.height = "190px";
            
            
            let title = document.createElement("h3");
            title.textContent = jeux[i].titre.substring(0, 30);
            card_body.appendChild(title);

            let description = document.createElement("p");
            description.textContent = jeux[i].description.substring(0, 130) + "...";
            card_body.appendChild(description);


            let prix = document.createElement("p");
            prix.textContent = jeux[i].prix + " €";
            card_body.appendChild(prix);

            let buttonDetails = document.createElement("button");
            card_body.appendChild(buttonDetails);
            buttonDetails.textContent = "En savoir plus";
            buttonDetails.classList.add("buttonDetails");
            
            // AJOUTER FENETRE MODALE BOUTON DETAILS  

            let buttonAcheter = document.createElement("button");
            card_body.appendChild(buttonAcheter);
            buttonAcheter.textContent = "Acheter";
            buttonAcheter.classList.add("buttonAchat");
            
            // AJOUTER EventListener => ENVOIE DANS LE PANIER AU CLICK
            buttonAcheter.addEventListener("click", function () {

                panier.push(json.jeux[i]);
                localStorage.panier = JSON.stringify(panier);
                ajoutPanier(json.jeux[i]);


            });
            }
        }
    }


    videPanier.addEventListener("click", () => {
    empty();
    });

    reset.addEventListener('click', function() {
        window.location.reload();
    })


function ajoutPanier (titreAchete) {

    let li = document.createElement("li");
    ol.appendChild(li);

    let img = document.createElement("img");
    img.style.width = "100px";
    img.style.width = "120px";
    img.src = titreAchete.affiche;
    li.appendChild(img);

    let titrePanier = document.createElement("h4");
    titrePanier.innerHTML = titreAchete.titre;
    li.appendChild(titrePanier);

    let prixPanier = document.createElement("p");
    prixPanier.textContent = titreAchete.prix + " €";
    li.appendChild(prixPanier);

    let nouveauObjet = document.createElement("hr");
    li.appendChild(nouveauObjet);

    prixTotal += titreAchete.prix;
    total.innerText = "TOTAL : " + prixTotal + " €";

}

function empty() {
    document.getElementById("panier").innerHTML = "";
    panier = [];
    total.innerText = "" ;
    localStorage.panier = JSON.stringify(panier);
}

