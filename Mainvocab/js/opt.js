//Paramètre de learn vocab---------------------------------
if (document.getElementById('checkparam1') !=  null) {
    document.getElementById('checkparam1').onchange = function () {
        //Test du web storage
        if (typeof (Storage) !== "undefined") {
            var radios = document.getElementsByName('param1'); //option 1

            if (radios[0].checked) {//1er paramètre check
                sessionStorage.opt1num = 0;
            }
            if (radios[1].checked) {//2ème paramètre check
                sessionStorage.opt1num = 1;
            }
            if (radios[2].checked) {//3ème paramètre check
                sessionStorage.opt1num = 2;
            }
            console.log(sessionStorage.opt1num);

        } else {//Si pas de web storage
            alert("Désolé votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise à jour");
        }
    }

    //Paramètre de learn vocab---------------------------------
    document.getElementById('checkparam2').onchange = function () {
        //Test du web storage
        if (typeof (Storage) !== "undefined") {
            var radios = document.getElementsByName('param2'); //option 2

            if (radios[0].checked) {//1er paramètre check
                sessionStorage.opt2num = 0;
            }
            if (radios[1].checked) {//2ème paramètre check
                sessionStorage.opt2num = 1;
            }
            console.log(sessionStorage.opt2num);

        } else {//Si pas de web storage
            alert("Désolé votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise à jour");
        }
    }

    //fonction qui se lance à chaque rafraichissement de la page
    try {
        if (sessionStorage.opt1num) {//Check le bon bouton
            var i = sessionStorage.opt1num;
            var radios = document.getElementsByName('param1');
            radios[i].checked = true;
        }

        if (sessionStorage.opt2num) {//Check le bon bouton
            var i = sessionStorage.opt2num;
            var radios = document.getElementsByName('param2');
            radios[i].checked = true;
        }
    }
    catch (err) {
        //console.log(err);
    }
}

function confirmRefresh() {
    console.log("refresh");
    console.log(sessionStorage.lum_som);
    //Gestion du paramètre de luminosité
    try {
        if (sessionStorage.getItem("lum_som") == "true") {
            
            document.body.style.backgroundColor = "black";
            document.getElementById("titre_p").style.borderColor = "gray";
            document.getElementById("titre_p").style.color = "gray";
            //Couleur langue
            document.getElementById("tab_mot").style.color = "gray";
            document.getElementById("titretab").style.backgroundColor = "orange";
        }
    }
    catch (err) {
        console.log(err);
    }
}

//Partie bootstrap dropmenu
$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $(".dropdown-submenu a.som").on("click", function (event) {
        sessionStorage.lum_som = true;
        console.log(sessionStorage.lum_som);
        document.body.style.backgroundColor = "black";
        document.getElementById("titre_p").style.borderColor = "gray";
        document.getElementById("titre_p").style.color = "gray";
        //Couleur langue
        document.getElementById("tab_mot").style.color = "gray";
        document.getElementById("titretab").style.backgroundColor = "orange";
        //document.getElementsByName("nom_opt").style.color = "white";

    });
    $(".dropdown-submenu a.no").on("click", function (event) {
        sessionStorage.lum_som = false;
        document.body.style.backgroundColor = "cornflowerblue";
        document.getElementById("titre_p").style.borderColor = "black";
        document.getElementById("titre_p").style.color = "black";
        //Couleur langue
        document.getElementById("tab_mot").style.color = "black";
        document.getElementById("titretab").style.backgroundColor = "yellow";
        //document.getElementById("nom_opt").style.color = "darkslateblue";
    });
});







//Paramètre verbes irréguliers---------------------------------
if (document.getElementById('checkirr1') != null) {
    document.getElementById('checkirr1').onchange = function () {
        //Test du web storage
        if (typeof (Storage) !== "undefined") {
            var radios = document.getElementsByName('param1irr'); //option 1

            if (radios[0].checked) {//1er paramètre check
                sessionStorage.opt1irr = 0;
            }
            if (radios[1].checked) {//2ème paramètre check
                sessionStorage.opt1irr = 1;
            }
            if (radios[2].checked) {//3ème paramètre check
                sessionStorage.opt1irr = 2;
            }
            if (radios[3].checked) {//4ème paramètre check
                sessionStorage.opt1irr = 3;
            }
            if (radios[4].checked) {//5ème paramètre check
                sessionStorage.opt1irr = 4;
            }
            console.log(sessionStorage.opt1irr);

        } else {//Si pas de web storage
            alert("Désolé votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise à jour");
        }
    }


    //Paramètre verbes irréguliers---------------------------------
    document.getElementById('checkirr2').onchange = function () {
        //Test du web storage
        if (typeof (Storage) !== "undefined") {
            var radios = document.getElementsByName('param2irr'); //option 2

            if (radios[0].checked) {//1er paramètre check
                sessionStorage.opt2irr = 0;
            }
            if (radios[1].checked) {//2ème paramètre check
                sessionStorage.opt2irr = 1;
            }
            console.log(sessionStorage.opt2irr);

        } else {//Si pas de web storage
            alert("Désolé votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise à jour");
        }
    }

    //fonction qui se lance à chaque rafraichissement de la page
    try {
        if (sessionStorage.opt1irr) {//Check le bon bouton
            var i = sessionStorage.opt1irr;
            var radios = document.getElementsByName('param1irr');
            radios[i].checked = true;
        }

        if (sessionStorage.opt2irr) {//Check le bon bouton
            var i = sessionStorage.opt2irr;
            var radios = document.getElementsByName('param2irr');
            radios[i].checked = true;
        }
    }
    catch (err) {
        //console.log(err);
    }
}