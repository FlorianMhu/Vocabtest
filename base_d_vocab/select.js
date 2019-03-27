//fonction qui se lance à chaque rafraichissement de la page
if (sessionStorage.butnumber) {//Check le bon bouton
    var i = sessionStorage.butnumber;
    var radios = document.getElementsByName('choix1');
    radios[i].checked = true;

}

document.getElementById('checkbut').onchange = function () {
    //Test du web storage
    if (typeof (Storage) !== "undefined") {
        var radios = document.getElementsByName('choix1');

        if (radios[0].checked) {//1er paramètre check
            sessionStorage.butnumber = 0;
        }
        if (radios[1].checked) {//2ème paramètre check
            sessionStorage.butnumber = 1;
        }
        if (radios[2].checked) {//3ème paramètre check
            sessionStorage.butnumber = 2;
        }
        console.log(sessionStorage.butnumber);

    } else {//Si pas de web storage
        alert("Désolé votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise à jour");
    }
}

function splittxt(file,arr) {
    // By group of word
    var grp_word = file.split(';');

    for (var w = 0; w < grp_word.length; w++) {
        //console.log(grp_word[w]);

        var mot_coup = grp_word[w].split(':');
        arr[0][w] = mot_coup[0];//Enregistrement dans le 2xtableau
        arr[1][w] = mot_coup[1];
        //console.log(arr[0][w] + "==" + arr[1][w]);          
    }
    //On enlève les valeurs nulle
    for (var i = 0; i < arr[0].length; i++) {
        if ((arr[1][i] == undefined) | (arr[0][i] == undefined)) {//Remove undefined value from split
            arr[0].splice(i, 1);
            arr[1].splice(i, 1);
        }
    }  
                
    for (var i = 0; i < arr[0].length; i++) {
        //Assignation de num à chaque couple de mot
        arr[2][i] = i;            
    }     
        
    arr = verification_txt(arr);
    return arr;

}

function verification_txt(tabletxt) {
    //Suppression des especes et trucs inutiles
    for (var lang = 0; lang < 2; lang++) {
        for (i = 0; i < tabletxt[0].length; i++) {
            //Supression des sauts de ligne éventuels et espaces en début de chaîne
            //console.log(tabletxt[lang][i]);

            while ((tabletxt[lang][i][0] == "\r") | (tabletxt[lang][i][0] == "\n") | (tabletxt[lang][i][0] == " ")) {
                tabletxt[lang][i] = tabletxt[lang][i].slice(1);
                //console.log(tabletxt[lang][i]);
            }
            //Suppression des espaces en fin de chaîne de caractère
            while ((tabletxt[lang][i][(tabletxt[lang][i].length - 1)] == " ") | (tabletxt[lang][i][(tabletxt[lang][i].length - 1)] == "\r") | (tabletxt[lang][i][(tabletxt[lang][i].length - 1)] == "\n")) {
                tabletxt[lang][i] = tabletxt[lang][i].slice(0, (tabletxt[lang][i].length - 1));
                //console.log(tabletxt[lang][i]);
            }
        }
    }
    return tabletxt;
}

function load_data() {
    if (sessionStorage.butnumber) {
        var arr = [];
        for (var i = 0; i < 4; i++) {//4 colonne de tableau: mots anglais, mots français, le num de ligne pour le mot, et la langue (0-> anglais , 1 ->français)
            arr[i] = [];
        }

        var nametxt = "text" + sessionStorage.butnumber;
        var text = document.getElementById(nametxt).innerHTML;
        //console.log(text);

        arr = splittxt(text,arr);
        /*for (i = 0; i < arr[0].length; i++) {
            console.log(arr[0][i] + "==" + arr[1][i]);
        }*/

        sessionStorage.setItem("tableau", JSON.stringify(arr));//Upload des données dans le web storage
        
        window.open("../index.html", "_self");//Ouverture page précèdente
        
    }
}

