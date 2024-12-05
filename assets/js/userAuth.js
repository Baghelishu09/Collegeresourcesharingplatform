document.getElementById('redirect_register').addEventListener('click', function(){
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('register_form').style.display = 'block';
});
// Form validation
document.getElementById('register_form').addEventListener('submit', function(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mobileNo = document.getElementById('mobileNo').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let pincode = document.getElementById('pincode').value;
    let password = document.getElementById('pswd').value;
    let confirmPassword = document.getElementById('confirmpswd').value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(name == '' || email == '' || mobileNo == '' || address == '' || country == '' || state == '' || city == '' || pincode == '' || password == '' || confirmPassword == ''){
        alert('All fields are required');
    }else if(password != confirmPassword){
        alert('Password does not match');
    }else if(!regex.test(email)){
        alert('Invalid email');
    }else if(mobileNo.length != 10){
        alert('Invalid mobile number');
    }else if(pincode.length < 6){
        alert('Invalid pincode');
    }else if(password.length < 6){
        alert('Password must be atleast 6 characters');
    }else{
        var data = {
            name: name,
            email: email,
            mobileNo: mobileNo,
            address: address,
            country: country,
            state: state,
            city: city,
            pincode: pincode,
            password: password
        }
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            if(data.status == 'success'){
                alert('Registration successful');
                document.getElementById('register_form').reset();
                document.getElementById('login_form').style.display = 'block';
                document.getElementById('register_form').style.display = 'none';
            }else{
                alert(data.message);
            }
        });
    }
});