<template>
  <div>
    <h1 class="transition-all 
        text-2xl text-transparent
        font-bold
        bg-gradient-to-r
        from-blue-500
        to-purple-500
        bg-clip-text
        m-1
      ">
      您即将提交以下作业：
    </h1>
    <button class="transition-all 
        bg-gradient-to-tr
        from-red-700
        to-purple-500
        rounded-md
        m-2
        p-2
        text-white
        hover:from-blue-500 hover:text-black
      " @click="clear">
      全部清空
    </button>
    <div v-for="(v, k) in tasks" :key="k">
      {{ v.name }}
      <button class="transition-all 
          ml-2
          bg-gray-500
          pl-1
          pr-1
          rounded-md
          hover:bg-gray-300
          active:bg-gray-100
        " @click="rm(k)">
        X
      </button>
    </div>
    <div class="transition-all text-right border-t-2 mt-4 p-2">
      <button class="transition-all text-gray-700 font-bold" @click="next">下一步</button>
    </div>
  </div>
</template>

<script setup>
import getStore from "../pinia/TaskStore"
import { storeToRefs } from "pinia";

let store = getStore()
let { tasks } = storeToRefs(store)
let emits = defineEmits(['clear','next','rm']);

function clear() {
  emits('clear')
}

function next() {
  emits('next')
}

function rm(v) {
  emits('rm',v)
}

document.onkeydown = () => {
  let key = window.event.keyCode;
  if (key == 39 || key == 13) {
    next()
  }
};
</script>

<style>

</style>