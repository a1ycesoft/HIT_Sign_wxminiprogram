// pages/basics/initiate/initiate.js
const app=getApp()
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: "",
    begintime: '12:01',
    begindate: '2022-05-20',
    endtime: '13:01',
    enddate: '2022-05-20',
    aclass: '',
    classlist: [],
    placeindex: null,
    placepicker: ['体育场', 'M楼', 'N楼'],
  },
  submit() {
    if (this.data.admin !== "" && this.data.classlist.length !== 0 && this.data.placeindex !== null) {
      var beg=Date.parse(this.data.begindate+' '+this.data.begintime+':00')
      var end=Date.parse(this.data.enddate+' '+this.data.endtime+':00')
      db.collection("initiate").add({
        data: {
          admin: this.data.admin,
          avatar:app.globalData.userAvatarUrl,
          place: this.data.placepicker[this.data.placeindex],
          beg:beg,
          begindate:this.data.begindate,
          begintime:this.data.begintime,
          end:end,
          enddate:this.data.enddate,
          endtime:this.data.endtime,
          classlist: this.data.classlist
        }
      }).then(res => {
        let id = res._id;
        db.collection("userInfo").where({
          class: _.in(this.data.classlist)
        }).get().then(res => {
          var involve = res.data
          var signInfo = {}
          involve.forEach(i => {
            signInfo[i.trueName]=false;
          });
          db.collection("initiate").doc(id).update({
            data: {
              signInfo: signInfo
            }
          }).then(res => {
            wx.showModal({
              title:'提交成功',
              confirmText:'好的',
              showCancel:false
            }).then(res=>{
              wx.navigateBack({
                delta: 1,
              })
            })
          })
        })
      })

    }
    else 
    {
      wx.showToast({
        title: '请检查输入',
        icon:'error'
      })
    }
  },
  inputadmin() {},
  addclass() {
    if (this.data.aclass !== '') {
      var newlist = this.data.classlist;
      newlist.push(this.data.aclass);
      this.setData({
        classlist: newlist,
        aclass: ''
      })
    }
  },
  delclass(e) {
    let index = e.currentTarget.dataset.index;
    var newclasslist = this.data.classlist;
    newclasslist.splice(index, 1);
    this.setData({
      classlist: newclasslist
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      placeindex: e.detail.value
    })
  },
  beginTimeChange(e) {
    this.setData({
      begintime: e.detail.value
    })
  },
  endTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  beginDateChange(e) {
    this.setData({
      begindate: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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