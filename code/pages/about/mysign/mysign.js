// pages/about/mysign/mysign.js
const db=wx.cloud.database();
const _ = db.command;
const app=getApp();
let mythis=null
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
    onLoad: function (options) {
        mythis=this;
        mythis.getlist()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    view(e){
        let index = e.currentTarget.dataset.index;
        wx.navigateTo({
          url: './viewdata/viewdata',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function() {
            },
          },
          success: function(res) {
            // 通过 eventChannel 向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: mythis.data.list[index]})
          }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    getlist(){
        mythis = this;
        var now=Date.parse(Date())
        var trueName=app.globalData.trueName
        db.collection("initiate").where({
            _openid:app.globalData.openid
        }).get({
            success: function(res){
                var afterlist=res.data;
                afterlist.forEach(i=>{
                    if(now>i.end)
                    {
                        i.isfinish=true
                    }
                    else
                    {
                        i.isfinish=false
                    }
                })
                mythis.setData({
                    list:afterlist,
                })
            }
        })
          
       
    },
    onShow: function () {
     
    },
    del(e){
        let index = e.currentTarget.dataset.index;
        var id=this.data.list[index]._id;
        wx.showModal({
          title:'确定要删除吗'
        }).then(res=>{
            if(res.confirm==true)
            {
                db.collection("initiate").doc(id).remove(res=>{
                    console.log(res);
                })
            }
        }).then(res=>{
           mythis.onLoad()
        })
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