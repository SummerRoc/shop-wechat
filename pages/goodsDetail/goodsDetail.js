// pages/goodsDetail/goodsDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkInfo: {},
        goodInfo: {},
        skuList: {},
        count: 1,
        isShowSKU: false,
        shoppingLength:0
    },
    showSKU() {
        this.setData({
            isShowSKU: true
        })
    },
    clickoverlay() {
        this.setData({
            isShowSKU: false
        })
    },
    subCount() {
        this.setData({
            count: --this.data.count
        })
    },
    addCount() {
        this.setData({
            count: ++this.data.count
        })
    },
    inputCount(e) {
        this.setData({
            count: e.detail.value
        })
    },
    skuBind1(e) {
        let index = e.currentTarget.dataset.index
        let indexs = e.currentTarget.dataset.indexs
        this.data.skuList.sku_column[index].check = indexs
        this.setData({
            skuList: this.data.skuList
        })
        let sku = []
        this.data.skuList.sku_column.forEach(item => {
            sku.push(item.value[item.check])
        })
        this.data.skuList.sku_list.forEach(item => {
            if (item.sku.join() == sku.join()) {
                console.log(item);
                this.setData({
                    checkInfo: item
                })
            }
        })
    },
    openSku() {
        this.setData({
            isShowSKU: true
        })
    },
    addShopCar() {
        if (!wx.getStorageSync('info')) {
            wx.switchTab({
                url: '/pages/my/my',
            })
        } else {
            let token = wx.getStorageSync('info').token
            wx.request({
                url: 'http://api_devs.wanxikeji.cn/api/shoppingCarAddModify',
                data: {
                    token: token,
                    good_id: wx.getStorageSync('goodInfo').good_id,
                    num: this.data.count,
                    price: parseFloat(wx.getStorageSync('goodInfo').price),
                    money: parseFloat(wx.getStorageSync('goodInfo').price) * this.data.count,
                    sku: JSON.stringify(this.data.checkInfo.sku)
                },
                success: (res) => {
                    console.log(res);
                    this.setData({
                        isShowSKU: false,
                        shoppingLength: ++this.data.shoppingLength
                    })
                    wx.showToast({
                        title: '添加成功',
                    })
                },
                fail(err) {
                    console.log(err);
                }
            })
        }
    },
    toShoppingCar() {
        wx.switchTab({
            url: '/pages/shoppingCart/shoppingCart',
            success: function (res) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
                console.log("addAttentionService.add: ")
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let token = wx.getStorageSync('info').token
        console.log(wx.getStorageSync('goodInfo'));
        this.data.skuList = JSON.parse(wx.getStorageSync('goodInfo').info[0].edition)
        this.data.skuList.sku_column.forEach((item) => {
            item.check = 0
        })
        let sku = []
        this.data.skuList.sku_column.forEach(item => {
            sku.push(item.value[item.check])
        })
        this.data.skuList.sku_list.forEach(item => {
            if (item.sku.join() == sku.join()) {
                this.data.checkInfo = item
                console.log(this.data.checkInfo);
            }
        })
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
            data: {
                token: token,
            },
            success: (res) => {
                console.log(res);
                this.setData({
                    shoppingLength: res.data.data.count
                })
            }
        })
        this.setData({
            goodInfo: wx.getStorageSync('goodInfo'),
            skuList: this.data.skuList,
            checkInfo: this.data.checkInfo
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