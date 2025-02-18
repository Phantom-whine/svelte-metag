<script>
    import LinkedinCard from "$lib/components/dashboard/LinkedinCard.svelte";
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import { onMount } from "svelte";
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import Toast from "$lib/components/shared/Toast.svelte";

    let { data } = $props();
    let { user } = data;
    let { id } = data;
    
    let msg = $state()
    let type = $state()

    let post = $state();

    function triggerToast(type_arg, msg_arg){
        msg = msg_arg;
        type = type_arg
    }

    onMount(async ()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_DJANGO_API_URL}/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('access')}`
                }
            })
            post = response.data;
        } catch (error) {
            triggerToast('error', 'Could not Load post');
        }
    })
    function removeTags(inputText) {
        // Remove all <br> and <p> tags (including closing tags)
        const cleanedText = inputText.replace(/<\/?\w+\s*\/?>/gi, '');
        const newtxt = cleanedText.replace(/<!---->/g, '');
        return newtxt;
    }

    let title = $state()
    $effect(()=>{
        if(post){
            title = removeTags(post.title)
        }
    })
</script>
<Navbar username={user.fullname}/>
{#if msg}
  <Toast bind:message={ msg } type={ type } />
{/if}
<svelte:head>
    {#if post}
        <title>Metag - {title}</title>
    {:else}
        <title>Metag - Loading</title>
    {/if}
</svelte:head>
<div class="w-full max-w-7xl mx-auto p-4 min-h-screen">
    <div class="max-w-7xl mx-auto py-4">
        <div class="flex items-center justify-end gap-4 flex-row-reverse">
            <!-- Header Text -->
            <h1 class="text-xl font-semibold text-white flot-b">{#if post}
                {title}
                {:else}
                Loading...
            {/if}</h1>
            
            <!-- Back Button -->
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/dashboard" data-sveltekit-prefetch>
                <button class="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </a>
        </div>
    </div>
    <div class="bg-zinc-900 text-white rounded-xl p-1 md:p-2 min-h-screen">
        <div class="h-full flex items-center justify-center text-gray-400 p-1 md:p-4">
        {#if post}
            <LinkedinCard content={post.content} id={post.id}/>
        {:else}
            <div class="flex justify-center">
                <img src="/loading.gif" class="h-24 w-24 mt-[100px]" alt="loading">
            </div>
        {/if}
        </div>
    </div>
</div>