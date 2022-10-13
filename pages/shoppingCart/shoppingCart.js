// pages/shoppingCart/shoppingCart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalMoney: '0.00',
        totalCount: 0,
        selectAll: false,
        testArr: [],
        isItemCheckd: true
    },
    toPayMent() {
        let payGoodsArr = this.data.testArr.filter((item) => item.isChecked)
        wx.setStorageSync('payGoodsArr', payGoodsArr)
        wx.navigateTo({
            url: `/pages/payment/payment?totalMoney=${this.data.totalMoney}`
        })
    },
    selectAll() {
        let totalMoney = parseFloat(this.data.totalMoney)
        totalMoney = 0
        this.data.totalCount = 0
        if (this.data.selectAll) {
            console.log(1);
            this.data.testArr.forEach((item) => {
                // totalMoney -= Number(item.price) * item.count
                // this.data.totalCount -= item.count
                item.isChecked = false
            })
        } else {
            console.log(2);
            this.data.testArr.forEach((item) => {
                totalMoney += parseFloat(item.price) * Number(item.num)
                this.data.totalCount += Number(item.num)
                item.isChecked = true
            })
        }
        if (this.data.totalCount != 0) {
            this.setData({
                isItemCheckd: false
            })
        } else {
            this.setData({
                isItemCheckd: true
            })
        }
        this.setData({
            totalMoney: String(totalMoney.toFixed(2)),
            testArr: this.data.testArr,
            totalCount: this.data.totalCount,
            selectAll: !this.data.selectAll
        })
    },
    select(e) {
        let index = e.currentTarget.dataset.index
        let totalMoney = parseFloat(this.data.totalMoney)
        let ownMoney = totalMoney
        this.data.testArr[index].isChecked = !this.data.testArr[index].isChecked
        if (this.data.testArr[index].isChecked) {
            console.log(1);
            // totalMoney += Number(this.data.testArr[index].price)
            ownMoney += parseFloat(this.data.testArr[index].price) * Number(this.data.testArr[index].num)
            totalMoney = ownMoney
            this.data.totalCount += Number(this.data.testArr[index].num)
        } else {
            console.log(2);
            // totalMoney -= Number(this.data.testArr[index].price)
            ownMoney -= parseFloat(this.data.testArr[index].price) * Number(this.data.testArr[index].num)
            totalMoney = ownMoney
            this.data.totalCount -= Number(this.data.testArr[index].num)
        }
        if (this.data.totalCount != 0) {
            this.setData({
                isItemCheckd: false
            })
        } else {
            this.setData({
                isItemCheckd: true
            })
        }
        let arr = this.data.testArr.filter((item) => item.isChecked)
        if (arr.length == this.data.testArr.length) {
            this.data.selectAll = true
        } else {
            this.data.selectAll = false
        }
        this.setData({
            totalMoney: String(totalMoney.toFixed(2)),
            totalCount: this.data.totalCount,
            testArr: this.data.testArr,
            selectAll: this.data.selectAll
        })
    },
    subCount(e) {
        let index = e.currentTarget.dataset.index
        let totalMoney = parseFloat(this.data.totalMoney)
        let ownMoney = totalMoney
        this.data.testArr[index].num = Number(this.data.testArr[index].num)
        this.data.testArr[index].num--
        if (this.data.testArr[index].isChecked) {
            // totalMoney -= Number(this.data.testArr[index].price)
            ownMoney -= parseFloat(this.data.testArr[index].price)
            totalMoney = ownMoney
            this.data.totalCount--
        }
        this.setData({
            totalMoney: String(totalMoney.toFixed(2)),
            totalCount: this.data.totalCount,
            testArr: this.data.testArr
        })
    },
    addCount(e) {
        let index = e.currentTarget.dataset.index
        let totalMoney = parseFloat(this.data.totalMoney)
        let ownMoney = totalMoney
        this.data.testArr[index].num = Number(this.data.testArr[index].num)
        this.data.testArr[index].num++
        if (this.data.testArr[index].isChecked) {
            // totalMoney += Number(this.data.testArr[index].price)
            ownMoney += parseFloat(this.data.testArr[index].price)
            totalMoney = ownMoney
            this.data.totalCount++
        }
        console.log(ownMoney);
        this.setData({
            totalMoney: String(totalMoney.toFixed(2)),
            totalCount: this.data.totalCount,
            testArr: this.data.testArr
        })
    },
    inputCount(e) {
        console.log(e);
        this.setData({
            count: e.detail.value
        })
    },
    deleteShop(e) {
        let token = wx.getStorageSync('info').token
        let shopping_car_id = e.currentTarget.dataset.shopcarid
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
            data: {
                token: token,
                shopping_car_id: shopping_car_id
            },
            success: (res) => {
                console.log(res);
                wx.showToast({
                    title: '删除成功',
                })
                this.onLoad()
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    aNewTest(e) {
        console.log(e.currentTarget.dataset.item);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let token = wx.getStorageSync('info').token
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
            data: {
                token: token,
            },
            success: (res) => {
                console.log(res);
                res.data.data.data.forEach((item) => {
                    item.isChecked = false
                    item.sku = JSON.parse(item.sku)
                })
                this.setData({
                    testArr: res.data.data.data
                })
            },
            fail(err) {
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