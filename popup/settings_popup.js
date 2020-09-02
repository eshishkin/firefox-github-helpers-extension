function start() {
    document.getElementById("submit").addEventListener("click", (e) => {
        let payload = {
        	"pr": {}
        }
        Array.from(document.querySelectorAll(".option")).forEach(option => {
            payload.pr[option.id] = option.querySelector("input").checked
        })

        browser.storage.local.set(payload)
            .then(browser.tabs.reload)
            .catch(console.error)
    })
}

browser.storage.local.get()
    .then(config => {
        if (config.pr && config.pr.reorderFiles) {
            document.getElementById("reorderFiles").querySelector("input").checked = true
        }

        if (config.pr && config.pr.disallowToSubmitReviewWithNotViewedChanges) {
            document.getElementById("disallowToSubmitReviewWithNotViewedChanges")
                    .querySelector("input").checked = true
        }
    })
    .then(start)
