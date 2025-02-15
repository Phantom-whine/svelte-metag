<script>
    let { text } = $props();
</script>
<div class="bg-[#ccfc7e] px-4 py-2 text-center relative" x-show="banner">
    <p class="text-sm sm:text-sm font-semibold">
        {text}
        <a href="/" class="underline font-medium hover:text-gray-700">Check them out now!</a>
    </p>
</div>