import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export default defineStore("TaskStore", () => {
    let tasks = reactive({})
    // {
    //     sid:{
    //         name:String
    //         retObjAnswers:String 服务器返回的选择答案
    //         ObjAnswerMap:{
    //             teaId:teaAnswer teaId->answer的Map
    //             ……
    //         }
    //         SubAnswerMap:{
    //             teaId:{
    //                 whose:String,
    //                 images:["url","url",……] 主观答案
    //             }
    //         }
    //         objSubString:String 选择提交字符串
    //         subSubString:String 主观提交字符串

    //     }
    // }
    let subjects = reactive([])
    let token = ref(localStorage.getItem("token") === null ? "" : localStorage.getItem("token"))

    return { tasks, subjects, token }
})