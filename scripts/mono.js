var path = window.location.pathname;
var pagenumber = Number(path.split("/").pop().split(".")[0])

var rightcounter = 0

window.addEventListener("keydown", keyBlade, false);
window.addEventListener("click", clickBlade, false);

async function keyBlade(evt) {
    if (evt.key == "Escape") {
        location = "../mono.html"        
    }

    if (evt.key == "ArrowLeft") {
        if (pagenumber == 1) {
            location = "../mono.html"
        } else {
            location= "./" + (pagenumber-1) + ".html"
        }
    }

    if (evt.key == "ArrowRight") {
        rightcounter++
        doAction(rightcounter)
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
    var checkpage = await fetch("./" + (pagenumber+1) + ".html");
    if (checkpage.ok) {
        location= "./" + (pagenumber+1) + ".html"
    } else {
        location= "../mono.html"
    }
}