<script >
    import { onMount } from "svelte";
    import Profile from "./Profile.svelte";
    import { browser } from "$app/environment";

    let { username } = $props();
    console.log(username);
    let showMenu = $state(false);
    let ctaText = $state();
    onMount(()=>{
        if (browser) {
            ctaText = localStorage.getItem('ctaContent') || '';
        }
    })

    function saveCTA() {
        if(browser){
            localStorage.setItem("ctaContent", ctaText);
        }
        showMenu = false;
    }
</script>

<header class="sticky top-0 z-50 bg-[#121212]">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <img src="/logo.png" alt="" class="w-9 h-9" />
            <span
                class="text-xl font-semibold tracking-tight flot-b text-white "
                >Metag</span
            >
        </div>
        <div class="flex items-center gap-5">
            <button
                onclick={() => (showMenu = true)}
                class="p-2 rounded-lg hover:bg-gray-800 text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span class="sr-only">Settings</span>
            </button>

            {#if showMenu}
                <div
                    class="fixed inset-0 bg-black/50 flex items-center justify-center p-2 backdrop-blur-sm"
                >
                    <div
                        class="bg-[#121212] rounded-xl p-4 w-full max-w-md space-y-4 shadow-xl shadow-black/30"
                    >
                        <div class="space-y-2">
                            <h2 class="text-2xl font-bold text-white flot-b">
                                Edit CTA Content
                            </h2>
                            <p class="text-sm text-zinc-400 flot">
                                Update your call-to-action message below
                            </p>
                        </div>

                        <!-- svelte-ignore element_invalid_self_closing_tag -->
                        <textarea
                            bind:value={ctaText}
                            class="w-full p-3 rounded-lg bg-zinc-800/90 border border-zinc-700 text-white placeholder-zinc-500
                   focus:outline-none focus:ring-2 focus:ring-[#ccfc7e]/90 focus:border-[#ccfc7e]/50
                   transition-all duration-200 resize-none"
                            rows="4"
                            placeholder="Enter your call to action..."
                        />

                        <div class="flex justify-end space-x-4">
                            <button
                                onclick={() => (showMenu = false)}
                                class="px-5 py-2 rounded-lg font-medium text-white bg-red-600/90 hover:bg-red-600
                       transition-colors duration-150 active:scale-[0.98] flot"
                            >
                                Cancel
                            </button>
                            <button
                                onclick={saveCTA}
                                class="px-5 py-2 rounded-lg font-medium bg-[#ccfc7e] hover:bg-[#c2f06e] text-gray-900
                       transition-all duration-150 active:scale-[0.98] flot"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            {/if}
            <a href="/dashboard/editor">
                <button
                class="flot bg-[#ccfc7e] hover:scale-105 active:scale-95 transition text-black font-bold w-full sm:w-auto px-2 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1" 
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5" 
        >
            <!-- Containing circle for better visual hierarchy -->
            <circle cx="12" cy="12" r="9" />
            <!-- Centered plus symbol with adjusted proportions -->
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v8M8 12h8" 
            />
        </svg>
                Editor
            </button></a>
            <Profile {username} />
        </div>
    </div>
</header>
