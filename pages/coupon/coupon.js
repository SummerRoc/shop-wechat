// pages/coupon/coupon.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: [],
        myCoupons: [],
        show: true,
    },
    getCoupon() {
        this.setData({
            show: false
        })
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/couponList',
            success: (res) => {
                // console.log(res);
                this.data.coupons = res.data.data.filter((item) => parseFloat(item.achieve) >= parseFloat(item.reduce))
                // let newArr = this.data.coupons.filter((item) =>{
                //     return this.data.myCoupons.every((items) =>{
                //         return item.coupon_id !== items.coupon_id
                //     })
                // })
                // console.log(newArr);
                // newArr.forEach((item) => {
                //     item.operate = '领取'
                // })
                this.data.coupons.forEach((item) => {
                    item.operate = '领取'
                })
                this.data.coupons.forEach((item)=>{
                    this.data.myCoupons.forEach((items) =>{
                        if(item.coupon_id == items.coupon_id){
                            console.log(item);
                            item.operate = '已领取'
                        } 
                    })
                })
                this.setData({
                    coupons:this.data.coupons
                })
            },
            fail(err) {
                console.log(err);
            }
        })
    },

    myCoupon() {
        let token = wx.getStorageSync('info').token
        this.setData({
            show: true
        })
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userCouponList',
            data: {
                token: token
            },
            success: (res) => {
                console.log(res);
                this.setData({
                    myCoupons: res.data.data
                })
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    receiveCoupon(e) {
        let token = wx.getStorageSync('info').token
        let coupon_id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userCouponAdd',
            data: {
                token: token,
                coupon_id: coupon_id
            },
            success: (res) => {
                console.log(res);
                wx.showToast({
                    title: '领取成功',
                })
                this.data.coupons[index].operate = '已领取'
                this.setData({
                    coupons: this.data.coupons
                })
                wx.setStorageSync('coupons', this.data.coupons)
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
        this.myCoupon()
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