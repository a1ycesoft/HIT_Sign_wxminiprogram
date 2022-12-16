const app=getApp();
const db=wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        imgCloudList:[],
        desc:"",
        time:"",
        place:"",
        name:"",
        userName:"",
        userAvatarUrl:"",
        QQ:"",
        phone:""
    },
    submit(){
      if(this.data.imgList.length>0&&this.data.name!==""&&this.data.place!==""&&this.data.desc!=="")
      {
        var imgCloudList=[];
            this.data.imgList.forEach((item,index)=>{
                wx.cloud.uploadFile({
                    cloudPath: 'find/'+Date.now()+index+'.png',
                    filePath: item, 
                  }).then(res => {
                    console.log(res.fileID)
                    imgCloudList.push(res.fileID)
                  }).then(res=>{
                    if(imgCloudList.length==this.data.imgList.length)
                    {
                        db.collection("find").add({
                            data:{
                             imgCloudList:imgCloudList,
                             name:this.data.name,
                             desc:this.data.desc,
                             place:this.data.place,
                             userName:this.data.userName,
                             userAvatarUrl:this.data.userAvatarUrl,
                             QQ:this.data.QQ,
                             phone:this.data.phone,
                             time:Date()
                            }
                          })
                          .then(res=>{
                            wx.showModal({
                              title:'提交成功',
                              confirmText:'好的',
                              showCancel:false
                            })
                            .then(res=>{
                                wx.navigateBack({
                                  delta: 1,
                                })
                              })
                          })
                         
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  })
            }) 
      }
            else{
              wx.showToast({
                title: '输入不能为空',
                icon:'error'
              })
            }
    },
    ChooseImage() {
        wx.chooseImage({
          count: 4, //默认9
          sizeType: 'compressed', //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album','camera'], //从相册选择
          success: (res) => {
            if (this.data.imgList.length != 0) {
              this.setData({
                imgList: this.data.imgList.concat(res.tempFilePaths)
              })
            } else {
              this.setData({
                imgList: res.tempFilePaths
              })
            }
          }
        });
      },
      ViewImage(e) {
        wx.previewImage({
          urls: this.data.imgList,
          current: e.currentTarget.dataset.url
        });
      },
      DelImg(e) {
        wx.showModal({
          title: '确定要删除这张照片？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.data.imgList.splice(e.currentTarget.dataset.index, 1);
              this.setData({
                imgList: this.data.imgList
              })
            }
          }
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userName:app.globalData.userName,
            userAvatarUrl:app.globalData.userAvatarUrl,
            QQ:app.globalData.QQ,
            phone:app.globalData.phone
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