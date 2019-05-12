//document.getElementById('tt').innerHTML = "Et ceci du Javascript";
var irr = [];
for (var i = 0; i < 7; i++) {//6 colonne de tableau: base verbale, prétérit,participe passé, traduction, le num de ligne pour le mot, la val_forme (0-> base verbale , 1 ->prétérit, 2->participe passé,3->traduction) et le nom de la forme
    irr[i] = [];
}
var irr2;
var irr3_modif;
var start_ligne = 0;//Ligne de départ pour la génération
var generation = false; //Si la gération a été effectué
var compteur_nbcorrect = 0;//Compte le nombre de fois que l'on a appuyé sur le bouton correction
var max_correct = 4;//Nombre max de correction

//Affichage du nb max
var btn_correct = document.getElementById("correct");
btn_correct.innerHTML = "Correction : " + max_correct;

function construction_tableau(set) {
    var nb_ligne = document.getElementById("num").value;
    var nb_ligne = parseInt(nb_ligne, 10);
    if (nb_ligne > 100) {//Si nombre trop élevé
        nb_ligne = 100;
        alert("Nombre de mot maximum = 100");
    }
    if (!sessionStorage.tableauirr) { //Test si l'utilisateur à choisi son vocabulaire
        alert("Charger les verbes\n (bouton en haut à droite) !");
        return 0;
    }

    irr = JSON.parse(sessionStorage.getItem("tableauirr"));//Récupère les tableaux de vocabulaire

    compteur_nbcorrect = 0; //Reset du nombre d'appui
    btn_correct.innerHTML = "Correction : " + max_correct;

    irr2 = JSON.parse(JSON.stringify(irr));
    // Passage d'un tableau global a un local

    irr3_modif = choix_mots(irr2, nb_ligne);

    //Si il n'y a pas assez de mot a afficher
    if (irr2[0].length < nb_ligne) {
        nb_ligne = irr2[0].length;
    }
    //Set start ligne
    var radios = document.getElementsByName('param2irr');
    if ((set == 1) & (generation == true)) {
        if (radios[0].checked) {
            if (start_ligne + nb_ligne > irr2[0].length) {
                start_ligne = irr2[0].length - nb_ligne;
                console.log(nb_ligne + " " + start_ligne);     
            }
            var nb_ligne = nb_ligne + start_ligne;
        }
    }
    else {
        start_ligne = 0;
    }
    if (radios[1].checked) {//Reset à la transition du param2 sur la génération d'autre mot
        start_ligne = 0;
    }

    var tbody = document.getElementById("tab_mot");
    tbody.innerHTML = '';
    for (var i = start_ligne; i < nb_ligne; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("id", "ligne" + i); //le + concatenne le caractère et la variable
        tbody.appendChild(tr);
        for (var col = 0; col < 5; col++) {
            var td = document.createElement('td'); 
            var text_col = null;
            if (col == 0) {
                text_col = i + 1;
                td.appendChild(document.createTextNode(text_col));
            }
            else {
                if (col == 1) {     // Remplissage de la page avec le tableau modifié
                    text_col = irr3_modif[0][i];
                }

                if (col == 2) {
                    text_col = irr3_modif[1][i];
                }

                if (col == 3) {
                    text_col = irr3_modif[2][i];
                }

                if (col == 4) {
                    text_col = irr3_modif[3][i];
                }
                td.innerHTML = text_col;
            }           
            tr.appendChild(td);
        }
    }
    generation = true;
    if (radios[0].checked) {
        start_ligne = nb_ligne;
    } 
}

