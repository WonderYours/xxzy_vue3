<template>
    <div class="bg-white navbar rounded-b-lg shadow-md">
        <div class="navbar-start">
            <a class="btn btn-ghost text-md md:text-2xl" href="/#/home">/|\ 馫 作 业</a>
        </div>
        <div class="navbar-center">
            <div class="ml-3 flex gap-1 md:gap-5 tooltip tooltip-bottom tooltip-warning"
                data-tip="距离2023-2-1 9:00:00的倒计时">
                <div>
                    <span class="countdown font-mono text-md md:text-4xl">
                        <span :style="`--value:` + day + `;`"></span>
                    </span>
                    天
                </div>
                <div>
                    <span class="countdown font-mono text-md md:text-4xl ">
                        <span :style="`--value:` + hou + `;`"></span>
                    </span>
                    时
                </div>
                <div>
                    <span class="countdown font-mono text-md md:text-4xl ">
                        <span :style="`--value:` + min + `;`"></span>
                    </span>
                    分
                </div>
                <div>
                    <span class="countdown font-mono text-md md:text-4xl ">
                        <span :style="`--value:` + sec + `;`"></span>
                    </span>
                    秒
                </div>
            </div>
        </div>
        <div class="navbar-end">
            <div class="tooltip tooltip-info tooltip-bottom" :data-tip="tip">
                <router-link :to="url" class="btn btn-ghost text-md md:text-2xl ">
                    {{ message }}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

let day = ref(11)
let hou = ref(45)
let min = ref(14)
let sec = ref(0)

setInterval(timeUpdateLoop, 500)
let props = defineProps(["message", "tip", "url"])
function timeUpdateLoop() {
    let now = new Date()
    now = now.getTime() / 1000
    let future = 1675213200000 / 1000
    day.value = parseInt((future - now) / 60 / 60 / 24)
    hou.value = parseInt((future - now - (day.value * 60 * 60 * 24)) / 60 / 60)
    min.value = parseInt((future - now - (day.value * 60 * 60 * 24) - (hou.value * 60 * 60)) / 60)
    sec.value = parseInt(future - now - (day.value * 60 * 60 * 24) - (hou.value * 60 * 60) - (min.value * 60))
}
</script>