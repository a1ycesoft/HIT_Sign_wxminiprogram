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
        this.getlist()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    getlist(){
        mythis = this;
        var now=Date.parse(Date())
        var trueName=app.globalData.trueName
        db.collection("find").where({
            _openid:app.globalData.openid
        }).get().then(res=>{
            var arr=res.data;
            arr.forEach(i=>{
                i.time=i.time.substr(0,24);
            })
            this.setData({
                list:arr
            })
        })
    },
    onShow: function () {
     
    },
    del(e){
        let index = e.currentTarget.dataset.index;
        var id=this.data.list[index]._id;
        var delimg=this.data.list[index].imgCloudList;
        wx.showModal({
          title:'确定要删除吗'
        }).then(res=>{
            if(res.confirm==true)
            {
                db.collection("find").doc(id).remove(res=>{
                    console.log(res);
                }).then(res=>{
                    wx.cloud.deleteFile({
                        fileList: delimg
                      }).then(res => {
                        // handle success
                        console.log(res.fileList)
                      }).catch(error => {
                        // handle error
                        console.log(error);
                      })
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