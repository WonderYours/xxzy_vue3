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
      已提交，请对照查看是否提交成功
    </h1>
    <div class="transition-all m-2 p-2" v-for="(v, k) in msg" :key="k">
      <h2 class="transition-all font-bold text-xl">{{ tasks[k]["name"] }}</h2>
      <p class="transition-all text-gray-700 text-lg">
        {{ v }}
      </p>
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { reactive, onMounted } from "vue";
import getStore from "../pinia/TaskStore"

document.onkeydown = () => {
  let key = window.event.keyCode;
  if (key == 39 || key == 13) {
    window.open("/#/home", "_self");
  }
}

let store = getStore()
let { tasks, token } = storeToRefs(store)
let msg = reactive({})

onMounted(() => {
  for (let i in tasks.value) {
    let options = {
      method: "POST",
      url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/submitTask",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        token: token.value,
        taskId: String(i),
        objectiveAnswer: tasks.value[String(i)]["objSubString"],
        subjectiveAnswer: tasks.value[String(i)]["subSubString"]
      }
    }
    axios
      .request(options)
      .then((response) => {
        msg[String(i)] = response.data["msg"]
      })
      .catch(function (error) {
        console.error(error);
      });
  }
})
</script>

<style>

</style>