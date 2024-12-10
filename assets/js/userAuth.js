document.getElementById('redirect_register').addEventListener('click', function(){
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('register_form').style.display = 'block';
});
// Form validation
document.getElementById('formsubmission').addEventListener('click', function(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mobileNo = document.getElementById('mobileNo').value;
    let address = document.getElementById('address').value;
    let gender = document.getElementById('gender').value;
    let states = document.getElementById('states').value;
    let city = document.getElementById('city').value;
    let pincode = document.getElementById('pincode').value;
    let password = document.getElementById('pswd').value;
    let confirmPassword = document.getElementById('confirmpswd').value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(name == '' || email == '' || mobileNo == '' || address == '' || gender == '' || states == '' || city == '' || pincode == '' || password == '' || confirmPassword == ''){
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
            gender: gender,
            states: states,
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
                // reset form and redirect to login page
                window.location.href = '/login';
                
            }else{
                alert(data.message);
            }
        });
    }
});
function fetchStates(){
    fetch('https://api.countrystatecity.in/v1/countries/IN/states',{
        method: 'GET',
        headers: {
            'X-CSCAPI-KEY': 'QnJzTW5SOFhMVVVkZkF3cDlXS2R0RFFKUUdkaXg1aGZJOUFvR0k3eA=='
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(state => {
            let option = document.createElement('option');
            option.value = state.iso2;
            option.text = state.name;
            document.getElementById('states').appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}
function fetchCities(){
    let state = document.getElementById('states').value;
    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,{
        method: 'GET',
        headers: {
            'X-CSCAPI-KEY': 'QnJzTW5SOFhMVVVkZkF3cDlXS2R0RFFKUUdkaXg1aGZJOUFvR0k3eA=='
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            let option = document.createElement('option');
            option.value = city.name;
            option.text = city.name;
            document.getElementById('city').appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}
// refresh api after every click
document.getElementById('states').addEventListener('click', function(){
    document.getElementById('city').innerHTML = '';
    fetchCities();
});
// login system
document.getElementById('login_button').addEventListener('click', function(e){
    // Prevent default form submission
    e.preventDefault();
    
    let login_name = document.getElementById('login_name').value;
    let login_password = document.getElementById('login_password').value;

    // Input validation
    if(login_name === '' || login_password === ''){
        alert('All fields are required');
    } else {
        let login_data = {
            login_name: login_name,  // Adjusted key to match the server-side field
            login_password: login_password // Adjusted key to match the server-side field
        };

        // Show loading indicator (optional)
        let loginButton = document.getElementById('login_button');
        loginButton.disabled = true;
        loginButton.innerHTML = 'Logging in...';

        // Send POST request
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_data)
        })
        .then(response => response.json())
        .then(login_data => {
            // Hide loading indicator
            loginButton.disabled = false;
            loginButton.innerHTML = 'Login';

            // Handle login response
            if(login_data.status === 'success'){
                alert('Login successful');
                // Redirect user or update the UI accordingly
                window.location.href = '/dashboard'; // Example: redirect to dashboard page
            } else {
                alert(login_data.message); // Show server message
            }
        })
        .catch(error => {
            // Handle network errors
            alert('An error occurred. Please try again later.');
            console.error('Login error:', error);
            
            // Hide loading indicator
            loginButton.disabled = false;
            loginButton.innerHTML = 'Login';
        });
    }
});
