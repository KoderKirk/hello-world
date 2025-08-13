// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase credentials
    const SUPABASE_URL = 'https://nmxlkghuetwdlyxiyqqz.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5teGxrZ2h1ZXR3ZGx5eGl5cXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDQ3ODcsImV4cCI6MjA3MDY4MDc4N30.dCKdVI2HRDLmxE8XnuZGrr6PPRw45cJCBVcD26b7Juo';
        

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check if user is authenticated
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// Sign out function (global)
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
}