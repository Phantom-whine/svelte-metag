<div class="bg-[#ccfc7e] p-6 md:p-12 lg:p-12 w-[95%] mx-auto mt-8 rounded-[50px]">
    <div class="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div class="space-y-6">
            <h1 class="text-black text-5xl md:text-6xl lg:text-7xl font-bold leading-tight flot-b">
                Optimized for <br>LinkedIn Growth
            </h1>
            <p class="text-black text-lg md:text-xl max-w-xl">
                AI suggests post formats that maximize reach.
            </p>
        </div>

        <div class="w-full max-w-xl mx-auto lg:mx-0 bg-white rounded-3xl p-8 shadow-lg">
            <div class="space-y-6">
                <div class="space-y-2">
                    <label for="topic" class="block text-sm font-medium text-gray-700">Topic</label>
                    <input type="text" id="topic" placeholder="Enter your blog topic" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B00] focus:border-[#FF3B00]">
                </div>

                <div class="space-y-2">
                    <label for="length" class="block text-sm font-medium text-gray-700">Length</label>
                    <select id="length" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B00] focus:border-[#FF3B00]">
                        <option value="">Select blog length</option>
                        <option value="short">Short (500 words)</option>
                        <option value="medium">Medium (1000 words)</option>
                        <option value="long">Long (1500+ words)</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
                    <select id="language" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B00] focus:border-[#FF3B00]">
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                    </select>
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="custom-switch">
                            <input type="checkbox">
                            <span class="custom-slider"></span>
                        </div>
                        <span class="text-sm">SEO Optimize</span>
                    </label>

                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="custom-switch">
                            <input type="checkbox">
                            <span class="custom-slider"></span>
                        </div>
                        <span class="text-sm">Use Latest Data</span>
                    </label>
                </div>

                <button type="submit" 
                        class="w-full bg-black hover:scale-105 active:scale-95 transition text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    Generate Viral Blog Post
                </button>
            </div>

            <div class="mt-6 pt-6 border-t">
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>AI Processing</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full animate-pulse bg-blue-500"></div>
                        <span>Real-time generation</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="h-8"></div>
<style>
    .custom-switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
    }
    .custom-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .custom-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
    }
    .custom-slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    input:checked + .custom-slider {
        background-color: black;
    }
    input:checked + .custom-slider:before {
        transform: translateX(24px);
    }
</style>