function p(value){
    console.log(value);
}

function showBlurOverlay() {
    const modal = document.querySelector(".panel");
    modal.style.display = 'block';
}

function hideBlurOverlay() {
    const modal = document.querySelector(".panel");
    modal.style.display = 'none';
}

addEventListener("DOMContentLoaded", showBlurOverlay);

addEventListener("DOMContentLoaded", function(){
    
    const button = document.querySelector("#closeModalButton")

    button.addEventListener("click", hideBlurOverlay);
});

