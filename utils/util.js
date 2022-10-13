const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function getProfile(){
  return new Promise((resolve,reject)=>{
     wx.getUserProfile({
       desc: "授权登陆",
       success(res){
           resolve(res)
       }})
   })
 }
 function getCode(){
   return new Promise((resolve,reject)=>{
     wx.login({
       success(res){
         resolve(res)
       }})
   })
 }
 function axios (option){
   return new Promise((resolve,reject)=>{
     wx.request({
      ...option,
       success(res){
         resolve(res)
       }})
   })
 }
module.exports = {
  formatTime,getProfile,getCode,axios
}
