<template>
  <div>
    <Notice />
    <!-- 上面是求财 -->
    <Navigator message="开始结算" tip="打开结算页面" url="/settler" />
    <div class="tabs tabs-boxed mt-2 m-1 p-1">
      <button v-for="m in subjects" :key="m.uid" @click="changeCurrentSubject(m.subId)" :class="butClass(m.subId)">
        {{ m.name }}
      </button>
    </div>
    <TaskDisplay :subId="currentSubject" />
  </div>
</template>

<script setup>
import Notice from "../components/Notice.vue";
import Navigator from "../components/Navigator.vue";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import TaskDisplay from "../components/TasksDisplay.vue";
import getStore from "../pinia/TaskStore.js"
import { storeToRefs } from "pinia";

function butClass(sid) {
  if (sid === currentSubject.value) {
    return "tab tab-active"
  } else {
    return "tab"
  }
}


let store = getStore()
let { subjects, token } = storeToRefs(store)
let currentSubject = ref(1)


function changeCurrentSubject(sid) {
  currentSubject.value = sid
}

onBeforeMount(async () => {
  subjects.value.length = 0
  //调试期代码，生产环境删
  // localStorage.setItem("token", "pc_fef572efe933483f84ffd3680d5d486f");
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
</script>
<style scoped>
p {
  text-indent: 2em;
}
</style>