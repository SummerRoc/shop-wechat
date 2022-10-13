// pages/my/my.js
import {
  getProfile,
  getCode,
  axios
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBtn: true,
    icon: '',
    nick_name: ''
  },
  async getUserInfo() {
    let nick_name = ''
    let icon = ''
    let info = await getProfile()
    nick_name = info.userInfo.nickName
    icon = info.userInfo.avatarUrl
    let login_info = await getCode()
    let openid_session_key = await axios({
      url: 'http://api_devs.wanxikeji.cn/api/codeExchangeOpenid',
      data: {
        code: login_info.code
      }
    })
    wx.setStorageSync('openid', openid_session_key.data.data.openid)
    wx.setStorageSync('session_key', openid_session_key.data.data.session_key)
    if (openid_session_key.data.data.info) {
      wx.setStorageSync('info', openid_session_key.data.data.info)
      wx.showToast({
        title: '登录成功',
      })
      this.onLoad()
    } else {
      let insert = await axios({
        url: 'http://api_devs.wanxikeji.cn/api/register',
        data: {
          openid: wx.getStorageSync('openid'),
          nick_name: nick_name,
          icon: icon
        },
      })
      wx.setStorageSync('info', insert.data.data)
      wx.showToast({
        title: '登录成功',
      })
      this.onLoad()
    }
  },
  toCoupon(){
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  toOrders(){
      wx.navigateTo({
        url: '/pages/orders/orders',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let info = wx.getStorageSync('info')
    if (info) {
      this.setData({
        loginBtn: false,
        icon: info.icon,
        nick_name: info.nick_name
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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