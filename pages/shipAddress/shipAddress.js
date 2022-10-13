// pages/shipAddress/shipAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressArr: [],
        address_id:''
    },
    change(e){
        console.log(e.currentTarget.dataset.item);
        wx.setStorageSync('address', e.currentTarget.dataset.item)
        setTimeout(() => {
            wx.navigateBack()
        }, 500);
    },
    addAddress() {
        wx.navigateTo({
            url: '/pages/addAddress/addAddress',
        })
    },
    toEditAddress(e) {
        wx.navigateTo({
            url: `/pages/editAddress/editAddress?address=${JSON.stringify(e.currentTarget.dataset.item)}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            address_id:options.address_id
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
        let token = wx.getStorageSync('info').token
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
            data: {
                token: token
            },
            success: (res) => {
                console.log(res);
                this.data.addressArr = res.data.data
                this.data.addressArr.forEach((item) =>{
                    item.checked = false
                    if(this.data.address_id == item.address_id){
                        item.checked = true
                    }
                })
                this.setData({
                    addressArr: this.data.addressArr
                })
            }
        })
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