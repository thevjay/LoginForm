
const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Client-side field validations
  if (!validateUsername(username)) {
    errorMessage.textContent = 'Invalid username or email';
    return;
  }

  if (!validatePassword(password)) {
    errorMessage.textContent = 'Invalid password';
    return;
  }

  // API integration
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
 .then(response => response.json())
 .then((data) => {
    if (data.username && data.password) {
      errorMessage.textContent = 'Login successful!';
    } else {
      errorMessage.textContent = 'Login failed';
    }
  })
 .catch((error) => {
    errorMessage.textContent = 'Error: '+error.message;
  });
});

function validateUsername(username) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(username);
}

function validatePassword(password) {
  return password.length >= 6;
}


// Show/Hide Password validation
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('password-toggle');

passwordToggle.addEventListener('click', function() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    passwordToggle.textContent = 'Show';
  }
});

// Remember Me Checkbox
const rememberMeCheckbox = document.getElementById('remember-me');

rememberMeCheckbox.addEventListener('change',passwordToggle)