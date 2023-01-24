<template>
  <div class="min-h-[80vh]">
    <h1 class="
        transition-all
        text-2xl text-transparent
        font-bold
        bg-gradient-to-r
        from-red-500
        to-purple-500
        bg-clip-text
        m-1
      ">
      只差一步！您即将提交：
    </h1>
    <p class="transition-all text-sm font-bold text-gray-700">
      选择已自动按随机20%-50%错误率设置
    </p>
    <div v-for="(v, k) in tasks" :key="k">
      <!-- v是每一项作业的数据,k是每一项作业的sid -->
      <h1 class="transition-all text-xl font-extrabold m-1">{{ v.name }}</h1>
      <div v-for="(v2, k2) in v.SubAnswerMap" :key="k2">
        <!-- v2是主观信息，k2是teaId -->
        <h4 class="transition-all text-lg text-gray-700">
          {{ v2.whose }}
        </h4>
        <img class="transition-all w-52 h-52 rounded-md" v-for="(v3, k3) in v2.images" :key="k3" :src="v3" />

      </div>
    </div>
  </div>
  <div class="transition-all relative border-t-2 mt-4 p-2">
    <button class="transition-all text-gray-700 font-bold absolute left-1" @click="back">
      上一步
    </button>
    <button class="transition-all text-red-700 font-bold absolute right-1" @click="next">
      完成提交
    </button>
  </div>
</template>
  
<script setup>
import getStore from "../pinia/TaskStore"
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

let store = getStore()
let { token, tasks } = storeToRefs(store)

document.onkeydown = () => {
  let key = window.event.keyCode;
  if (key == 39 || key == 13) {
    alert("为了您的安全，我们阻止了你的鲁莽行为");
  } else {
    if (key == 37) {
      back();
    }
  }
}

const emits = defineEmits(["next", "back"])

function next() {
  if (confirm("再次确认，你真的要提交吗") === false) {
    return;
  }
  emits("next")
}

function back() {
  emits("back")
}

onMounted(() => {
  window.scrollTo(0, 0);
  for (let i in tasks.value) {
    let string = "";
    for (let j in tasks.value[String(i)]["SubAnswerMap"]) {
      for (let n of tasks.value[String(i)]["SubAnswerMap"][String(j)]["images"]) {
        string += j + "," + n + ";";
      }
      string += "|";
    }
    string = string.replaceAll(";|", "|");
    string = string.substring(0, string.length - 1);
    tasks.value[String(i)]["subSubString"] = string
  }
})


  // if (Object.keys(this.taskdata[i]["sub"]).length == 0) {
  //   this.$set(this.taskdata[String(i)], "subSubData", "");
  //   return;
  // }
  // for (let j in this.taskdata[i]["sub"]) {
  //   let string = "";
  //   let answerArray = this.taskdata[i]["sub"][j];
  //   for (let h of answerArray) {
  //     string += j + "," + h + ";";
  //   }
  //   string += "|";
  //   string = string.replaceAll(";|", "|");
  //   string = string.substring(0, string.length - 1);
  //   this.$set(this.taskdata[String(i)], "subSubData", string);

// function objM(sid) {
//   let ret = "";
//   for (let i in this.taskdata[String(sid)]["handledAnswers"]) {
//     ret +=
//       String(i) +
//       ":" +
//       this.taskdata[String(sid)]["handledAnswers"][String(i)] +
//       ",";
//   }
//   return ret;
// }
</script>

<style>

</style>