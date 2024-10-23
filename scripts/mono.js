let useSPA = false;

let path = window.location.pathname;
let pagenumber = Number(path.split("/").pop().split(".")[0])
let rightcounter = 0

window.addEventListener("keydown", keyBlade, false);
window.addEventListener("click", clickBlade, false);

function keyBlade(evt) {
    if (evt.key == "Escape") {
        location = "../mono.html"        
    }

    if (evt.key == "ArrowLeft") {
        if (pagenumber == 1) {
            location = "../mono.html"
        } else {
            pagenumber--
            if (typeof window.audio !== 'undefined') {window.audio.pause()} // stop audio when going back a page
            loadPage(pagenumber)
        }
    }

    if (evt.key == "ArrowRight") {
        rightcounter++
        doAction(rightcounter)
    }

    if (evt.key == "ArrowUp") { // Debugging things
        alert(actions)
    }
}

function clickBlade() {
    rightcounter++
    doAction(rightcounter)
}

function doAction(rightcounter) {
    if (typeof actions !== 'undefined') { // the variable is defined
        if ((rightcounter-1) < actions.length) {
            actions[rightcounter-1]()
        } else {
            goNextOrHome()
        }
    } else {
        goNextOrHome()
    }
}

async function goNextOrHome() {
    pagenumber++
    let checkpage = await fetch("./" + pagenumber + ".html");
    if (checkpage.ok) {
        loadPage(pagenumber)
    } else {
        location= "../mono.html"
    }
}

async function loadPage(pagenumber) {
    if (useSPA) {
        let newpage = await fetch("./" + pagenumber + ".html")
        let newtext = await newpage.text()
        let parser = new DOMParser();
        let doc = parser.parseFromString(newtext, "text/html");
        let newbody = doc.body;
        let newscript = doc.scripts[0]

        document.body = newbody

        actions = [] // get rid of current page's actions (in case next one defines none)
        if (newscript.childNodes.length > 0) { // There's additional script defined
            let scriptcontent = newscript.childNodes[0].textContent
            eval(scriptcontent)
        }
    
        rightcounter = 0
    } else {
        location = "./" + pagenumber + ".html"
    }
}