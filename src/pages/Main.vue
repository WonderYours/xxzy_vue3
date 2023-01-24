<template>
  <div>
    <div v-if="notice" id="notice" class="
        transition-all
        fixed
        z-10
        bg-black w-screen h-[100vh]
        items-center
        opacity-40
      "></div>
    <div class="
        transition-all
        overflow-y-scroll
        w-104
        h-104
        p-4
        rounded-md
        fixed
        bg-white
        z-20
        m-4
        md:ml-14 md:mt-8
      " v-if="notice">
      <h1 class="
          transition-all
          text-lg
          md:text-4xl
          bg-gradient-to-r
          from-blue-500
          to-purple-500
          text-transparent
          bg-clip-text
          font-extrabold
        ">
        感谢您使用小鑫作业批量提交版~
      </h1>
      <div class="transition-all mt-4">
        <p class="transition-all mt-4">
          <a href="https://jq.qq.com/?_wv=1027&k=2SHL3DFO"
            class="text-red-600 font-bold text-center text-lg md:text-2xl">点击加入QQ群来获得最新消息~</a>
        </p>
        <p class="transition-all mt-4">
          虽然反馈有好有坏，但是作者十分高兴能帮到大家。再次感谢给出指导建议的小伙伴，以及积极宣传小鑫作业批量提交版的小伙伴，我们将努力走好最后这一段假期时光！
        </p>
        <p class="transition-all mt-4">
          根据反馈意见，作者已经修改了少量bug，包括
        </p>
        <p class="transition-all mt-4">
          1.一道主观题在多个图片时，二次确认图片显示失败的问题
        </p>
        <p class="transition-all mt-4">
          2.解决了显示报错split is not a function问题
        </p>
        <p class="transition-all mt-4">
          并且加入了少量功能以优化体验，例如在完全提交之前再次确认，优化了少量UI，<span
            class="transition-all text-red-700 text-lg font-bold">您现在可以按键盘的左右键来在结算区快速结算！</span>
        </p>
        <p class="transition-all mt-4">
          我们将在下个版本引入daisyui来重构UI，以便给您更舒适的体验。
        </p>
        <p class="transition-all mt-4">
          作者是一个孤寡，整个网站都是作者一个人写的，所以前前后后搞了一个多星期，手敲近1000行代码。只为了给同学们一个良好的假期体验。
        </p>
        <p class="transition-all mt-4">
          <span
            class="transition-all text-red-700 text-lg font-bold">但是</span>,由于服务器，域名等等都需要花Q，而作者实在是一穷二白，只能四处寻找免费产品等，不过因为免费产品都有时间限制，并且带宽不够，响应速度很慢，<span
            class="transition-all text-red-700 text-lg font-bold">
            所以大概只能再支持10天左右
          </span>
        </p>
        <p calss="mt-4">————如果没有人赞助的话</p>
        <p class="transition-all mt-4">
          所以，如果各位觉得这个网站真的帮助到了您，请留下几元Q来支持我们继续走下去吧！
        </p>
        <p class="transition-all mt-4">
          我们将在此页面展示所有帮助我们走下去的人，请在赞助时备注你想展现的名字！
        </p>
        <h1 class="
            transition-all
            text-xl
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            text-transparent
            bg-clip-text
            font-extrabold
            m-4
          ">
          微信扫个码呗：
        </h1>
      </div>
      <img src="https://zuoye2.xinkaoyun.com/awm/85/9630111730FXNZQK.png" />
      <button class="
          transition-all
          absolute
          right-4
          font-bold
          text-center text-gray-300
          p-2
          mt-2
          rounded-md
          bg-red-600
          hover:bg-red-700
        " @click="turnOffNotice">
        交作业去喽
      </button>
    </div>
    <!-- 上面是求财 -->
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
      <router-link to="/settler" class="
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
        ">去结算</router-link>
    </nav>
    <ul>
      <li v-for="m in subjects" :key="m.uid" class="transition-all inline-block">
        <button @click="changeCurrentSubject(m.subId)" class="
            transition-all
            hover:text-black
            rounded-lg
            border-2
            m-1
            p-1
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            text-transparent
            bg-clip-text
          ">
          {{ m.name }}
        </button>
      </li>
    </ul>
    <TaskDisplay :subId="currentSubject" />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, onBeforeMount } from "vue";
import TaskDisplay from "../components/TasksDisplay.vue";
import getStore from "../pinia/TaskStore.js"
import { storeToRefs } from "pinia";

function isVisted() {
  if (sessionStorage.getItem("visited") === null) {
    sessionStorage.setItem("visited", true);
    return false
  } else {
    return true
  }
}

let store = getStore()
let { subjects, token } = storeToRefs(store)
let notice = ref(false)
let currentSubject = ref(1)
function changeCurrentSubject(sid) {
  currentSubject.value = sid
}

onBeforeMount(async () => {
  subjects.value.length = 0
  //调试期代码，生产环境删
  // localStorage.setItem("token", "pc_0e9a05231fdb4ef1b33c9fd38cdd6125");
  //删
  const options = {
    method: "GET",
    url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getSubjects",
    params: { token: token.value },
  };
  await axios
    .request(options)
    .then((response) => {
      if (response.data["state"] === "over") {
        window.open("/login.html", "_self");
      } else {
        return response
      }
    }).then((response) => {
      let uid = 1;
      for (let i of response.data["data"]) {
        subjects.value.push({
          uid: uid,
          subId: i["sid"],
          name: i["subname"],
        });
        uid++;
      }
    }
    )
    .catch((err) => {
      console.log(err)
    });
})
onMounted(() => {
  notice.value = !isVisted()
})
function turnOffNotice() {
  notice.value = false
}
</script>
<style scoped>
p {
  text-indent: 2em;
}
</style>