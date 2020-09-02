function isViewed(file) {
    return file.querySelector(".js-reviewed-toggle > input").checked
}

function forEachFile(action) {
    var container = document.getElementById("files");
    var docs = document.querySelectorAll(".file");
    docs.forEach(doc => {
        action(container, doc)
    })
}

function reorder() {
    forEachFile((container, doc) => {
        if (isViewed(doc)) {
            container.appendChild(doc)
        }
    })
}

function hideViewed() {
    forEachFile((container, doc) => {
        if (isViewed(doc)) {
            doc.remove()
        }
    })
}

function addOnClickHook(action) {
    forEachFile((container, doc) => {
        var toggle = doc.querySelector(".js-reviewed-toggle");
        toggle.onclick = function() {
            action(container, doc)
            setTimeout(function() { addOnClickHook(action) }, 500);
        }
    })
}

if (config.pr.hideViewed) {
    hideViewed()
    addOnClickHook(hideViewed)
} else if (config.pr.reorderFiles) {
    reorder()
    addOnClickHook(reorder)
}
