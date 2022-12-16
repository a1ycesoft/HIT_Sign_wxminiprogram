// pages/about/myexercise/viewdata/viewdata.js
let mythis=null
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:[],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option){
      mythis=this;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
      // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        console.log(data.data);
        var obj=data.data.signInfo
        var arr=[]
        Object.keys(obj).forEach(function (key) {
            if(obj[key]==false)
            {
                arr.push(key);
            }
        });
        mythis.setData({
            list:arr,
            begdate:data.data.begindate,
            enddate:data.data.enddate,
            begtime:data.data.begintime,
            endtime:data.data.endtime,
            userName:app.globalData.userName,
            place:data.data.place
        })
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})