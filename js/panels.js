function p(value){
    console.log(value);
}

function showBlurOverlay() {
    const modal = document.querySelector(".panel");
    modal.style.display = 'block';
    button = document.getElementById("panel").contentWindow.document.querySelector("#closeModalButton");
    p(button);
}

function hideBlurOverlay() {
    const modal = document.querySelector(".panel");
    modal.style.display = 'none';
}

function main(){
    document.getElementById("openModalButton").addEventListener("click", showBlurOverlay);

    const iframe = document.getElementById('panel');

    iframe.addEventListener('load', function() {
    
        const iframeElement = iframe.contentDocument.getElementById('closeModalButton');

        iframeElement.addEventListener("click", hideBlurOverlay);

    });
    
}


addEventListener("DOMContentLoaded", main);