document.getElementById('checkparam1').onchange = function () {
    //Test du web storage
    if (typeof (Storage) !== "undefined") {
        var radios = document.getElementsByName('param1'); //option 1

        if (radios[0].checked) {//1er param�tre check
            sessionStorage.opt1num = 0;
        }
        if (radios[1].checked) {//2�me param�tre check
            sessionStorage.opt1num = 1;          
        }
        if (radios[2].checked) {//3�me param�tre check
            sessionStorage.opt1num = 2;
        }
        console.log(sessionStorage.opt1num);

    } else {//Si pas de web storage
        alert("D�sol� votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise � jour");
    }
}

document.getElementById('checkparam2').onchange = function () {
    //Test du web storage
    if (typeof (Storage) !== "undefined") {
        var radios = document.getElementsByName('param2'); //option 2

        if (radios[0].checked) {//1er param�tre check
            sessionStorage.opt2num = 0;
        }
        if (radios[1].checked) {//2�me param�tre check
            sessionStorage.opt2num = 1;
        }
        console.log(sessionStorage.opt2num);

    } else {//Si pas de web storage
        alert("D�sol� votre navigateur ne supporte le web storage.\n Faites m'en part, et attendez la mise � jour");
    }
}

//fonction qui se lance � chaque rafraichissement de la page
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