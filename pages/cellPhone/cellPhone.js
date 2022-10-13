// pages/region/region.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        title:"A",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"B",
        children:["百事乐（LEBEST）","8848","BIHEE","碧娟"]
      },
      {
        title:"C",
        children:["CONQUEST","创星"]
      },
      {
        title:"D",
        children:["多亲（QIN）","鼎桥（TD Tech）","朵唯(DOOV)"]
      },
      {
        title:"E",
        children:["21KE"]
      },
      {
        title:"F",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"G",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"H",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"I",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"J",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"K",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"L",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"M",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"N",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"O",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"P",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"Q",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"R",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"S",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"T",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"U",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"V",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"W",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"X",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"Y",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
      {
        title:"Z",
        children:["Apple","苹果（APPLES）","AGM","遨游（AORO）","爱户外（ioutdoor）"]
      },
    ],
    id:"",
    current:   {
      title:"A",
      children:[
        {
          name:"阿克苏"
        },
        {
          name:"阿联酋"
        }
      ]
    },
    node:[],
    timer:null,
    checking:false
  },
  check(e){
    let index =e.currentTarget.dataset.index
    this.data.checking=true
    setTimeout(()=>{
      this.data.checking=false
    },1000)
    this.setData({
      current:this.data.list[index],
      id:"id"+index
    })
  },
  scroll(e){
    if(this.data.checking) return
    if(this.data.timer){
      clearTimeout(this.data.timer)
    }
    this.data.timer=setTimeout(()=>{
      console.log(3333);
      this.data.timer=null
      for(var i=0;i<this.data.node.length-2;i++){
        let scroll_top=e.detail.scrollTop+e.target.offsetTop
        if(this.data.node[i].top<=scroll_top&&this.data.node[i+1].top>scroll_top){
          this.setData({
            current:this.data.list[i],
          })
        }
      }
    },300)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let that=this
   let query= wx.createSelectorQuery();// 
   query.selectAll(".city_item").boundingClientRect(function(rect){
    that.data.node=rect
   }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})