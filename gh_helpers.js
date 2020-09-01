function reorder() {
    var plane = document.getElementById("files");
    var docs = document.querySelectorAll(".file");
    docs.forEach(doc => {
        if (doc.querySelector(".js-reviewed-toggle > input").checked) {
            console.log("moving")
            plane.appendChild(doc)
        }
    })
}

function applyReorderingHook() {
    var plane = document.getElementById("files")
    var docs = document.querySelectorAll(".file");

    docs.forEach(file => {
        var toggle = file.querySelector(".js-reviewed-toggle");
        toggle.onclick = function() {
            if (toggle.querySelector("input").checked) {
                plane.appendChild(file)
            } else {
                plane.insertBefore(file, plane.firstChild);
            }
    
            //todo: this is not a good solution to handle ajax requests
            setTimeout(function() { applyReorderingHook() }, 500);
        }
    });
}

reorder()
applyReorderingHook()