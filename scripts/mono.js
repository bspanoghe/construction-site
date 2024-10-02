var path = window.location.pathname;
var pagenumber = Number(path.split("/").pop().split(".")[0])

var rightcounter = 0

window.addEventListener("keydown", keyBlade, false);

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
    }
    
    if (rightcounter == 1) {
        var checkpage = await fetch("./" + (pagenumber+1) + ".html");
        if (checkpage.ok) {
            location= "./" + (pagenumber+1) + ".html"
        } else {
            location= "../mono.html"
        }
    }
}