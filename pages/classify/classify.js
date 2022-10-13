// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftBar: [],
        rightBar: [],
        currentIndexNav: 0,
        arr: []
    },
    currentTabs(e) {
        console.log(e);
        this.setData({
            rightBar: e.currentTarget.dataset.child,
            currentIndexNav: e.currentTarget.dataset.index
        })
    },
    naviTo(e) {
        wx.navigateTo({
            url: `/pages/classifyDetail/classifyDetail?good_type_id=${e.currentTarget.dataset.goodtypeid}`,
            success(res) {
                console.log(res);
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    changeData(temp) {
        let newArr = []
        for (let i = 0; i < this.data.arr.length; i++) {
            if (this.data.arr[i].parent_id == temp) {
                newArr.push(this.data.arr[i])
                this.data.arr[i].children = this.changeData(this.data.arr[i].good_type_id)
            }
        }
        return newArr
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/goodType',
            success: (res) => {
                // console.log(res);
                this.data.arr = res.data.data
                this.setData({
                    leftBar: this.changeData(0),
                })
                console.log(this.data.leftBar);
                this.setData({
                    rightBar: this.data.leftBar[0].children
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