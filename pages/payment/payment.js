// pages/payment/payment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: [],
        showCoupons: false,
        payGoodsArr: [],
        totalMoney: '',
        saveMoney: '',
        finaMoney: '',
        defaultAddress: {},
        default: true,
    },
    toShipAddress() {
        wx.navigateTo({
            url: `/pages/shipAddress/shipAddress?address_id=${this.data.defaultAddress.address_id}`
        })
    },
    coupons() {
        this.setData({
            showCoupons: true
        })
    },
    showcoupons() {
        this.setData({
            showCoupons: false
        })
    },
    newTest(e) {
        console.log(e.detail.value);
        this.setData({
            saveMoney: e.detail.value,
            showCoupons: false,
        })
    },
    leave(e) {
        if (this.data.saveMoney == '') {
            this.setData({
                finaMoney: this.data.totalMoney
            })
        } else {
            this.setData({
                finaMoney: (parseFloat(this.data.totalMoney) - parseFloat(this.data.saveMoney)).toFixed(2)
            })
        }
    },
    createOrder() {
        // wx.navigateTo({
        //   url: '/pages/createOrder/createOrder',
        // })
        let token = wx.getStorageSync('info').token
        let arr = []
        this.data.payGoodsArr.forEach((item) =>{
            console.log(item);
            arr.push(item.shopping_car_id)
        })
        console.log(arr);
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/generateOrder',
            method: 'POST',
            data: {
                token: token,
                address_id: this.data.defaultAddress.address_id,
                money: this.data.finaMoney,
                shopping_car_ids: arr,
                coupon_money:this.data.saveMoney
            },
            success: (res) => {
                console.log(res);
                wx.navigateTo({
                  url: `/pages/createOrder/createOrder?data=${JSON.stringify(res.data.data)}&money=${this.data.finaMoney}`,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let token = wx.getStorageSync('info').token
        this.setData({
            payGoodsArr: wx.getStorageSync('payGoodsArr'),
            totalMoney: options.totalMoney,
            finaMoney: options.totalMoney,
        })
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userCouponList',
            data: {
                token: token
            },
            success: (res) => {
                res.data.data.forEach((item) => {
                    item.disabled = false
                    if (parseFloat(item.achieve) > parseFloat(this.data.totalMoney)) {
                        item.disabled = true
                    }
                })
                this.setData({
                    coupons: res.data.data
                })
                console.log(this.data.coupons);
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let token = wx.getStorageSync('info').token
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
            data: {
                token: token
            },
            success: (res) => {
                // console.log(res);
                res.data.data.forEach((item) => {
                    if (item.default == 1) {
                        this.setData({
                            defaultAddress: item,
                            default: true
                        })
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let address = wx.getStorageSync('address')
        if (address.default == 0) {
            this.data.default = false
        } else {
            this.data.default = true
        }
        this.setData({
            defaultAddress: address,
            default: this.data.default
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