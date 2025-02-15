<!-- Toast.svelte -->
<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  let { type, message = $bindable(true) } = $props();
  let timeoutId;

  const close = () => {
    message = '';
    clearTimeout(timeoutId);
  };

  onMount(() => {
    timeoutId = setTimeout(close, 4000);
  });
</script>

{#if message != ''}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  in:fly="{{ y: -100, duration: 300 }}"
  out:fly="{{ y: -100, duration: 200 }}"
  class="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-xs z-[999] cursor-pointer"
  onmouseenter={() => clearTimeout(timeoutId)}
  onmouseleave={() => timeoutId = setTimeout(close, 1000)}
>
  <div class="relative bg-white rounded-full shadow-xl border border-gray-100 hover:shadow-md transition-shadow">

    <div class="p-2 flex items-start gap-2">
      <div class="flex-shrink-0 mt-0.5">
        {#if type === 'error'}
          <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        {:else}
          <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        {/if}
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-700 truncate leading-6 flot">{message}</p>
      </div>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button 
        onclick={close}
        class="p-1 -mr-1.5 text-gray-400 hover:text-gray-500 transition-colors"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</div>
{/if}