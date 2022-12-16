// pages/basics/record/record.js
const app = getApp();
const db=wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },
    upload(){
        wx.navigateTo({
          url: '/pages/basics/record/upload/upload',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    getList(){
        db.collection("record").get().then(res=>{
            var arr=res.data;
            arr.forEach(i=>{
                i.time=i.time.substr(0,24);
                i.isLiked=false;
            })
            this.setData({
                list:arr
            })
        })
    },
    like(e){
        let index = e.currentTarget.dataset.index;
        var newlist=this.data.list;
        var id=newlist[index]._id;
        var likes1=newlist[index].likes+1;
        var likes2=newlist[index].likes-1;
        if(newlist[index].isLiked==false)
        {
            newlist[index].likes++;
            newlist[index].isLiked=true;
            this.setData({
                list:newlist
            })
            db.collection('record').doc(id).update({
                data:{
                    likes:likes1
                }
            })
        }
        else
        {
            newlist[index].likes--;
            newlist[index].isLiked=false;
            this.setData({
                list:newlist
            })
            db.collection('record').doc(id).update({
                data:{
                    likes:likes2
                }
            })
        }
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
        this.getList()
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