function choix_mots(irr2,nb_ligne) {//Application des option de l'exo
    var irr3_modif = JSON.parse(JSON.stringify(irr2));

    //Gestion du 1er paramètre
    var radios = document.getElementsByName('param1irr');
    for (var i = 0; i < irr3_modif[0].length; i++) {
        //Mise en place des inputs 
        irr3_modif[0][i] = "<input id=bv" + i + " size=15 type=text autocomplete=false >";
        irr3_modif[1][i] = "<input id=preterit" + i + " size=15 type=text autocomplete=false >";
        irr3_modif[2][i] = "<input id=pp" + i + " size=15 type=text autocomplete=false >";
        irr3_modif[3][i] = "<input id=trad" + i + " size=15 type=text autocomplete=false >";

        if (radios[0].checked) {
            //Transformation de la 1ere colonne en normal
            irr3_modif[0][i] = irr2[0][i];
            irr3_modif[5][i] = 0;
            irr3_modif[6][i] = "bv";

        }
        if (radios[1].checked) {
            //Transformation de la 2eme colonne en normal
            irr3_modif[1][i] = irr2[1][i];
            irr3_modif[5][i] = 1;
            irr3_modif[6][i] = "preterit";
        }
        if (radios[2].checked) {
            //Transformation de la 3eme colonne en normal
            irr3_modif[2][i] = irr2[2][i];
            irr3_modif[5][i] = 2;
            irr3_modif[6][i] = "pp";    
        }
        if (radios[3].checked) {
            //Transformation de la 4eme colonne en normal
            irr3_modif[3][i] = irr2[3][i];
            irr3_modif[5][i] = 3;
            irr3_modif[6][i] = "trad";   
        }
        if (radios[4].checked) {
            //Transformation de colonne aléatoire en normal
            var x = Math.floor((Math.random() * 4));//Prend une valeur entre 0 et 3
            if (x == 0) {
                irr3_modif[0][i] = irr2[0][i];
                irr3_modif[5][i] = 0;
                irr3_modif[6][i] = "bv";
            }
            if (x == 1) {
                irr3_modif[1][i] = irr2[1][i];
                irr3_modif[5][i] = 1;
                irr3_modif[6][i] = "preterit";
            }
            if (x == 2) {
                irr3_modif[2][i] = irr2[2][i];
                irr3_modif[5][i] = 2;
                irr3_modif[6][i] = "pp";
            }
            if (x == 3) {
                irr3_modif[3][i] = irr2[3][i];
                irr3_modif[5][i] = 3;
                irr3_modif[6][i] = "trad";
            }
            
        }
    }

    //Gestion du 2eme paramètre
    var radios = document.getElementsByName('param2irr');
    if (radios[1].checked) {
        var irr4_ran = JSON.parse(JSON.stringify(irr3_modif)); //Méthode pour copier du tableau
        for (var i = 0; i < nb_ligne; i++) {
            var x = Math.floor((Math.random() * (irr4_ran[0].length)));//Prend une valeur aléatoire de la taille du tableau qui se réduit au fur et à mesure
            //Copie
            irr3_modif[0][i] = irr4_ran[0][x];
            irr3_modif[1][i] = irr4_ran[1][x];
            irr3_modif[2][i] = irr4_ran[2][x];
            irr3_modif[3][i] = irr4_ran[3][x];
            irr3_modif[4][i] = irr4_ran[4][x];

            //Réduction
            irr4_ran[0].splice(x, 1);
            irr4_ran[1].splice(x, 1);
            irr4_ran[2].splice(x, 1);   
            irr4_ran[3].splice(x, 1); 
            irr4_ran[4].splice(x, 1); 

            /*for (var j = 0; j < irr4_ran[0].length; j++) {
                console.log(irr4_ran[0][j] + " |traduction| " + irr4_ran[1][j] + " et " + (j + 1));
            }
            console.log("---------------------")*/
        }
        for (i = 0; i < 5; i++) {//Attention ici il  ne faut pas delete les dernière colonne qui contiennent les données avant l'aléa
            irr3_modif[i].splice(nb_ligne, irr3_modif[i].length);
            //console.log(irr3_modif[i]);
        }
    }

    return irr3_modif;
}

