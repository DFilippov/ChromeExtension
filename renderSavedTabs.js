const div = document.getElementById('savedTabsList');

let html = ''

var tabs = []

chrome.storage.sync.get('tabsList', function (tabsList) {
    const list = tabsList['tabsList'];
    list.forEach(function (tab) {
        tabs.push(tab);
    })

    tabs.forEach(function (tab) {
        var content = '';

        var icon = ''
        if (tab.favIconUrl == '') {
            icon = "<image width='25' src='images/paper.png'></image>";
        } else {
            icon = `<image width="25" src=${tab.favIconUrl}></image>`;
        }

        const title = `
            <a href="${tab.url}">
                <label style="font-size: medium">${tab.title}</label>
            </a>`;

        content += `${icon}   ${title}<hr>`
        html += content
    })

    div.innerHTML = html
})


function restoreAllTabs() {
    window.close()
    tabs.forEach(function (tab) {
        chrome.tabs.create({url: tab.url})
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('restoreTabsButton')
            .addEventListener('click', restoreAllTabs);
})
