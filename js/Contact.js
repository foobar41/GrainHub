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

    // disable typing space
    document.getElementById('fname').onkeydown = (a) => { return no_space(a) }

    // disable typing space
    document.getElementById('lname').onkeydown = (a) => { return no_space(a) }

    // disable typing space
    document.getElementById('email').onkeydown = (a) => { return no_space(a) }

    // disable typing space 
    document.getElementById('num').onkeydown = (a) => { return no_space(a) }

    // allow only numbers in contact number
    document.getElementById('num').onkeydown = (a) => { return only_num(a) }

    document.getElementById('submit').onclick = function(){
        const in_fname = document.getElementById('fname').value
        const in_lname = document.getElementById('lname').value
        const in_email = document.getElementById('email').value
        const in_num = document.getElementById('num').value
        const in_msg = document.getElementById('msg').value

        let all_filled =  false

        if (in_fname.length === 0){ alert('First Name cannot be empty'); res.render('Contact');}
        else if (in_lname.length === 0){ alert('Last Name cannot be empty'); res.render('Contact');}
        else if (in_email.length === 0){ alert('Email cannot be empty'); res.render('Contact');}
        else if (in_num.length === 0){ alert('Contact number cannot be empty'); res.render('Contact');}  
        else if (in_msg.length === 0){ alert('Message field cannot be empty'); res.render('Contact');}  
        else if (in_num.length != 10){ alert('Contact number must be 10 digits'); res.render('Contact');}        
        else all_filled = true


        if (all_filled){
            alert('Succesfully sent your message\nWait for response at your email')
        }
    }
}