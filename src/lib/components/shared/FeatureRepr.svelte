<script>
    import FeatureHead from "./FeatureHead.svelte";
</script>
<FeatureHead id='features' title='DISCOVER OUR FEATURE SET' description='Explore the rich array of features that empower our platform to meet your unique needs.'/>
<div class="p-6 md:p-12 lg:p-16 w-[95%] mx-auto rounded-[50px] mt-4" style="background-color: #ccfc7e;">
    <div class="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div class="space-y-6">
            <h1 class="text-black text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight flot-b">
                Repurpose  
                <br>
                Any Content
            </h1>
            <p class="text-lg md:text-xl max-w-xl text-black">
                Convert ideas, YouTube videos, & blogs into LinkedIn posts instantly.
            </p>
        </div>

        <div class="w-full max-w-xl mx-auto lg:mx-0">
            <div class="bg-white rounded-3xl p-8 shadow-lg">
                <div class="grid grid-cols-3 gap-6">
                    <!-- Source Content Column -->
                    <div class="space-y-4">
                        <h3 class="font-semibold text-sm text-gray-500 mb-4">SOURCE</h3>
                        <div class="space-y-3">
                            <div class="bg-red-100 p-4 rounded-xl">
                                <div class="text-red-600 font-medium mb-1">YouTube Video</div>
                                <div class="w-full h-1 bg-red-200 rounded">
                                    <div class="w-2/3 h-1 bg-red-500 rounded"></div>
                                </div>
                            </div>

                            <div class="bg-blue-100 p-4 rounded-xl">
                                <div class="text-blue-600 font-medium mb-1">Blog Post</div>
                                <div class="w-full h-1 bg-blue-200 rounded">
                                    <div class="w-1/2 h-1 bg-blue-500 rounded"></div>
                                </div>
                            </div>

                            <div class="bg-green-100 p-4 rounded-xl">
                                <div class="text-green-600 font-medium mb-1">Topic</div>
                                <div class="w-full h-1 bg-green-200 rounded">
                                    <div class="w-1/2 h-1 bg-green-500 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Arrow Column -->
                    <div class="flex items-center justify-center">
                        <div class="w-12 h-12 rounded-md p-1 flex items-center justify-center" style="background-color: black;">
                            <img src="/logo.png" alt="">
                        </div>
                    </div>

                    <!-- Output Content Column -->
                    <div class="space-y-4">
                        <h3 class="font-semibold text-sm text-gray-500 mb-4">OUTPUT</h3>

                        <div class="space-y-3">
                                <div class="bg-blue-500/10 p-4 rounded-xl" style="visibility: hidden;">
                                    <div class="text-blue-600 font-medium mb-1">LinkedIn Post</div>
                                    <div class="w-full h-1 bg-blue-200 rounded">
                                        <div class="w-full h-1 bg-blue-500 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            <div class="bg-blue-500/10 p-4 rounded-xl">
                                <div class="text-blue-600 font-medium mb-1">LinkedIn Post</div>
                                <div class="w-full h-1 bg-blue-200 rounded">
                                    <div class="w-full h-1 bg-blue-500 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="mt-6 pt-6 border-t">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>AI Processing</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full animate-pulse bg-blue-500"></div>
                            <span>Real-time conversion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>