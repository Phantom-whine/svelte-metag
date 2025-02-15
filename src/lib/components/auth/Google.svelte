<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { loginUser } from '../../auth';

    let isLoading = false;
    const API_URL = import.meta.env.VITE_DJANGO_API_URL;
  
    // Replace with your actual Google Client ID
    const GOOGLE_CLIENT_ID = '684068205517-02gagr6b4ptn2u7sfsgtmgrqcejc02m2.apps.googleusercontent.com';
  
    let googleButtonWrapper = null; // Initialize as null
    let isGoogleInitialized = false; // Track initialization status
  
    async function verifyGoogleToken(token) {
      try {
        const response = await fetch(`${API_URL}/api/auth/continue/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to login with Google');
        }
  
        return await response.json();
      } catch (error) {
        isLoading = false;
        console.error('Error verifying Google token:', error);
        alert(error)
        throw error;
        
      }
    }
  
    function initializeGoogleSignIn() {
      if (typeof google === 'undefined') {
        console.error('Google library not loaded');
        return;
      }
  
      console.log('Initializing Google Sign-In');
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'popup', // Use popup mode for the sign-in flow
      });
  
      // Create a fake button wrapper
      const googleLoginWrapper = document.createElement('div');
      googleLoginWrapper.style.display = 'none'; // Hide the wrapper
      googleLoginWrapper.classList.add('custom-google-button');
      document.body.appendChild(googleLoginWrapper);
  
      // Render the Google button inside the wrapper
      google.accounts.id.renderButton(googleLoginWrapper, {
        type: 'icon', // You can customize the button type
        size: 'large', // You can customize the button size
      });
  
      // Get the Google button from the wrapper
      const googleLoginWrapperButton = googleLoginWrapper.querySelector('div[role=button]');
  
      // Store the wrapper for later use
      googleButtonWrapper = {
        click: () => {
          googleLoginWrapperButton.click();
        },
      };
  
      isGoogleInitialized = true; // Mark initialization as complete
    }
  
    async function handleCredentialResponse(response) {
      try {
        console.log('Google Sign-In response:', response);
        const loginResponse = await verifyGoogleToken(response.credential);
  
        // Store the tokens in cookies
        // Cookies.set('access', loginResponse.access, { expires: TOKEN_EXPIRY });
        // Cookies.set('refresh', loginResponse.refresh, { expires: REFRESH_TOKEN_EXPIRY });
  
        loginUser(loginResponse.access, loginResponse.refresh, loginResponse.profile)

      } catch (error) {
        isLoading = false;
        console.error('Error during Google login:', error);
        alert(error)
      }
    }
  
    function handleGoogleSignIn() {
      if (!isGoogleInitialized) {
        console.error('Google Sign-In not initialized');
        return;
      }
  
      if (googleButtonWrapper) {
        isLoading = true;
        console.log('Google Sign-In button clicked');
        googleButtonWrapper.click(); // Trigger the Google Sign-In flow
      } else {
        console.error('Google button wrapper not initialized');
      }
    }
  
    onMount(() => {
      // Wait for the Google library to load
      const checkGoogleLibrary = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogleLibrary);
          initializeGoogleSignIn();
        }
      }, 100); // Check every 100ms
    });
  </script>
  
  <div>
    <button
    onclick={handleGoogleSignIn}
    class="w-full bg-[#ccfc7e] flot font-extrabold hover:scale-105 active:scale-95 transition-all text-black h-12 px-4 rounded-md flex items-center justify-center font-medium transition"
>
    <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
    Continue with Google
</button>
  </div>
  
  <svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
  </svelte:head>