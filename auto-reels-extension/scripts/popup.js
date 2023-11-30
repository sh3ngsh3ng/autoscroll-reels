let statusElem = document.querySelector("#status")
let autoReelsToggle = document.querySelector("#toggle")

// statusElem = chrome.local.storage.get()

autoReelsToggle.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log(tab)
    if (tab.url.split("/")[3] == 'shorts') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["scripts/auto-reels-v2.js"]
        })
        chrome.storage.local.set({ [tab.id]: true })
        statusElem.innerHTML = "Injected"
    } else {
        alert("This is not youtube shorts")
    }

})