function p(value){
    console.log(value);
}

function loadPanelContent() {
    const panelContainer = document.getElementById("panel");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "panel-login.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            panelContainer.innerHTML = xhr.responseText;

            panelContainer.style.display = 'block';

            const closeButton = panelContainer.querySelector("#closeModalButton");
            if (closeButton) {
                closeButton.addEventListener("click", hidePanelContent);
            }
        }
    };

    xhr.send();
}

function hidePanelContent() {
    const panelContainer = document.getElementById("panel");
    panelContainer.style.display = 'none';
}

function main() {
    document.getElementById("openModalButton").addEventListener("click", loadPanelContent);
}

addEventListener("DOMContentLoaded", main);