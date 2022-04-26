window.onload = function(){
    // function to disable typing spaces
    function no_space(a){
        if (a.key.charCodeAt(0) === 32)
            return false
    }

    // function to allow only numbers
    function only_num(a){
        const ascii = a.key.charCodeAt(0)
        if (!(ascii === 66) && !(ascii > 47 && ascii < 58))
            return false
    }

    // disable typing space in input jowar
    document.getElementById('inj').onkeydown = (a) => { return no_space(a) }

    // disable typing space in input rice
    document.getElementById('inr').onkeydown = (a) => { return no_space(a) }

    // disable typing space in input corn
    document.getElementById('inc').onkeydown = (a) => { return no_space(a) }

    // disable typing space in input wheat
    document.getElementById('inw').onkeydown = (a) => { return no_space(a) }

    // disable typing space in input rice
    document.getElementById('inj').onkeydown = (a) => { return only_num(a) }

    // disable typing space in input corn
    document.getElementById('inr').onkeydown = (a) => { return only_num(a) }

    // disable typing space in input wheat
    document.getElementById('inc').onkeydown = (a) => { return only_num(a) }

    // disable typing space in input rice
    document.getElementById('inw').onkeydown = (a) => { return only_num(a) }
}