<script>
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { getAccessToken } from '$lib/auth';
    
    let { openModal=$bindable(false), onUse } = $props();
    const API_URL = import.meta.env.VITE_DJANGO_API_URL;

    let selectedField = $state(null);
    let loading = $state(false);
    let showDropdown = $state(false);
    let textContent = $state("");
    let topics = $state([]);

    const fields = [
        "Everyday Life",
        "Technology",
        "Work Life",
        "Healthcare",
        "Finance",
        "Education",
        "Entertainment",
        "Politics",
        "Engineering & Manufacturing",
        "Marketing & Advertising",
        "Science & Research",
        "Agriculture & Food",
        "Transportation & Logistics"
    ];

    async function generateTopics() {
        console.log(document.cookie)
        try {
            const res = await axios.post(`${API_URL}/api/posts/topics/`, 
                {
                    "field": selectedField,
                    "sub_field": textContent
                },{
                    headers:{
                        'Authorization': `Bearer ${Cookies.get('access')}`
                    }
                }
            )
            const data = res.data;
            topics = data.suggestions;
            loading = false;
        } catch (error) {
            loading = false;
            console.log(error)
        }
    }

    function useTopic(topic) {
        return onUse(topic);
    }
    
    let suggestions = ['SEO', 'SERP', 'AI marketing']
</script>

{#if openModal}
    <!-- Modal -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
        <div class="bg-zinc-900 text-white rounded-xl w-full max-w-md p-4">
            <div class="space-y-4">
                <!-- Header -->
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold flot">Get Viral Topics 😎</h3>
                    <button
                        onclick={() => {
                            openModal = false
                            showDropdown = false
                        }}
                        class="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <!-- Field Dropdown -->
                <div class="relative">
                    <button
                        onclick={() => (showDropdown = !showDropdown)}
                        class="flot w-full bg-zinc-800 border-zinc-700 rounded-lg p-2 text-left text-sm flex justify-between items-center"
                    >
                        <span>{selectedField || "Select a field"}</span>
                        <svg
                            class="w-4 h-4 transform transition-transform"
                            class:rotate-180={showDropdown}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {#if showDropdown}
                        <div
                            class="p-2 absolute z-10 w-full mt-1 bg-zinc-800 rounded-lg border border-zinc-700 max-h-48 overflow-y-auto"
                        >
                            {#each fields as field}
                                <button
                                    onclick={() => {
                                        selectedField = field;
                                        showDropdown = false;
                                    }}
                                    class="rounded-md w-full p-2 flot text-sm text-left hover:bg-zinc-700"
                                >
                                    {field}
                                </button>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Content Input -->
                <textarea
                    bind:value={textContent}
                    id="content"
                    placeholder="Enter your content or select a topic above..."
                    class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-3 text-sm text-white"
                ></textarea>
                <!-- <div class="suggested_section flex justify-between gap-2">
                    {#each suggestions as suggested}
                        <div class="flot text-sm text-center active:scale-95 transition w-full p-1 rounded-md bg-zinc-700" onclick={() => {
                            textContent = suggested;
                        }}>
                            {suggested}
                        </div>
                    {/each}
                </div> -->

                <!-- Loading Button -->
                <button
                    onclick={async () => {
                        loading = true;
                        generateTopics();
                    }}
                    disabled={!selectedField || loading}
                    class="w-full bg-[#ccfc7e] flot active:scale-95 text-black font-medium rounded-lg p-3 text-sm transition-all relative"
                >
                    <div class="flex items-center justify-center gap-2">
                        {loading ? "Generating Topics" : "Generate Topics"}
                        {#if loading}
                            <svg
                                class="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        {/if}
                    </div>
                </button>

                <!-- Generated Topics -->
                <div class="space-y-3">
                    {#each topics as topic}
                        <div
                            class="group relative bg-zinc-800 rounded-lg p-3 text-sm hover:ring-1 hover:ring-[#ccfc7e] transition-all"
                        >
                            <div class="flex justify-between items-center">
                                <span>{topic.name}</span>
                                <span class="text-[#d4ff52]"
                                    >{topic.virality}%</span
                                >
                            </div>
                            <div class="h-1 bg-zinc-700 rounded-full mt-2">
                                <div
                                    class="h-full bg-[#ccfc7e] rounded-full transition-all duration-500"
                                    style={`width: ${topic.virality}%`}
                                ></div>
                            </div>
                            <button
                                onclick={() => useTopic(topic.name)}
                                class="bg-[#ccfc7e] absolute right-2 top-2 flot text-black px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Use Topic
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}
<style>
    #content{
        resize: none;
    }
</style>