// components/sift2/sift2.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        position: 'top',
        style1: '',
        showPanel1: false,
        showPanel2: false,
        arr12: ['有货优先', '货到付款', '211限时达', '京东国际', 'PLUS专享', '促销商品', '配送全球'],
        showView: false,
        arr1: ['京东物流', '有货优先', '货到付款', '211限时达', '新品', '京东国际', 'PLUS专享', '促销商品', '配送全球', '拍拍二手'],
        arr2: ['海尔（Haier）', '奥克斯（AU...', '小米（MI）', 'TCL', '海信（Hisen...', '华凌', '科龙（KELO...', '长虹（CHA...'],
        arr3: ['2.5匹', '1匹', '1.5匹', '2匹', '3匹', '4匹', '5匹及以上'],
        arr4: ['一级能效', '二级能效', '三级能效', '四级能效', '五级能效'],
        arr5: ['除PM2.5', '无', '除甲醛', '抗菌', '除菌', 'VP-过滤网', '阴离子抗菌...'],
        arr6: ['智能调节', '无风感', '自清洁', '静音设计', '独立除湿', '可拆洗'],
        arr7: ['空调套装', '京品空调', '净化除菌', '0元安装', '新风空调', '舒适风']
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showMenu1() {
            this.setData({
                showPanel1: !this.data.showPanel1,
                showPanel2: false
            })
        },
        showMenu2() {
            this.setData({
                showPanel2: !this.data.showPanel2,
                showPanel1: false
            })
        },
        test() {
            this.setData({
                showPanel1: false,
                showPanel2: false,
                showView: false,
                position: 'top',
                style1: ''
            })
        },
        showSift() {
            this.setData({
                position: 'right',
                style1: 'margin-left:10%; background:rgb(247,247,247)',
                showView: true
            })
        },
        toBrand(){
          wx.navigateTo({
            url: '/pages/cellPhone/cellPhone',
          })
        }
    },
})