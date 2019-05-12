if (sessionStorage.tableauirr != undefined) {
    var text = document.getElementById("acces_irr");
    text.innerHTML = "Chargement des verbes: Ok"
}

function splittxt(file, irr) {
    // By group of word
    var grp_word = file.split('\n');

    for (var w = 0; w < grp_word.length; w++) {
        //console.log(grp_word[w]);

            var mot_coup = grp_word[w].split("\t");
            irr[0][w] = mot_coup[0];//Enregistrement dans le 4xtableau
            irr[1][w] = mot_coup[1];
            irr[2][w] = mot_coup[2];
            irr[3][w] = mot_coup[3];
        //console.log(irr[0][w] + " = " + irr[1][w] + " = " + irr[2][w] + " = " + irr[3][w]);        
        
    }
    //On enlève les valeurs nulle
    for (var i = 0; i < irr[0].length; i++) {
        if ((irr[1][i] == undefined) | (irr[0][i] == undefined)) {//Remove undefined value from split
            irr[0].splice(i, 1);
            irr[1].splice(i, 1);
            irr[2].splice(i, 1);
            irr[3].splice(i, 1);
        }
    }  
                
    for (var i = 0; i < irr[0].length; i++) {
        //Assignation de num à chaque couple de mot
        irr[4][i] = i;     //Position 4 dans le tableau       
    }     
        
    irr = verification_txt(irr);
    return irr;

}

function verification_txt(tabletxt) {
    //Suppression des especes et trucs inutiles
    for (var lang = 0; lang < 4; lang++) {
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

    var irr = [];
    for (var i = 0; i < 7; i++) {//6 colonne de tableau: base verbale, prétérit,participe passé, traduction, le num de ligne pour le mot, et la forme (0-> base verbale , 1 ->prétérit, 2->participe passé,3->traduction)
        irr[i] = [];
    }
    irr = splittxt(data, irr);
    /*for (i = 0; i < irr[0].length; i++) {
        console.log(irr[0][i] + " = " + irr[1][i] + " = " + irr[2][i] + " = " + irr[3][i]); 
    }*/
    sessionStorage.setItem("tableauirr", JSON.stringify(irr));//Upload des données dans le web storage
    var text = document.getElementById("acces_irr");
    text.innerHTML = "Chargement des verbes: Ok"
            
}


