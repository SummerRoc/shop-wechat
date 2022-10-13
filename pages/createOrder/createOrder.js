// pages/createOrder/createOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        money: '',
        data: {}
    },
    payment() {
        wx.requestPayment({
            nonceStr: this.data.data.nonce_str,
            package: `prepay_id=${this.data.data.prepay_id}`,
            paySign: this.data.data.paySign,
            timeStamp: this.data.data.timeStamp,
            signType: 'MD5',
            success: (res) =>{
                console.log(res);
                wx.showToast({
                  title: '支付成功',
                })
                wx.navigateTo({
                  url: '/pages/orders/orders',
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            money: options.money,
            data: JSON.parse(options.data)
        })
        console.log(this.data.data);
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