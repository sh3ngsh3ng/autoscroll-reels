// New Strategy: To poll for new current shorts for every event fired 
// from mutation observer. Callback from mutation observer will check
// the current active.


// function to check that is currently on youtube, and in youtube shorts
function detectShortsPage() {
    setTimeout(() => {
        let currUrl = window.location.href.split("/")
        if (currUrl[3] == 'shorts') {
            atShortsPage = true
            console.log("You are currently at the shorts page")
            return
        } else {
            atShortsPage = false
            activeShorts = null
            worker.disconnect()
        }
        detectShortsPage()
    }, 3000)
}

// function to constantly update the current shorts
function updateCurrentShorts() {
    setTimeout(() => {
        if (atShortsPage) {
            if (activeShorts) {
                // case: update the global active to current if there is a scroll away
                let currentActive = document.querySelector("ytd-reel-video-renderer[is-active]")
                if (currentActive != activeShorts) {
                    activeShorts = currentActive
                    console.log("Current shorts is updated on scroll")
                    worker.disconnect()
                    // refactor to resetting variables
                    workerIsActive = false
                    checking = false
                    checkingValue = 0
                    playCount = 0
                    activeShortsProgress = 0
                }
            } else {
                // case: first setting of active shorts in global
                activeShorts = document.querySelector("ytd-reel-video-renderer[is-active]")
                console.log("First shorts is set")
            }

            if (activeShorts) {
                let currId = activeShorts.id
                let nextId = parseInt(currId) + 1
                nextActiveShorts = document.getElementById(nextId.toString())
            }
        } else {
            console.log("You're not at shorts page")
        }
        updateCurrentShorts()
    }, 2000)
}

// function to monitor worker
function monitorWorker() {
    setTimeout(() => {
        if (!workerIsActive) {
            if (activeShorts) {
                let progressBar = activeShorts.querySelector("#progress-bar-line")
                worker.observe(progressBar, options)
                playCount = 1
                workerIsActive = true
                console.log("Worker is observing")
            }
        }
        monitorWorker()
    }, 3000)
}

// fcuntion infinite loop check
function infiniteLoopCheck() {
    setTimeout(() => {
        if (checking) {
            if (activeShortsProgress < checkingValue) {
                console.log("Shorts is stucked. Manual Scrolling initiated")
                worker.disconnect()
                nextActiveShorts.scrollIntoView()
                checking = false
            }
            infiniteLoopCheck()
        }
    }, 2000)
}


// Global Variables
let atShortsPage = false
let activeShorts;
let nextActiveShorts;
let workerIsActive = false
let playCount = 0
let checking = false;
let checkerElement;
let checkingValue;
let activeShortsProgress;

// Mutation Observer
let worker = new MutationObserver(callback)
let options = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-valuenow"]
}

function callback(mutations) {
    for (let mutation of mutations) {
        if (mutation.type === "attributes") {
            activeShortsProgress = parseInt(mutation.oldValue)

            if (!checking && playCount == 1) {
                checkerElement = document.querySelector("ytd-reel-video-renderer[is-active]")
                checkingValue = activeShortsProgress
                infiniteLoopCheck()
                checking = true
            }

            if (mutation.oldValue >= 99) {
                nextActiveShorts.scrollIntoView()
                playCount = 0
                worker.disconnect()
                workerIsActive = false
                checking = false
            }
        }
    }
}


function main() {
    detectShortsPage()
    updateCurrentShorts()
    monitorWorker()
}

main()
