function preloadImages(dir, n) {
    let files = [...Array(n+1).keys(), "monlogo"].slice(1);
    let images = [];

    for (let i = 0; i < files.length; i++) {
        images[i] = new Image();
        images[i].src = dir + "/" + files[i] + ".png";
    }
}

function removeClass(classname, idx = 0) {
    let regex = new RegExp(classname + " ?", "g");

    let somethingboy = document.getElementsByClassName(classname)[idx]
    somethingboy.className = somethingboy.className.replace(regex, "") 
}

function replaceClass(classname1, classname2, idx = 0) {
    let regex = new RegExp(classname1 + " ?", "g");

    let somethingboy = document.getElementsByClassName(classname1)[idx]
    somethingboy.className = somethingboy.className.replace(regex, "") + " " + classname2
}

function reveal(idx = 0) {
    removeClass("hidden", idx) 
}

function dramaticReveal(idx = 0) {
    replaceClass("hidden", "appearing", idx)
}

function sleep(time_ms) {
    return new Promise(resolve => setTimeout(resolve, time_ms));
}

async function wait(time) {
    window.removeEventListener("keydown", keyBlade);
    window.removeEventListener("click", clickBlade);
    
    await sleep(1000*time);

    window.addEventListener("keydown", keyBlade, false);
    window.addEventListener("click", clickBlade, false);
}
