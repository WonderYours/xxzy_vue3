<template>
    <div v-if="notice" id="notice"
        class="transition-all fixed z-10 bg-black w-screen h-[100vh] items-center opacity-40">
    </div>
    <div class=" shadow-lg w-104 h-104 mt-8 ml-5 md:ml-16 card card-bordered bg-white fixed z-20 overflow-y-scroll overflow-x-hidden"
        v-if="notice">
        <div class="card-body">
            <h1 class="card-title">欢迎来到/|\ 馫 作 业</h1>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class="chat-bubble chat-bubble-warning">
                    小鑫作业批量提交版已正式更名为/|\ 馫 作 业！
                </div>
            </div>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class="chat-bubble chat-bubble-success">
                    感谢1月17日赞助的小伙伴！没有看到你的备注，如果需要展示请联系Q群群主！
                </div>
            </div>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class=" chat-bubble">
                    前端代码已迁移至vue3，使用组合式API，综合提速大约
                    <span class="badge badge-success inline text-white">200-300ms</span>
                    (没开玩笑)！
                </div>
            </div>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class="chat-bubble">
                    嗨嗨，不开学了吧，我就知道！任何违法行为（指提前开学），终将依法严惩！
                </div>
            </div>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class="chat-bubble chat-bubble-warning">
                    你的支持是我唯一的动力！
                </div>
            </div>
            <div class="chat chat-start">
                <div class="chat-header">Administrator <time class="text-xs opacity-50">2023-1-27 10:53</time></div>
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/2583942924DWDJPS.jpg">
                    </div>
                </div>
                <div class="chat-bubble">
                    <div class="md:w-[25vw] rounded-md">
                        <img src="https://zuoye2.xinkaoyun.com/awm/85/9630111730FXNZQK.png" alt="SUPPORT ME PLEASE!"
                            class="" />
                    </div>
                </div>
            </div>
            <div class="card-actions justify-center">
                <button class="btn btn-outline btn-accent w-full" @click="turnOffNotice">交作业去喽</button>
            </div>
        </div>
    </div>

</template>
<script setup>
import { onMounted,ref } from 'vue';

let notice = ref(false)

function isVisted() {
  if (sessionStorage.getItem("visited") === null) {
    sessionStorage.setItem("visited", true);
    return false
  } else {
    return true
  }
}

onMounted(() => {
  notice.value = !isVisted()
})

function turnOffNotice() {
  notice.value = false
}
</script>