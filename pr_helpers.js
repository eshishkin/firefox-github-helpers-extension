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
            doc.style.display = "none"
        }
    })
}

function addOnClickHook(action) {
    forEachFile((container, doc) => {
        var toggle = doc.querySelector(".js-reviewed-toggle");
        toggle.addEventListener("click", function() {
            action(container, doc)
            setTimeout(function() { addOnClickHook(action) }, 500);
        }, true);
    })
}

function toggleSubmitButton() {
    var button = document.querySelector(".js-reviews-container");
    var unchecked = Array.from(document.querySelectorAll(".js-reviewed-toggle > input")).filter(doc => !doc.checked).length
    button.style.display = unchecked != 0 ? "none" : null;
}

function main() {
    if (config.pr.hideViewed) {
        hideViewed()
        addOnClickHook(hideViewed)
    }
    if (config.pr.reorderFiles) {
        reorder()
        addOnClickHook(reorder)
    }
    
    if (config.pr.disallowToSubmitReviewWithNotViewedChanges) {
        toggleSubmitButton()
        addOnClickHook(toggleSubmitButton)
    }   
}

main()
