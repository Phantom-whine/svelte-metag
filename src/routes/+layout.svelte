<script>
    import { onMount } from 'svelte';
    import '../../static/src/output.css';
    import '../../static/src/custom.css';
    import { initializeAuth } from '$lib/auth';
    import { isLoggedIn } from '$lib/auth';
  
    onMount(() => {
      if (isLoggedIn()) {
        initializeAuth();
      }
    });
  </script>
  
  <slot />