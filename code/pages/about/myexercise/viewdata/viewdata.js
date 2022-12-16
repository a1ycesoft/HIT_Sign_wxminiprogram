// pages/about/myexercise/viewdata/viewdata.js
let mythis=null
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:{}
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
        var arr=data.data
        var total=(Date.parse(arr.begindate+' '+arr.endtime)-Date.parse(arr.begtime))/1000
        var h=Math.floor(total/3600)
        var m=Math.floor(total/60%60)
        var s=total%60
        mythis.setData({
          list:data.data,
          h:h,
          m:m,
          s:s,
          userName:app.globalData.userName,
          userAvatarUrl:app.globalData.userAvatarUrl
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