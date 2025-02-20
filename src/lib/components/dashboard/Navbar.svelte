<script>
    import { onMount } from "svelte";
    import Profile from "./Profile.svelte";
    import { browser } from "$app/environment";

    let { username } = $props();
    console.log(username);
    let showMenu = $state(false);
    let ctaText = $state();
    onMount(() => {
        if (browser) {
            ctaText = localStorage.getItem("ctaContent") || "";
        }
    });

    function saveCTA() {
        if (browser) {
            localStorage.setItem("ctaContent", ctaText);
        }
        showMenu = false;
    }

    function createCTAGenerator() {
        const components = {
            openings: [
                [
                    "🔥",
                    "What do you think? Drop your thoughts in the comments!",
                ],
                ["🤔", "Curious to hear your take! Drop a comment!"],
                ["🔥", "Do you feel the same way? Let’s talk in the comments!"],
                ["🧐", "What do you think? Let’s chat in the comments!"],
                ["💡", "What would you add to this? Join the conversation!"],
                ["🌟", "How would you approach this? Share below!"],
                ["🎯", "Do you agree? Let’s discuss!"],
                ["👀", "This one’s interesting! Let’s talk in the comments!"],
                ["🔥", "Your thoughts matter! Drop a comment!"],
                ["📝", "What’s your perspective on this? Let’s discuss!"],
                ["💬", "Let’s get a conversation going! What do you think?"],
                ["⚡", "Let’s debate this! Drop your thoughts!"],
                ["🤯", "Does this surprise you? Tell us why!"],
                ["💭", "Share your thoughts below!"],
                ["💡", "What’s your take? I’d love to hear it!"],
                ["📢", "Chime in! What do you think about this?"],
                ["🚀", "Let’s spark a conversation! What’s your view?"],
                ["🔍", "Any insights on this? Let’s chat!"],
                ["🎙️", "Speak up! What’s your opinion?"],
                ["🧠", "What does your gut tell you? Let’s discuss!"],
            ],
            likes: [
                ["👍", "Like if you agree!", "❤️"],
                ["👍", "Agree? Hit like!", "❤️"],
                ["👍", "Like if you vibe with this!", "❤️"],
                ["👍", "Like if this resonates!", "❤️"],
                ["🔥", "Support this idea? Hit like!", "💖"],
                ["👏", "Love this? Show some appreciation!", "✨"],
                ["❤️", "Hit like if this made sense to you!", "👍"],
                ["👌", "Give this a thumbs-up if you relate!", "🔥"],
                ["✨", "Enjoyed this? Like and let us know!", "👏"],
                ["💡", "Does this make sense? Like to support!", "🔔"],
                ["⚡", "If this sparked something in you, hit like!", "👊"],
                ["🚀", "Let’s see those likes if you found value!", "🔥"],
                ["🎯", "This hit home? Show some love!", "🤩"],
                ["🔍", "Agree? Let’s see those likes!", "🧐"],
                ["🙌", "If this resonated, hit that like button!", "🔥"],
            ],
            shares: [
                ["🚀", "Share if you found this helpful!", "🚀"],
                ["🚀", "Found this useful? Share it!", "🚀"],
                ["🚀", "Share the knowledge!", "🚀"],
                ["🚀", "Share if you found it valuable!", "🚀"],
                ["🔄", "Spread the word! Share this with others!", "📣"],
                ["📢", "If this was useful, don’t keep it to yourself!", "🚀"],
                ["💡", "Share this insight with your network!", "🔁"],
                ["🔥", "Help others by sharing this!", "✨"],
                ["🗣️", "Know someone who needs this? Share now!", "💡"],
                ["📌", "Save this for later and share with others!", "🎯"],
                ["🤝", "Let’s help more people! Share this!", "🚀"],
                ["🎤", "If this spoke to you, share it!", "🔊"],
                ["⚡", "Let’s get more eyes on this—share away!", "✨"],
                ["🌟", "A quick share could make someone’s day!", "🤩"],
                ["📨", "Pass this along to someone who’d love it!", "❤️"],
            ],
            commentSymbols: [
                "💬👇",
                "💬💡",
                "💬✨",
                "💬🚀",
                "💬🔥",
                "💬🎯",
                "💬🙌",
                "💬💭",
                "💬⚡",
                "💬🗣️",
            ],
        };

        const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const [oEmoji, oText] = rand(components.openings);
        const [lEmoji, lText, lEnd] = rand(components.likes);
        const [sEmoji, sText, sEnd] = rand(components.shares);
        const commentSymbol = rand(components.commentSymbols);

        ctaText = `${oEmoji} ${oText} ${commentSymbol}\n${lEmoji} ${lText} ${lEnd}\n${sEmoji} ${sText} ${sEnd}`;
    }
</script>

<header class="sticky top-0 z-50 bg-[#121212]">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <img src="/logo.png" alt="" class="w-9 h-9" />
            <span
                class="text-xl font-semibold tracking-tight flot-b text-white hidden md:inline"
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
                        <div class="relative">
                            <textarea
                                bind:value={ctaText}
                                class="w-full p-3 rounded-lg bg-zinc-800/90 border border-zinc-700 text-white placeholder-zinc-500
                                       focus:outline-none focus:ring-2 focus:ring-[#ccfc7e]/90 focus:border-[#ccfc7e]/50
                                       transition-all duration-200 resize-none pr-8"
                                rows="4"
                                placeholder="Enter your call to action..."
                            />
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                class="absolute bottom-2 right-1 flex items-center justify-center p-1.5
                                           bg-black/30 backdrop-blur-sm rounded-md border border-white/10
                                           hover:bg-black/40 hover:border-white/20 transition-all duration-200
                                           hover:scale-105 group text-white"
                                onclick={() => createCTAGenerator()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-3 h-3 text-white/60 group-hover:text-white/80"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.5l-.394-.933a2.25 2.25 0 00-1.423-1.423L13.5 18.5l.933-.394a2.25 2.25 0 001.423-1.423l.394-.933.394.933a2.25 2.25 0 001.423 1.423l.933.394-.933.394a2.25 2.25 0 00-1.423 1.423z"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div class="flex justify-end space-x-2">
                            <button
                                onclick={() => (showMenu = false)}
                                class="px-4 py-1 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700
                                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50
                                   transition-colors duration-150 active:scale-[0.98] shadow-md hover:shadow-lg flot"
                            >
                                Cancel
                            </button>

                            <button
                                onclick={saveCTA}
                                class="px-4 py-1 rounded-lg font-medium bg-[#ccfc7e] hover:bg-[#a9e242] text-gray-900
                                   focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] focus:ring-opacity-50
                                   transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg flot"
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
                </button></a
            >
            <Profile {username} />
        </div>
    </div>
</header>
