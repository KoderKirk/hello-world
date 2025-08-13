// App.js - Handles authentication check for protected pages

// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await checkAuth();
        
        if (!user) {
            // Not authenticated, redirect to login
            window.location.href = '/index.html';
            return;
        }
        
        // Display user email in navbar
        const userEmailElement = document.getElementById('userEmail');
        if (userEmailElement) {
            userEmailElement.textContent = user.email;
        }
        
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/index.html';
    }
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = '/index.html';
    }
});