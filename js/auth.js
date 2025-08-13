// Auth.js - Handles login/signup functionality

// Check if already logged in
checkAuth().then(user => {
    if (user) {
        window.location.href = '/dashboard.html';
    }
});

// Form elements
const authForm = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');
const message = document.getElementById('message');

// Track current form mode (start with sign in)
let isSignUp = false;

// Handle form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = isSignUp ? 'Creating Account...' : 'Signing In...';
    hideMessage();
    
    try {
        let result;
        
        if (isSignUp) {
            // Sign up new user
            result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: window.location.origin + '/dashboard.html'
                }
            });
        } else {
            // Sign in existing user
            result = await supabase.auth.signInWithPassword({
                email,
                password
            });
        }
        
        if (result.error) throw result.error;
        
        if (isSignUp && result.data.user && !result.data.session) {
            showMessage('Check your email to confirm your account!', 'success');
            authForm.reset();
        } else if (result.data.user) {
            showMessage('Success! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1000);
        }
        
    } catch (error) {
        showMessage(error.message || 'An error occurred', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = isSignUp ? 'Create Account' : 'Sign In';
    }
});

// Toggle between sign up and sign in
function toggleForm(e) {
    e.preventDefault();
    isSignUp = !isSignUp;
    
    if (isSignUp) {
        formTitle.textContent = 'Create Account';
        submitBtn.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        document.querySelector('.toggle-form a').textContent = 'Sign In';
    } else {
        formTitle.textContent = 'Sign In';
        submitBtn.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        document.querySelector('.toggle-form a').textContent = 'Create Account';
    }
    
    hideMessage();
    authForm.reset();
}

// Message handling
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
}

function hideMessage() {
    message.style.display = 'none';
}