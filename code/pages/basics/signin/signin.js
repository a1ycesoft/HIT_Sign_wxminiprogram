// pages/basics/signin/signin.js
const db=wx.cloud.database();
const _ = db.command;
const app=getApp();
const trans = require('./transform.js')
let mythis=null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        myplace:"",
        newCardCode:""
    },
    sign(){
        if(this.data.myplace!=="")
        {
          var trueName=app.globalData.trueName
          var now=Date.parse(Date())
          db.collection("initiate").where({
              classlist:app.globalData.class,
              beg:_.lt(now),
              end:_.gt(now),
              place:this.data.myplace
          }).update({
              data:{
                 signInfo:{
                     [trueName]:true
                 }
              }
          }).then(res=>{
              console.log(res);
              wx.showModal({
                title:'签到成功',
                confirmText:'好的',
                showCancel:false
              }).then(res=>{
                wx.navigateBack({
                  delta: 1,
                })
              })
          })
        }
        else
        {
          wx.showToast({
            title: '请先扫描标签',
            icon:'error'
          })
        }
    },
    nfcRead() {
        const nfc = wx.getNFCAdapter()

        this.nfc = nfc
        function discoverHandler(res) {
          const data = new Uint8Array(res.messages[0].records[0].payload)
          let str = ""
          data.forEach(e => {
            let item = String.fromCharCode(e);
            str += item
          })
          mythis.setData({
            newCardCode: str,
            myplace:trans.nfctochinese(str)
          })
          wx.showToast({
            title: '读取成功!',
            icon: 'none'
          })
          nfc.stopDiscovery();
        }
    
        nfc.startDiscovery({
          success(res) {
            console.log(res)
            wx.showToast({
              title: 'NFC读取功能已开启！',
              icon: 'none'
            })
            nfc.onDiscovered(discoverHandler)
          },
          fail(err) {
            console.log('failed to discover:', err)
            if (!err.errCode) {
              wx.showToast({
                title: '请检查NFC功能是否正常!',
                icon: 'none'
              })
              return
            }
            switch (err.errCode) {
              case 13000:
                wx.showToast({
                  title: '设备不支持NFC!',
                  icon: 'none'
                })
                break;
              case 13001:
                wx.showToast({
                  title: '系统NFC开关未打开!',
                  icon: 'none'
                })
                break;
              case 13019:
                wx.showToast({
                  title: '用户未授权!',
                  icon: 'none'
                })
                break;
              case 13010:
                wx.showToast({
                  title: '未知错误!',
                  icon: 'none'
                })
                break;
            }
          }
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
        // var d = new Date();
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        mythis = this;
        var now=Date.parse(Date())
        var trueName=app.globalData.trueName
        db.collection("initiate").where({
            classlist:app.globalData.class,
            beg:_.lt(now),
            end:_.gt(now),
            signInfo:{
                [trueName]:false
            }
        }).get().then(res=>{
            this.setData({
                list:res.data,
            })
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