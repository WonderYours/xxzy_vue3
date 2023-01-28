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
      请确认要上传的二卷
    </h1>
    <p class="transition-all text-sm font-bold text-gray-700">
      例如：有他人姓名，和自己是同一班级/级部……
    </p>
    <p class="transition-all text-sm font-bold text-gray-700">点击图片查看大图</p>
    <div v-for="(v, k) in tasks" :key="k">
      <!-- v是每一项作业的数据,k是每一项作业的sid -->
      <h1 class="transition-all text-xl font-extrabold m-1">{{ v.name }}</h1>
      <div v-for="(v2, k2) in v.SubAnswerMap" :key="k2">
        <!-- v2是主观信息，k2是teaId -->
        <h4 class="transition-all text-lg text-gray-700">
          {{ v2.whose }}
        </h4>
        <img class="transition-all w-52 h-52 rounded-md" v-for="(v3, k3) in v2.images" :key="k3" :src="v3"
          @click="jumpTo(v3)" />
        <!-- k3做uid用，v3是二卷url -->
        <button @click="randomSubGet(k)" class="transition-all 
            shadow-md
            m-2
            p-2
            rounded-md
            active:bg-gray-500
            hover:bg-gray-200
          ">
          这写的什么玩意啊，赶紧换
        </button>
      </div>
    </div>
    <div class="transition-all relative border-t-2 mt-4 p-2">
      <button class="btn btn-outline absolute left-1" @click="back">
        上一步
      </button>
      <button class="btn btn-outline absolute right-1" @click="next">
        下一步
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import getStore from "../pinia/TaskStore"

let store = getStore()
let emits = defineEmits(['next', 'back']);
let { tasks, token } = storeToRefs(store)

document.onkeydown = () => {
  let key = window.event.keyCode;
  if (key == 39 || key == 13) {
    next()
  } else {
    if (key == 37) {
      back();
    }
  }
}

function jumpTo(url) {
  window.open(url, "_blank");
}

function next() {
  emits("next");
}

function back() {
  emits("back");
}

onMounted(() => {
  for (let i in tasks.value) {
    randomSubGet(i)
  }
})

async function randomSubGet(i) {
  // 这里i是tasks的key，即taskId
  let options = {
    method: "POST",
    url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getGradeRanks",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: {
      page: "1",
      limit: "1000",
      taskId: String(i),
      token: token.value,
    },
  };//作业i的年级全排名
  let data;
  await axios
    .request(options)
    .then((response) => {
      data = response.data["data"]
    });
  let targetPersonGradeRank = parseInt(Math.random() * (data.length + 1) - 1)//目标名次
  let targetPersonId = data[targetPersonGradeRank]["userId"]//取出目标id
  let targetPersonName = data[targetPersonGradeRank]["realName"]//取出目标name
  let targetPersonClass = data[targetPersonGradeRank]["className"]//取出目标class

  // 获得id的图片列表
  options = {
    method: "POST",
    url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getMutualTaskInfo",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: {
      taskId: String(i),
      userId: targetPersonId,
      token: token.value,
    },
  };
  //此api请求某人（userId）的某套（taskId）二卷
  //然后把url作为列表设置到taskdata[作业号]["sub"][题号]中
  data = ""
  await axios
    .request(options)
    .then((response) => {
      data = response.data
    })
    .catch((err) => { console.error(err) })
  for (let j of data["data"]) {
    tasks.value[String(i)]["SubAnswerMap"][j["teaId"]] = {
      whose:targetPersonName+"·"+targetPersonClass+"·年级第"+targetPersonGradeRank+"名",
      images: j["images"]
    }
  }
}

</script>


<style>
</style>