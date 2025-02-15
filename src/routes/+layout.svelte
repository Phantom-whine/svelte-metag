<script>
    import { onMount } from 'svelte';
    import '../src/output.css';
    import '../src/custom.css';
    import { initializeAuth } from '$lib/auth';
    import { isLoggedIn } from '$lib/auth';
  
    onMount(() => {
      if (isLoggedIn()) {
        initializeAuth();
      }
    });
  </script>
  
  <slot />