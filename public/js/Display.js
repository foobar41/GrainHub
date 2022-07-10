window.onload = function(){

    const letters = /^[a-z]+$/;

    // function to only allow letters
    function no_space(a){
        if (a.key.charCodeAt(0) === 66) return true;
        if (a.key.charCodeAt(0) === 32 || a.key.charCodeAt(0) < 97 || a.key.charCodeAt(0) > 122)
            return false
    }

    // function to allow only letters
    document.getElementById('query').onkeydown = (a) => { return no_space(a) }
}