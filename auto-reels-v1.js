console.log("Starting script for auto Youtube Shorts")
while (true) {
    let check = document.querySelector(".ytd-shorts")
    if (check) {
        console.log("Youtube shorts detected")
        break
    }
}
let options = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-valuenow"]
}

let callback = function (mutations) {
    for (let mutation of mutations) {
        if (mutation.type === "attributes") {
            let shortsToCompare = document.querySelector("ytd-reel-video-renderer[is-active]")
            let newElemId = parseInt(shortsToCompare.id)
            let currentShortsId = parseInt(queue[0].id)

            if (currentShortsId != newElemId) {
                // initiate requeue
                console.log("requeue")
                worker.disconnect()
                queue = []

            }

            if (mutation.oldValue >= 99) {
                queue.shift()
                worker.disconnect()
                let nextShorts = queue[0]
                nextShorts.scrollIntoView()
                console.log("Scrolled to next shorts")

            }

            queueFunction()
        }
    }
}
let worker = new MutationObserver(callback)
let queue = []
let currentShorts = document.querySelector("ytd-reel-video-renderer[is-active]")
let currentShortsId = parseInt(currentShorts.id)

queueFunction()


function queueFunction() {
    currentShorts = document.querySelector("ytd-reel-video-renderer[is-active]")
    currentShortsId = parseInt(currentShorts.id)

    // starting
    if (queue.length < 1) {
        queue.push(currentShorts)
        let progressBar = currentShorts.querySelector("#progress-bar-line")
        worker.observe(progressBar, options)
        for (let i = 1; i < 10; i++) {
            let newShortsId = currentShortsId + i
            let newShorts = document.getElementById(newShortsId)
            if (newShorts) {
                queue.push(newShorts)
            }
        }
        console.log("Shorts have been queued")
    }

    if (queue.length < 10 || !queue[queue.length - 1]) {
        // add observer to current node
        let curr = currentShorts
        let progressBar = curr.querySelector("#progress-bar-line")
        worker.observe(progressBar, options)
        // fill up the queue
        if (queue.length < 10) {
            let difference = 10 - queue.length
            for (let i = 1; i <= difference; i++) {
                let lastShorts = queue[queue.length - 1]
                let newIdToAdd = parseInt(lastShorts.id) + i
                let newShortsToAdd = document.getElementById(newIdToAdd.toString())
                if (newShortsToAdd) {
                    queue.push(newShortsToAdd)
                }
            }
        }
    }

}