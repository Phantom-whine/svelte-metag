<script>
    function removeTags(inputText) {
        // Remove all <br> and <p> tags (including closing tags)
        const cleanedText = inputText.replace(/<\/?\w+\s*\/?>/gi, '');
        const newtxt = cleanedText.replace(/<!---->/g, '');
        return newtxt;
    }
    let { title, body, date, id, onDelete } = $props();
    let body_cleaned = removeTags(body);
    let title_cleaned = removeTags(title);
    let open = $state(false)
</script>

<div class="bg-zinc-800 rounded-xl overflow-hidden transition-colors flex flex-col h-full w-full">
    <div class="p-4 flex-1">
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
                <img src='/in.png' class="w-10 h-10 rounded-md" alt="logo">
                <div>
                    <h3 class="font-semibold text-white">Metag AI</h3>
                    <p class="text-xs text-gray-400">{date}</p>
                </div>
            </div>
            <div class="relative">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button onclick={open=!open} class="text-gray-400 hover:text-white p-2 rounded-md" class:bg-zinc-600={open}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                {#if open}
                    <div onclick={open=false} class="flot p-2 absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg z-20">
                        <button onclick={()=>onDelete(id)} class="rounded-md flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L6 9m6 9v-9m6 9v-9M4 6h16M9 6V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6m-7.5 0h6M4 6h16M5 6h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/>
                            </svg>
                            Delete
                        </button>                          
                    </div>
                {/if}
            </div>
        </div>
        <h4 class="text-lg font-medium text-white mb-2 flot">{title_cleaned}</h4>
        <p class="text-sm text-gray-300 line-clamp-3">{body_cleaned}</p>
    </div>
    <div class="p-4">
        <a href="/dashboard/{id}">
            <button class="w-full text-sm bg-[#ccfc7e] active:scale-95 transition text-black px-4 py-2 rounded-lg flot-b">
                Open Post
            </button>
        </a>
    </div>
</div>