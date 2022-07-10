const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
const data = []

window.onload = function(){

    // function to disable typing spaces
    function no_space(a){
        if (a.key.charCodeAt(0) === 32)
            return false
    }

    // function to allow only numbers in contact number
    function only_num(a){
        const ascii = a.key.charCodeAt(0)
        if (!(ascii === 66) && !(ascii > 47 && ascii < 58))
            return false
    }

    // disable typing space in first name
    document.getElementById('fname').onkeydown = (a) => { return no_space(a) }

    // disable typing space in last name
    document.getElementById('lname').onkeydown = (a) => { return no_space(a) }

    // disable typing space in email
    document.getElementById('email').onkeydown = (a) => { return no_space(a) }

    // allow only numbers in contact number
    document.getElementById('num').onkeydown = (a) => { return only_num(a) }

    // disable typing space in password
    document.getElementById('pass').onkeydown = (a) => { return no_space(a) }

    // disable typing space in confirm password
    document.getElementById('conf_pass').onkeydown = (a) => { return no_space(a) }

    // show if password met requirements
    document.getElementById('pass').onkeyup = function() {

        const in_pass = document.getElementById('pass').value
        if (passwordPattern.test(in_pass)){
            document.getElementById('pass').style.borderBottomColor = "green"
        }
        else{
            document.getElementById('pass').style.borderBottomColor = "red"
        }
    }

    // show if pass and conf_pass match
    document.getElementById('conf_pass').onkeyup = function() {

        const in_conf_pass = document.getElementById('conf_pass').value
        const in_pass = document.getElementById('pass').value
        if (in_pass === in_conf_pass){
            document.getElementById('conf_pass').style.borderBottomColor = "green"
        }
        else{
            document.getElementById('conf_pass').style.borderBottomColor = "red"
        }
    }

    // check if all the fields are filled
    // check for requirements in password (1-caps, 1-number, 1-special, >8)
    document.getElementById('submit').onclick = function(){
        const in_fname = document.getElementById('fname').value
        const in_lname = document.getElementById('lname').value
        const in_email = document.getElementById('lname').value
        const in_num = document.getElementById('num').value
        const in_add = document.getElementById('add').value
        const in_pass = document.getElementById('pass').value
        const in_conf_pass = document.getElementById('conf_pass').value

        let all_filled =  false

        if (in_fname.length === 0){ alert('First Name cannot be empty'); res.render('Signup');}
        else if (in_lname.length === 0){ alert('Last Name cannot be empty'); res.render('Signup');}
        else if (in_email.length === 0){ alert('Email cannot be empty'); res.render('Signup');}
        else if (in_num.length === 0){ alert('Contact number cannot be empty'); res.render('Signup');}  
        else if (in_num.length != 10){ alert('Contact number must be 10 digits'); res.render('Signup');}          
        else if (in_add.length === 0){ alert('Address cannot be empty'); res.render('Signup');}            
        else if (in_pass.length === 0){ alert('Password cannot be empty'); res.render('Signup');}
        else if (in_conf_pass.length === 0){ alert('Confirm Password cannot be empty'); res.render('Signup');}
        else all_filled = true

        if (all_filled && passwordPattern.test(in_pass) && in_pass === in_conf_pass){
            alert('Succesfully registered')
        }
        else{
            if (in_pass.length < 8) {alert('password length must be greater than 8'); res.render('Signup');}
            else if (in_pass.length > 15){ alert('password length must be less than 15'); res.render('Signup');} 
            else if (!((/[A-Z]/).test(in_pass))){ alert('password must contain a capital letter'); res.render('Signup');}
            else if (!((/[0-9]/).test(in_pass))){ alert('password must contain a digit'); res.render('Signup');}
            else if (!((/[!@#$%^&*]/).test(in_pass))){ alert('password must contain a special character'); res.render('Signup');}
            else if (in_pass != in_conf_pass){ alert('passwords do not match'); res.render('Signup');}
        }
    }


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
}