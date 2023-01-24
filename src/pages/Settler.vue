<template>
  <div>
    <nav class="transition-all grid grid-cols-10 md:grid-cols-12 bg-red-700">
      <div class="transition-all col-span-8 md:col-span-10 p-2">
        <h1 class="
            transition-all
            ml-1
            text-lg
            md:text-4xl
            bg-gradient-to-r
            from-yellow-400
            via-yellow-200
            to-yellow-200
            text-transparent
            bg-clip-text
            font-extrabold
          ">
          小鑫作业·新年快乐
        </h1>
        <span class="transition-all text-gray-300 ml-1 text-sm md:text-base">极致省时，批量提交，一键解决作业难题</span>
      </div>
      <router-link to="/home" class="
          transition-all
          hover:bg-red-600
          col-span-2
          text-center
          block
          bg-red-700
          text-white
          font-bold
          rounded-md
          pt-5
          text-xl
          md:text-2xl
        ">回首页</router-link>
    </nav>
    <Preview v-if="loaderValue == 0" @rm="rmFromTaskdata" @next="changeV(33)" @clear="clear"/>
    <ConfirmSub v-else-if="loaderValue == 33" @next="changeV(66)" @back="changeV(0)"/>
    <ConfirmTwice v-else-if="loaderValue == 66" @next="changeV(100)" @back="changeV(33)" />
    <Complete v-else-if="loaderValue == 100" @back="changeV(66)"/>
  </div>
</template>

<script setup>
import Preview from "../components/Preview.vue";
import ConfirmSub from "../components/ConfirmSub.vue";
import ConfirmTwice from "../components/ConfirmTwice.vue";
import Complete from "../components/Complete.vue";
import { storeToRefs } from "pinia"
import { ref } from "vue";
import getStore from "../pinia/TaskStore"


let loaderValue = ref(0)//33,66,100
let store = getStore()
let { tasks } = storeToRefs(store)

function clear() {
  Object.keys(tasks.value).map(key => {
    delete tasks.value[key]
  })
}

function rmFromTaskdata(v) {
  delete tasks.value[String(v)];
}

function changeV(v) {
  loaderValue.value = v;
}

</script>

<style>

</style>