function correction() {
    console.clear();
    var liste = ["bv", "preterit", "pp", "trad"];
    var liste_nb = [0, 1, 2, 3];
    if ((generation == false) | (compteur_nbcorrect >= max_correct)) {//Ne corrige pas si génération des mots n'est pas effectué
        return 0;
    }
    compteur_nbcorrect = compteur_nbcorrect + 1; //Incrémentation du compteur 
    btn_correct.innerHTML = "Correction : " + (max_correct - compteur_nbcorrect); //Affichage du nb restant de correct

    var irr4_ranger = JSON.parse(JSON.stringify(irr3_modif));
    var radios = document.getElementsByName('param1irr');

    if (!radios[4].checked) {//tous les paramètres sauf l'aléa
        var forme = liste;
        forme.splice(liste.indexOf(irr3_modif[6][0]),1);//Position de la forme dans la liste puis supression et nouvelle variable
        var val_forme = liste_nb;
        val_forme.splice(liste_nb.indexOf(irr3_modif[5][0]),1);//On met 0 car pour les 4 premiers paramètres c'est le même
    }

    for (var i = 0; i < irr2[0].length; i++) {
        if (radios[4].checked) {//5ème paramètre Aléatoire
            //Sélectionne la case de forme aléatoire choisie
            var forme = JSON.parse(JSON.stringify(liste));//Variable pour enregistrer la forme choisie aléatoierement
            forme.splice(liste.indexOf(irr3_modif[6][i]),1);//Position de la forme dans la liste puis supression et nouvelle variable

            var val_forme = JSON.parse(JSON.stringify(liste_nb));
            val_forme.splice(liste_nb.indexOf(irr3_modif[5][i]), 1);
            //Les 2 dernière colonne du tableau irr3_modif contiennent toutes les infos avant l'aléa et sont bien rangées
        }
        //console.log(irr3_modif[6][i]);
        for (var t = 0; t < forme.length; t++) {//Pour tous les input possible, si on a déjç rentré une bonne val, on peut refaire les test pour la ligne
            var erreur = false;//Si il peut continuer le programme de correction
            try {
                var data = [];
                data[t] = document.getElementById(forme[t] + i).value;//Récupération des données entrées par l'utilisateur dans l'input
            }

            catch (err) {
                //console.log(err);
                erreur = true;
            }
        
            if (erreur != true) {

                console.log(irr2[4][i] + "::");

                irr4_ranger[val_forme[t]][i] = data[t];//Pour l'aléatoire et le normal on trouve où doit se ranger la valeur

                console.log(irr2[val_forme[t]][i] + "///" + irr4_ranger[val_forme[t]][i]);

                //Tests de corection de la valeur
                var mot_reference = irr2[val_forme[t]][i];//On mets les chaînes de caractères dans une variable
                var mot_ecrit = irr4_ranger[val_forme[t]][i];

                //Suppression espace en trop ajouté à la fin d'un mot
                while (mot_ecrit[(mot_ecrit.length - 1)] == " ") {
                    mot_ecrit = mot_ecrit.slice(0, (mot_ecrit.length - 1));
                }

                /*for (var position_mot = 0; position_mot < mot_ecrit.length; position_mot = position_mot + 2) {
                    if (position_mot == 0) {

                    }
                }*///test

                if (((mot_reference[0].toLowerCase() + mot_reference.substring(1)) == mot_ecrit) | ((mot_reference[0].toUpperCase() + mot_reference.substring(1)) == mot_ecrit)) {
                    corrige(forme[t], i, val_forme[t], 1); //1 car bonne valeur
                }
                else {
                    //Si compteur de correction dépasse la valeur entré par l'utilisateur
                    if (compteur_nbcorrect >= max_correct) {
                        corrige(forme[t], i, val_forme[t], 0);//0 car pas réussi à trouver la valeur
                    }
                    else {
                        document.getElementById(forme[t] + i).style.backgroundColor = "red";
                    }
                }
                
            }
        }
        
    }
}

function corrige(forme, i, val_forme,reussi)//forme pour le texte et val_forme sa valeur dans un tableau(0 à 3)
{
    var input = document.getElementById(forme + i);//On se place au niveau de l'input
    var para = document.createElement('p'); //On crée un élément paragraphe
    if (reussi == 0) {//Si l'utilisateur n'a pas trouvé on écrit en jaune le mot
        para.setAttribute("style", "color:yellow");
    }   
    para.appendChild(document.createTextNode(irr2[val_forme][i])); //On insére le bon text dans le paragraphe
    input.parentNode.replaceChild(para, input);//On remplace l'input par le paragraphe
}
