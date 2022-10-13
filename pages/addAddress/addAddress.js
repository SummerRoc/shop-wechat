// pages/addAddress/addAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        region: [],
        region_code: []
    },
    bindRegionChange: function (e) {
        console.log(e.detail.value)
        console.log(e.detail.code)
        this.setData({
            region: e.detail.value,
            region_code: e.detail.code,
            value3: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
        })
    },
    ibinput(e) {
        let item = e.currentTarget.dataset.myvalue;
        this.setData({
            [item]: e.detail.value,
        })
    },
    addAddress() {
        let token = wx.getStorageSync('info').token
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
            data: {
                token: token,
                phone: this.data.value2,
                name: this.data.value1,
                detailed: this.data.value4,
                procince: this.data.region[0],
                city: this.data.region[1],
                area: this.data.region[2],
            },
            success: (res) => {
                console.log(res);
                wx.showToast({
                  title: '新增成功',
                })
                wx.navigateBack()
            }
        })
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