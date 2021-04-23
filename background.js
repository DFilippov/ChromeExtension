
var tabsList = '';

function getTabsList() {
    chrome.windows.getCurrent({populate: true}, function (window) {
        tabsList = window.tabs;
        // alert("getTabsList  == " + JSON.stringify(tabsList));
    })
}

getTabsList()


function saveTabsListToStorage() {
    chrome.storage.sync.set({tabsList});

    // alert('SAVING TABS TO STORAGE --- ')
}

function closeSavedTabs() {
    // alert("closeSavedTabs == " + JSON.stringify(tabsList.lenght) + '=='+ JSON.stringify(tabsList))

    tabsList.forEach(function (tab) {
        chrome.tabs.remove(tab.id);
    })

}


chrome.browserAction.onClicked.addListener( function (tabId, changeInfo, tab) {
    // saves tabs to storage
    saveTabsListToStorage();

    // creates new tab with contents of saved tabs
    chrome.tabs.create({url:chrome.extension.getURL("savedTabs.html")});

    // closes saved tabs
    closeSavedTabs();
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    getTabsList()
})

chrome.tabs.onActivated.addListener( function() {
    getTabsList()
})
