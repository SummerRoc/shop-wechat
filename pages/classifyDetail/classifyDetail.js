// pages/classifyDetail/classifyDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: []
    },
    goodInfo(e){
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/goodInfo',
            data:{
                good_id: e.currentTarget.dataset.goodid
            },
            success: (res) => {
                console.log(res);
                wx.setStorageSync('goodInfo', res.data.data)
                wx.navigateTo({
                  url: '/pages/goodsDetail/goodsDetail',
                })
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/goodList',
            method: 'POST',
            data: {
                page: '1',
                size: '20'
            },
            success: (res) => {
                // console.log(res);
                this.setData({
                    goodsList: res.data.data.data
                })
                console.log(this.data.goodsList);
            },
            fail: (err) => {
                console.log(err);
            }
        })
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