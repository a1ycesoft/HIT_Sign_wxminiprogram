const app = getApp();
const db=wx.cloud.database();
var mythis=null;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    trueName:"",
    studentNumber:"",
    phone:"",
    QQ:"",
    userName:"",
    userAvatarUrl:"",
    openid:"",
    class:""
  },
  onLoad(){
    mythis=this;
    this.setData({
      trueName:app.globalData.trueName,
      studentNumber:app.globalData.studentNumber,
      phone:app.globalData.phone,
      QQ:app.globalData.QQ,
      userName:app.globalData.userName,
      userAvatarUrl:app.globalData.userAvatarUrl,
      openid:app.globalData.openid,
      class:app.globalData.class
    })
   },
  pageBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userName: res.userInfo.nickName,
          userAvatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },
  submit(){
    if(this.data.trueName!==""&&this.data.studentNumber!==""&&this.data.phone!==""&&this.data.QQ!==""&&this.data.userName!==""&&this.data.userAvatarUrl!==""&&this.data.class!=="")
    {
      if(app.globalData.hasUserInfo==false)
      {
        db.collection('userInfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            trueName:this.data.trueName,
            studentNumber:this.data.studentNumber,
            phone:this.data.phone,
            QQ:this.data.QQ,
            userName:this.data.userName,
            userAvatarUrl:this.data.userAvatarUrl,
            class:this.data.class
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.showToast({
              title:"提交成功",
              icon:'success',
              duration: 1500,//提示的延迟时间，单位毫秒，默认：1500 
              mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
            })
          }
        })
      }
      else
      {
        db.collection('userInfo').where({
          _openid:this.data.openid
        }).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            trueName:this.data.trueName,
            studentNumber:this.data.studentNumber,
            phone:this.data.phone,
            QQ:this.data.QQ,
            userName:this.data.userName,
            userAvatarUrl:this.data.userAvatarUrl,
            class:this.data.class
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.showToast({
              title:"提交成功",
              icon:'success',
              duration: 1500,//提示的延迟时间，单位毫秒，默认：1500 
              mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
            })
          }
        })
      }
      mythis.pageBack()
    }
    else
    {
      wx.showToast({
        title:"请完善您的输入",
        icon:'error',
        duration: 1500,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
      })
    }
  },
});
