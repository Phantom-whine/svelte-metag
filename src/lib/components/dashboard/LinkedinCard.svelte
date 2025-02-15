<script>
    import { onDestroy } from "svelte";
    import Cookies from "js-cookie";
    import axios from "axios";
    import { tempStore } from "$lib/editor";
    import { goto } from "$app/navigation";

    let { content, id } = $props();
    let copied = $state(false);
    let expanded = $state(false); // New state for expand/collapse
    function pickRandom() {
        return Math.random() < 0.5 ? "Paul Jessey" : "Paul Jerry";
    }
    let rand_text = $state(pickRandom());

    let content_edited;

    const API_URL = import.meta.env.VITE_DJANGO_API_URL;
    const API_ENDPOINT = (id) => `${API_URL}/api/posts/edit/${id}/`;
    const getAuthHeader = () => ({
        Authorization: `Bearer ${Cookies.get("access")}`,
    });

    // API function
    async function saveEdits(id, content) {
        try {
            await axios.post(
                API_ENDPOINT(id),
                { content },
                {
                    headers: getAuthHeader(),
                },
            );
            console.log("Edit saved successfully");
        } catch (error) {
            console.error("Failed to save edit:", error.message);
            // Consider re-throwing or handling error as needed
        }
    }

    // Component lifecycle
    onDestroy(async () => {
        if(id){
            await saveEdits(id, content_edited.innerHTML.replace(/<!---->/g, ''));
        }
    });

    async function copyContent() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_ALL);
        let text = "";
        let lastWasBr = false;
        while (walker.nextNode()) {
            const node = walker.currentNode;

            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === "P") {
                    // Add newline before paragraph content
                    if (text.length > 0) text += "\n";
                    lastWasBr = false;
                } else if (node.tagName === "BR" || node.tagName === 'DIV') {
                    // Add double newline for line breaks
                    text += "\n";
                    lastWasBr = true;
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                // Add text content with normalized whitespace
                const content = node.textContent.trim();
                if (content) {
                    text += (lastWasBr ? "" : "") + content;
                    lastWasBr = false;
                }
            }
        }

        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }

    const sendEditor = ()=>{
        tempStore.setTemp(content);
        goto(`/dashboard/editor/?post_id=${id}`);
    }
</script>

<div
    class="w-full max-w-xl bg-black rounded-lg shadow-md border border-gray-800"
>
    <!-- Header -->
    <div class="p-4">
        <div class="flex justify-between items-start">
            <div class="flex gap-2">
                <!-- Avatar -->
                <div
                    class="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700"
                >
                    <img
                        src="/in.png"
                        alt="Profile"
                        class="h-full w-full object-cover"
                    />
                </div>
                <!-- Profile Info -->
                <div>
                    <h3 class="font-semibold text-gray-200">Metag AI</h3>
                    <p class="text-sm text-gray-400">Made with Love ❤️</p>
                    <div class="flex items-center gap-1 text-sm text-gray-500">
                        <span>Now</span>
                        <span>•</span>
                        <span>🌐</span>
                    </div>
                </div>
            </div>
            <!-- Copy Button -->
           <div class="flex gap-2">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
    onclick={sendEditor}
    class="text-gray-400 hover:text-gray-200 transition-colors"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
</button>
            <button
            onclick={copyContent}
            class="text-gray-400 hover:text-gray-200 transition-colors"
        >
            {#if copied}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-400 animate-scale"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M10 15.17l-4.17-4.18-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 animate-scale"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
                    />
                </svg>
            {/if}
        </button>
           </div>
        </div>
    </div>

    <!-- Content -->
    <div class="p-4 pt-0 space-y-4 text-gray-200">
        <div
            class="space-y-3 {expanded ? '' : 'truncate-lines'} transition-all"
            contenteditable
            bind:this={content_edited}
        >
            {#if content}
                {@html content}
            {/if}
        </div>
        <button
            onclick={() => (expanded = !expanded)}
            class="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
            {expanded ? "See Less" : "See More"}
        </button>

        <!-- Engagement Section -->
       <!-- Engagement Section -->
<div class="pt-4 border-t border-gray-800">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-gray-400">
        <!-- Left Section -->
        <div class="flex flex-wrap items-center gap-2">
            <!-- Buttons Container -->
            <div class="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-sm space-x-1">
                <!-- Like Button -->
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button class="p-1 md:p-1.5 bg-blue-500/90 hover:bg-blue-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 md:h-5 md:w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                        />
                    </svg>
                </button>
                
                <!-- Heart Button -->
                <button class="p-1 md:p-1.5 bg-red-500/90 hover:bg-red-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95">
                    <span class="text-white text-xs md:text-sm">❤️</span>
                </button>
                
                <!-- Target Button -->
                <button class="p-1 md:p-1.5 bg-yellow-500/90 hover:bg-yellow-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95">
                    <span class="text-white text-xs md:text-sm">🎯</span>
                </button>
            </div>
            
            <!-- Text Section -->
            <span class="md:text-xs text-sm">{rand_text} and 326 others</span>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-2 md:gap-4 text-xs md:text-sm hidden md:block">
            <span>655 comments</span>
            <span>20k likes</span>
        </div>
    </div>
</div>
    </div>
</div>

<style>
    .animate-scale {
        animation: scale 0.3s ease;
    }

    @keyframes scale {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    .truncate-lines {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
