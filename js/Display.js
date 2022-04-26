window.onload = function(){

    // function to disable typing spaces
    function no_space(a){
        if (a.key.charCodeAt(0) === 32)
            return false
    }

    // function to allow only numbers in contact number
    document.getElementById('query').onkeydown = (a) => { return no_space(a) }
}