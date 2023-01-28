<template>
  <div class="card">
    <h1 class="card-title">
      您即将提交以下作业：
    </h1>
    <div class="card-actions">
      <div class="tooltip tooltip-right" data-tip="点击清空结算区">
        <button class="btn btn-outline" @click="clear">
          全部清空
        </button>
      </div>
    </div>
    <div v-for="(v, k) in tasks" :key="k">
      <h1 class="text-xl">{{ v.name }}
        <button class="btn btn-circle inline scale-50" @click="rm(k)">
          ×
        </button>
      </h1>
    </div>
    <div class="transition-all text-right border-t-4 mt-4 p-2">
      <button class="btn btn-outline" @click="next">下一步</button>
    </div>
  </div>
</template>

<script setup>
import getStore from "../pinia/TaskStore"
import { storeToRefs } from "pinia";

let store = getStore()
let { tasks } = storeToRefs(store)
let emits = defineEmits(['clear', 'next', 'rm']);

function clear() {
  emits('clear')
}

function next() {
  emits('next')
}

function rm(v) {
  emits('rm', v)
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