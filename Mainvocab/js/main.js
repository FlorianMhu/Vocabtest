﻿//document.getElementById('tt').innerHTML = "Et ceci du Javascript";
var arr = [];
for (var i = 0; i < 4; i++) {//4 colonne de tableau: mots anglais, mots français, le num de ligne pour le mot, et la langue (0-> anglais , 1 ->français)
    arr[i] = [];
}
var arr2;
var arr3_modif;
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
    if (!sessionStorage.tableau) { //Test si l'utilisateur à choisi son vocabulaire
        alert("Choisissez le vocabulaire !");
        return 0;
    }

    arr = JSON.parse(sessionStorage.getItem("tableau"));//Récupère les tableaux de vocabulaire

    compteur_nbcorrect = 0; //Reset du nombre d'appui
    btn_correct.innerHTML = "Correction : " + max_correct;

    arr2 = JSON.parse(JSON.stringify(arr));
    // Passage d'un tableau global a un local

    arr3_modif = choix_mots(arr2, nb_ligne);

    //Si il n'y a pas assez de mot a afficher
    if (arr2[0].length < nb_ligne) {
        nb_ligne = arr2[0].length;
    }
    //Set start ligne
    var radios = document.getElementsByName('param2');
    if ((set == 1) & (generation == true)) {
        if (radios[0].checked) {
            if (start_ligne + nb_ligne > arr2[0].length) {
                start_ligne = arr2[0].length - nb_ligne;
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
        for (var col = 0; col < 3; col++) {
            var td = document.createElement('td'); 
            var text_col = null;
            if (col == 0) {
                text_col = i + 1;
                td.appendChild(document.createTextNode(text_col)); 
            }
            if (col == 1) {     // Remplissage de la page avec le tableau modifié
                text_col = arr3_modif[0][i];
                td.innerHTML = text_col;
            }
            if (col == 2) {
                text_col = arr3_modif[1][i];
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

function choix_mots(arr2,nb_ligne) {//Application des option de l'exo
    var arr3_modif = JSON.parse(JSON.stringify(arr2));
        
    //Gestion du 1er paramètre
    var radios = document.getElementsByName('param1');
    if (radios[0].checked) {
        //Transformation de la 1ere colonne en input
        for (var i = 0; i < arr3_modif[0].length; i++) {
            arr3_modif[0][i] = "<input id=anglais" + i + " size=20 type=text autocomplete=false >";
        }        
    }
    if (radios[1].checked) {
        //Transformation de la 2eme colonne en input
        for (var i = 0; i < arr3_modif[0].length; i++) {
            arr3_modif[1][i] = "<input id=français" + i + " size=20 type=text autocomplete=false >";
        }        
    }
    if (radios[2].checked) {
        //Transformation de colonne aléatoire en input
        for (var i = 0; i < arr3_modif[0].length; i++) {
            var x = Math.floor((Math.random() * 2));//Prend soit 0 ou 1
            if (x == 0) {
                arr3_modif[x][i] = "<input id=anglais" + i + " size=20 type=text autocomplete=false>";
                arr3_modif[3][i] = 0;
            }
            else {
                arr3_modif[x][i] = "<input id=français" + i + " size=20 type=text autocomplete=false >";
                arr3_modif[3][i] = 1;
            } 
        }                
    }

    //Gestion du 2eme paramètre
    var radios = document.getElementsByName('param2');
    if (radios[1].checked) {
        var arr4_ran = JSON.parse(JSON.stringify(arr3_modif)); //Méthode pour copier du tableau
        for (var i = 0; i < nb_ligne; i++) {
            var x = Math.floor((Math.random() * (arr4_ran[0].length)));//Prend une valeur aléatoire de la taille du tableau qui se réduit au fur et à mesure
            arr3_modif[0][i] = arr4_ran[0][x];
            arr3_modif[1][i] = arr4_ran[1][x];
            arr3_modif[2][i] = arr4_ran[2][x];
            arr4_ran[0].splice(x, 1);
            arr4_ran[1].splice(x, 1);
            arr4_ran[2].splice(x, 1);           
           /* for (var j = 0; j < arr4_ran[0].length; j++) {
                console.log(arr4_ran[0][j] + " |traduction| " + arr4_ran[1][j] + " et " + (j + 1));
            }
            console.log("---------------------");*/
        }
        for (i = 0; i < 3; i++) {
            arr3_modif[i].splice(nb_ligne, arr3_modif[i].length);
            //console.log(arr3_modif[i]);
        }
    }

    return arr3_modif;
}

function correction() {
    console.clear();
    if ((generation == false) | (compteur_nbcorrect >= max_correct)) {//Ne corrige pas si génération des mots n'est pas effectué
        return 0;
    }
    compteur_nbcorrect = compteur_nbcorrect + 1; //Incrémentation du compteur 
    btn_correct.innerHTML = "Correction : " + (max_correct - compteur_nbcorrect); //Affichage du nb restant de correct

    var arr4_ranger = JSON.parse(JSON.stringify(arr3_modif));
    var radios = document.getElementsByName('param1');
    if (radios[0].checked) {//1er paramètre
        var langue = "anglais";
        var val_lang = 0;
    }
    if (radios[1].checked) {//2ème paramètre
        var langue = "français";
        var val_lang = 1;
    }
    
    for (var i = 0; i < arr2[0].length; i++) {
        var erreur = false;//Si il peut continuer le programme de correction
            if (radios[2].checked) {//3ème paramètre
                if (arr3_modif[3][i] == 0) {//Sélectionne la case de langue aléatoire choisie
                    var val_lang = 0;//Variable pour enregistrer la langue choisie aléatoierement
                    var langue = "anglais";
                }
                else {
                    var val_lang = 1;
                    var langue = "français";
                }
            }
        //Explication : arr3_modif possède dans sa dernière colonne les infos sur la langue avant (si l'option coché) que le les premières
        //colonne du tableau ne soit changées. Donc lorsque que l'on rentre dans la boucle for(i) la dernière colonne du tableau est analysée
        //Et on peut ressortir la valeur de langue 0(anglais) ou 1(français) et l'uitiliser pour trouver l'input qui sera à la même val de i
        //console.log(arr3_modif[3][i] + " " + i);
        
        try {
            var data = document.getElementById(langue + i).value;//Récupération des données entrées par l'utilisateur dans l'input
            //console.log("Une data :" + langue + i);
        }
        catch(err) {
            //console.log(err);
            erreur = true;
        }                   

        if (erreur != true) {
            
            console.log(arr2[2][i] + "::");

            arr4_ranger[val_lang][i] = data;//Pour l'aléatoire et le normal on trouve où doit se ranger la valeur

            console.log(arr2[val_lang][i] + "///" + arr4_ranger[val_lang][i]);


            //Tests de corection de la valeur
            var mot_reference = arr2[val_lang][i];//On mets les chaînes de caractères dans une variable
            var mot_ecrit = arr4_ranger[val_lang][i];

            //Suppression espace en trop ajouté à la fin d'un mot
            while (mot_ecrit[(mot_ecrit.length - 1)] == " ") {
                mot_ecrit = mot_ecrit.slice(0, (mot_ecrit.length - 1));
            }

            for (var position_mot = 0; position_mot < mot_ecrit.length; position_mot = position_mot + 2) {
                if (position_mot == 0) {

                }
            }

            if (((mot_reference[0].toLowerCase() + mot_reference.substring(1)) == mot_ecrit) | ((mot_reference[0].toUpperCase() + mot_reference.substring(1)) == mot_ecrit)) {
                corrige(langue, i, val_lang,1); //1 car bonne valeur
            }
            else {
                //Si compteur de correction dépasse la valeur entré par l'utilisateur
                if (compteur_nbcorrect >= max_correct) {
                    corrige(langue, i, val_lang,0);//0 car pas réussi à trouver la valeur
                }
                else {
                    document.getElementById(langue + i).style.backgroundColor = "red";
                }
            } 

        }
    }
}

function corrige(langue, i, val_lang,reussi)//langue pour le texte et val_langue sa valeur dans un tableau(0 ou 1)
{
    var input = document.getElementById(langue + i);//On se place au niveau de l'input
    var para = document.createElement('p'); //On crée un élément paragraphe
    if (reussi == 0) {//Si l'utilisateur n'a pas trouvé on écrit en ruge le mot
        para.setAttribute("style", "color:yellow");
    }   
    para.appendChild(document.createTextNode(arr2[val_lang][i])); //On insére le bon text dans le paragraphe
    input.parentNode.replaceChild(para, input);//On remplace l'input par le paragraphe
}
