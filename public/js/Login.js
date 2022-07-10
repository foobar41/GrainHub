window.onload = function(){
    let in_email    

    // color coding on farmer
    document.getElementById('farmer_rad').onchange = function() {
        const farm = document.getElementById('farmer');
        const cons = document.getElementById('consumer');
        farm.style.color = "#ff7200"
        cons.style.color = "grey"
    }


    // color coding on consumer
    document.getElementById('consumer_rad').onchange = function() {
        const farm = document.getElementById('farmer');
        const cons = document.getElementById('consumer');
        farm.style.color = "grey"
        cons.style.color = "#ff7200"
    }


    // disable typing space in password box
    document.getElementById('pass').onkeydown = function(a) {
        if (a.key.charCodeAt(0) === 32)
            return false
    }
    

    // disable typing space in email box
    document.getElementById('email').onkeydown = function(a) {
        if (a.key.charCodeAt(0) === 32)
            return false
    }

    document.getElementById('login').onclick = function(){
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        if (!email) alert('Email cannot be empty')
        else if (!pass) alert('Password cannot be empty')
    }
}
