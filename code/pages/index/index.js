const app=getApp()
const db=wx.cloud.database();
var mythis=null;
Page({
  data: {
    PageCur: 'basics',
    userName:"",
    userAvatarUrl:"",
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShow(){
    mythis=this;
    this.getOpenid();
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      var openid = res.result.openid;
      app.globalData.openid=openid;
      that.setData({
       openid: openid
      })
     }
    })
    db.collection('userInfo').where({
      _openid: this.data.openid,
    })
    .get({
      success: function(res) {

        if(res.data.length!==0)
        {
          app.globalData.trueName=res.data[0].trueName;
          app.globalData.studentNumber=res.data[0].studentNumber;
          app.globalData.phone=res.data[0].phone;
          app.globalData.QQ=res.data[0].QQ;
          app.globalData.userName=res.data[0].userName;
          app.globalData.userAvatarUrl=res.data[0].userAvatarUrl;
          app.globalData.class=res.data[0].class;
          app.globalData.hasUserInfo=true;
          mythis.setData({
            userName:app.globalData.userName,
            userAvatarUrl:app.globalData.userAvatarUrl
          })
        }
        else
        {
          wx.showModal({
            title: '您还没有预设信息',
            content:'请前往 我的>>我的信息 里进行设置',
            confirmText:'好的',
            showCancel:false
          }).then(res=>{
           
              wx.navigateTo({
                url: '/pages/about/about/about',
              })
            
          })
        }
      }
    })
   },
})
