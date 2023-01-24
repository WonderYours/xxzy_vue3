<template>
  <div>
    <ul>
      <li v-for="m in thisTasks" :key="m.sid" class="
          transition-all
          block
          w-104
          z-0
          p-2
          m-2
          border-2 border-gray-300
          bg-white
          rounded-md
          shadow-md
          hover:bg-gray-100
        ">
        <h4>
          {{ m.name }}
        </h4>
        <div>
          <div class="transition-all inline-block ring-1 ring-green-500 font-bold rounded-md m-1 p-2">
            {{ m.submitStatue }}
          </div>
          <button class="
              transition-all
              active:bg-green-600
              rounded-sm
              hover:bg-green-500
              m-1
              p-1
              right-1
              bg-green-400
            " @click="addToSettlement(m.sid, m.name, m.answers)" v-if="m.answerable">
            <div>加入结算区</div>
          </button>
          <button v-else disabled class="transition-all rounded-md m-1 p-1 right-2 bg-gray-500">
            {{ waitMessage }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { watch, reactive } from "vue";
import getStore from "../pinia/TaskStore"

let store = getStore()
let { token, tasks } = storeToRefs(store)
let props = defineProps(["subId"])
let waitMessage = ""
let thisTasks = reactive([])

function getNoRepeatRandom(num, per) {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  let n = parseInt(arr.length * per);
  let ret = [];
  for (let i = 1; i <= n; i++) {
    let l = arr.length;
    let index = parseInt(Math.random() * (l + 1) - 1);
    ret.push(arr[index]);
    arr.splice(index, 1);
  }
  return ret
}

function handleString(sid_answer) {
  let subString = "";
  for (let i in sid_answer) {
    let l = sid_answer[String(i)]
    if (l.length === 1) {
      subString += String(i) + "," + sid_answer[String(i)] + "|"
    } else {
      for (let j of sid_answer[String(i)].split("")) {
        subString += String(i) + "," + j + ";"
      }
      subString += "|"
    }
  }
  subString = subString.replaceAll(";|", "|")
  subString = subString.substring(0, subString.length - 1)
  return subString;
}



watch(() => props.subId, async (nV) => {
  let options = {
    method: "POST",
    url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTasks",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: {
      page: "1",
      limit: "99999999",
      sid: nV,
      start: "",
      end: "",
      submitCode: "",
      token: token.value,
    },
  }; //设置请求参数
  let data;
  await axios //请求作业列表信息
    .request(options)
    .then((response) => {
      data = response.data["data"]; //为了简写而将返回数组赋值
    })
    .catch((error) => {
      data = false
      console.error(error)
    });
  if (data === false) {
    return;
  }
  thisTasks.length = 0
  for (let i of data) {
    //遍历返回数组
    //把数据推入tasks
    thisTasks.push({
      sid: i["taskId"],
      name: i["taskName"],
      answerable: false, //先赋值为false,再异步更改。
      submitable: i["submitCode"] === 0, //0时可以提交
      submitStatue: i["submitState"],
    });
  }
  waitMessage = "正在问服务器有没有答案……";
  let sent = []; //发送数据初始化
  //把可提交的全部加入发送数据
  for (let n of thisTasks) {
    if (n["submitable"]) {
      sent.push(Number(n["sid"]));
    }
  }
  sent = JSON.stringify(sent); //数组转化为json
  options = {
    method: "POST",
    url: "http://xinkaoyun.tk/getoanswer2.php",
    params: { sid: sent },
  }; //设置请求参数
  await axios
    .request(options)
    .then((response) => {
      data = response.data
    })
    .catch(function (error) {
      data = false;
      console.log(error)
    });
  if (data["code"] === 0) {
    console.error(
      "后端500，code=0，" +
      data["errorMessage"] +
      "\n" +
      "错误点：TaskDisplay:125"
    );
    return;
  }
  for (let i of thisTasks) {
    if (
      data[i["sid"]] === undefined ||
      data[i["sid"]] === "No Answer"
    ) { } else {
      i["answerable"] = true;
      i["answers"] = data[i["sid"]];
    }
  }
  waitMessage = "此卷无答案";

}, { immediate: true })

async function addToSettlement(sid, name, retObjAnswers) {
  sid = String(sid)
  name = String(name)
  retObjAnswers = String(retObjAnswers)
  let temp = retObjAnswers.split("\n")
  let ObjAnswerMap = {}
  for (let i of temp) {
    ObjAnswerMap[i.split(".")[0]] = i.split(".")[1].replaceAll(" ", "")
  }//ObjAnswerMap处理好了

  const options = {
    method: "POST",
    url: "https://zuoyenew.xinkaoyun.com:30001/holidaywork/student/getTaskInfo",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: { taskId: sid, token: token.value },
  };
  let data
  await axios
    .request(options)
    .then((response) => { data = response.data })
    .catch((e) => { data = false; console.error(e) })
  if (data === false) {
    return;
  }
  let objNum = 0
  for (let i of data["data"]) {
    if (i["hasSubjectiveItem"] == 0) {
      objNum++
    }
  }
  let percent = parseFloat((Math.random() * 0.5 + 0.1).toFixed(1));
  let wrongIndexs = getNoRepeatRandom(objNum, percent)
  for (let i of wrongIndexs) {
    switch (ObjAnswerMap[String(i)]) {
      case "A":
        ObjAnswerMap[String(i)] = "D";
        break;
      case "B":
        ObjAnswerMap[String(i)] = "A";
        break;
      case "C":
        ObjAnswerMap[String(i)] = "B";
        break;
      case "D":
        ObjAnswerMap[String(i)] = "C";
        break;
      default:
        ObjAnswerMap[String(i)] = "BD";
    }
  }
  //设错完成
  let objAnswerSid = {}//客观题字典，teaId->answer
  for (let i of data["data"]) {
    if (i["hasSubjectiveItem"] == 0) {
      objAnswerSid[String(i["teaId"])] = ObjAnswerMap[i["teaCode"]]
    }
  }
  tasks.value[sid] = {
    name,
    retObjAnswers,
    ObjAnswerMap,
    SubAnswerMap: {},
    objSubString: handleString(objAnswerSid),
    subSubString: "",
  }
}
</script>



<style>

</style>