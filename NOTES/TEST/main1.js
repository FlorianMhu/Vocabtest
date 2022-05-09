// Initialize x in the global scope
let x = 100;

function hoist() {
    // A condition that should not affect the outcome of the code
    if (x>100) {
        let x = 200;
    }
    console.log(x);
}

hoist();