let indexValue = 0;
function slideShow(){
    setTimeout(slideShow, 2000)
    const img = document.getElementsByClassName("slide")
    for(let x = 0; x < img.length; x++){
        img[x].style.display = "none"
    }
    indexValue++
    if(indexValue > img.length){indexValue = 1}
    img[indexValue -1].style.display = "block"
}
window.onload = function(){
    slideShow()
}