chrome.runtime.onInstalled.addListener((e) => {
    chrome.storage.sync.set({
        autoReelsActive: false
    })
})


chrome.tabs.onCreated.addListener((tab) => {
    setFalse(tab.id)
})

chrome.tabs.onActivated.addListener((e) => {
    console.log("Activated: ", e)
})

chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.local.remove(tabId.toString())
    // chrome.storage.local.clear()
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // check if the status of the tab is complete
    if (changeInfo.status == "complete") {
        // do something when the tab is refreshed
        console.log("Tab " + tabId + " is refreshed");
        setFalse(tabId)
    }
});

function setFalse(tabId) {
    chrome.storage.local.set({
        [tabId]: false
    })
}