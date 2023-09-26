function p(value){
    console.log(value);
}

function getIframeContent(frameID) {
    var frameObj = 
        document.getElementById(frameID);
    var frameContent = frameObj
        .contentWindow.document.body.innerHTML;

    alert("frame content : " + frameContent);
}

let button;

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

addEventListener("DOMContentLoaded", main);

function main(){
    document.getElementById("openModalButton").addEventListener("click", showBlurOverlay);

    const iframe = document.getElementById('panel');

    iframe.addEventListener('load', function() {
    
        const iframeElement = iframe.contentDocument.getElementById('closeModalButton');

        iframeElement.addEventListener("click", hideBlurOverlay);

    });
    
}


