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
        historylist:[],
        inglist:{},
        nextindex:0,
        myplace:"",
        newCardCode:"",
        showing:false,
        userAvatarUrl:""
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
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: mythis.data.historylist[index] })
          }
        })
    },
    del(){
      var id=this.data.inglist._id
      wx.showModal({
        title:'确定要放弃吗'
      }).then(res=>{
          if(res.confirm==true)
          {
              db.collection("exercise").doc(id).remove(res=>{
                  console.log(res);
              })
          }
      }).then(res=>{
         mythis.onLoad()
      })
    },
    getlist(){
        db.collection("exercise").where({
          finish:false
        }).get({
          success: function(res) {
            if(res.data.length==0)
            {
              mythis.setData({
                showing:false
              })
            }
            else{
            var inglist=res.data[0]
            var begin=inglist.begtime.split(' ');
            inglist.begtime=begin[4];
            inglist.begindate=begin[3]+' '+begin[1]+' '+begin[2]
            var arr=inglist.list;
            arr.forEach(i=>{
              if(i.time)
              {
                var t=i.time.split(' ');
                i.time=t[4];
              }
            })
           mythis.setData({
             inglist:inglist,
             nextindex:inglist.nextindex,
             showing:true
           })
            }
            
          },
        })
        db.collection("exercise").where({
          finish:true
        }).get({
          success:function(res){
            var historylist=res.data
            historylist.forEach(i=>{
              var begin=i.begtime.split(' ');
              var end=i.list[i.list.length-1].time.split(' ');
              i.endtime=end[4];
              i.begintime=begin[4];
              i.begindate=begin[3]+' '+begin[1]+' '+begin[2]
            })
            mythis.setData({
              historylist:historylist
            })
          }
        })
    },
    sign(){
        var nextindex=this.data.nextindex
        var nextindex_=nextindex+1
        var name=this.data.inglist.list[nextindex].name
        var now='list.'+nextindex
        if(nextindex_==this.data.inglist.list.length)
        {
          db.collection("exercise").where({
            finish:false,
            [now]:{
                name:name
            }
        })
        .update({
            data:{
              finish:true,
              endtime:Date(),
                [now]:{
                    gone:true,
                    time:Date(),
                },
                nextindex:nextindex_
            }
        }).then(res=>{
            console.log(res);
            wx.showModal({
              title:'签到成功'
            }).then(res=>{
              mythis.onLoad()
            })
        })
        }
      else{
        db.collection("exercise").where({
          finish:false,
          [now]:{
              name:name
          }
      })
      .update({
          data:{
             
              [now]:{
                  gone:true,
                  time:Date(),
              },
              nextindex:nextindex_
          }
      }).then(res=>{
          console.log(res);
          wx.showModal({
            title:'签到成功'
          }).then(res=>{
            mythis.onLoad()
          })
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
      mythis=this;
      mythis.setData({
        userAvatarUrl:app.globalData.userAvatarUrl
      })
      mythis.getlist()
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
       mythis=this;
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