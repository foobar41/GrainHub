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

        // allow only numbers in contact number
        document.getElementById('num').onkeydown = (a) => { return only_num(a) }

        document.getElementById('update').onclick = function(){
            const in_fname = document.getElementById('fname').value
            const in_lname   = document.getElementById('lname').value
            const in_email = document.getElementById('lname').value
            const in_num = document.getElementById('num').value
            const in_add = document.getElementById('add').value
    
            let all_filled =  false
    
            if (in_fname.length === 0) alert('First Name cannot be empty');
            else if (in_lname.length === 0) alert('Last Name cannot be empty');
            else if (in_email.length === 0) alert('Email cannot be empty');
            else if (in_num.length === 0) alert('Contact number cannot be empty');            
            else if (in_add.length === 0) alert('Address cannot be empty');          
            else if (in_pass.length === 0) alert('Password cannot be empty');
            else if (in_conf_pass.length === 0) alert('Confirm Password cannot be empty');
            else all_filled = true
    
            if (all_filled && passwordPattern.test(in_pass) && in_pass === in_conf_pass){
                alert('Succesfully registered')
            }
            else{
                if (in_pass.length < 8) alert('password length must be greater than 8')
                else if (in_pass.length > 15) alert('password length must be less than 15')
                else if (!((/[A-Z]/).test(in_pass))) alert('password must contain a capital letter')
                else if (!((/[0-9]/).test(in_pass))) alert('password must contain a digit')
                else if (!((/[!@#$%^&*]/).test(in_pass))) alert('password must contain a special character')
                else if (in_pass != in_conf_pass) alert('passwords do not match')
            }
        }
}