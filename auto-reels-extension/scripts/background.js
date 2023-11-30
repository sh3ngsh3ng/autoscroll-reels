chrome.runtime.onInstalled.addListener((e) => {
    console.log(e)
    chrome.storage.sync.set({
        autoReelsActive: false
    })
})


chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.local.set({
        [tab.id]: false
    })
})

chrome.tabs.onActivated.addListener((e) => {
    console.log("Activated: ", e)
})


chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.local.remove(tabId.toString())
    // chrome.storage.local.clear()
})