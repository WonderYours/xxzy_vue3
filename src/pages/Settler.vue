<template>
  <div>
    <Navigator message="返回主页" tip="回到主页" url="/home" />
    <div class="text-sm breadcrumbs">
      <ul>
        <li v-for="v in breadList" :key="v">
          <button class="btn btn-ghost" @click="change(v)">
            {{ v }}
          </button>
        </li>
      </ul>
    </div>
    <Preview v-if="loaderValue == 0" @rm="rmFromTaskdata" @next="changeV(33)" @clear="clear" />
    <ConfirmSub v-else-if="loaderValue == 33" @next="changeV(66)" @back="changeV(0)" />
    <ConfirmTwice v-else-if="loaderValue == 66" @next="changeV(100)" @back="changeV(33)" />
    <Complete v-else-if="loaderValue == 100" @back="changeV(66)" />
  </div>
</template>

<script setup>
import Navigator from "../components/Navigator.vue";
import Preview from "../components/Preview.vue";
import ConfirmSub from "../components/ConfirmSub.vue";
import ConfirmTwice from "../components/ConfirmTwice.vue";
import Complete from "../components/Complete.vue";
import { storeToRefs } from "pinia"
import { ref, reactive, watch, onMounted } from "vue";
import getStore from "../pinia/TaskStore"

onMounted(() => {
  if (Object.keys(tasks.value).length===0){
    
  }
})

let breadList = reactive([])

function change(v) {
  switch (v) {
    case "预览阶段":
      changeV(0)
      break
    case "确认二卷":
      changeV(33)
      break
    case "二次确认":
      changeV(66)
      break
    case "提交完成  ":
      changeV(100)
      break
  }
}

let loaderValue = ref(0)//33,66,100
let store = getStore()
let { tasks } = storeToRefs(store)

watch(() => loaderValue.value, (nv) => {
  breadList.length = 0
  switch (nv) {
    case 0:
      breadList.push("预览阶段")
      break
    case 33:
      breadList.push("预览阶段")
      breadList.push("确认二卷")
      break
    case 66:
      breadList.push("预览阶段")
      breadList.push("确认二卷")
      breadList.push("二次确认")
      break
    case 100:
      breadList.push("预览阶段")
      breadList.push("确认二卷")
      breadList.push("二次确认")
      breadList.push("提交完成")
      break
  }

}, { immediate: true })

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