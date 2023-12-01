let statusElem = document.querySelector("#status")
let autoReelsToggle = document.querySelector("#toggle")

// statusElem = chrome.local.storage.get()

autoReelsToggle.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    keyValue = await chrome.storage.local.get((tab.id).toString())
    injectStatus = keyValue[tab.id]
    if (tab.url.split("/")[3] == 'shorts') {
        if (!injectStatus) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/auto-reels-v2.js"]
            }).then((r) => console.log(r))
            chrome.storage.local.set({ [tab.id]: true })
            statusElem.innerHTML = !injectStatus
        }
    } else {
        alert("This is not youtube shorts")
    }
})