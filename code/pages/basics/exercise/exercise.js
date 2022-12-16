const app=getApp()
const db = wx.cloud.database();
const _ = db.command
Page({
    data: {
        latitude: 37.530091,
        longitude: 122.082934,
        placeindex: 0,
        placepicker: ['我的位置', '体育场', 'M楼', '主楼'],
        exerciselist:[],
        placelist: [
            [{}],
            [{
                id: 1,
                iconPath: '../../../images/location.png',
                latitude: 37.52994,
                longitude: 122.07945,
                width: 19,
                height: 19
            }],
            [{
                id: 2,
                iconPath: '../../../images/location.png',
                latitude: 37.530948,
                longitude: 122.080097,
                width: 19,
                height: 19
            }],
            [{
                id: 3,
                iconPath: '../../../images/location.png',
                latitude: 37.530091,
                longitude: 122.082934,
                width: 19,
                height: 19
            }]
        ],
        markers: [{
        }],
    },
    onLoad(){
      this.check()
    },
    isok(){
      if(this.data.exerciselist.length==0)
        return false;
       var arr=[]
       var j=0;
       for(var i=0;i<this.data.exerciselist.length;i++)
       {
         if(this.data.exerciselist[i]=="我的位置")
          {
            return false
          }
         if(arr.indexOf(this.data.exerciselist[i])==-1)
         {
           arr[j]=this.data.exerciselist[i];
           j++
         }
         else
         {
           return false
         }
       }
       return true
    },
    check(){
      db.collection("exercise").where({
        finish:false
      }).get({
        success:function(res){
          if(res.data.length>0)
          {
            wx.showModal({
              title: '您还有未完成的锻炼计划！',
              showCancel:false
            }).then(res=>{
              wx.navigateTo({
                url: '../../about/myexercise/myexercise',
              })
            })
          }
        }
      })
    },
    submit() {
        if (this.isok()==true) {
          var arr=this.data.exerciselist;
          var list=[]
          arr.forEach((i)=>{
              var obj={
                  name:i,
                  gone:false,
                  time:null
              }
              list.push(obj)
          })
          db.collection("exercise").add({
            data: {
               list:list,
               finish:false,
               nextindex:0,
               begtime:Date()
            }
          }).then(res => {
              console.log(res);
                wx.showModal({
                  title:'提交成功'
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
            title: '请检查输入',
            icon:'error'
          })
        }
      },
    addexercise() {
        if (this.data.aclass !== '') {
          var newlist = this.data.exerciselist;
          newlist.push(this.data.placepicker[this.data.placeindex]);
          this.setData({
            exerciselist: newlist,
          })
        }
      },
      delexercise(e) {
        let index = e.currentTarget.dataset.index;
        var newexerciselist = this.data.exerciselist;
        newexerciselist.splice(index, 1);
        this.setData({
          exerciselist: newexerciselist
        })
      },
    PickerChange(e) {
        console.log(e);
        this.setData({
            placeindex: e.detail.value
        })
    },
    wx_getLocation() {
        var mythis = this;
        if (this.data.placeindex == 0) {
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    mythis.setData({
                        longitude: res.longitude,
                        latitude: res.latitude,
                        markers: [{
                            iconPath: '../../../images/location.png',
                            id: 0,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            width: 19,
                            height: 19
                        }],
                    })
                }
            })
        } else {
            mythis.setData({
                longitude: mythis.data.placelist[mythis.data.placeindex][0].longitude,
                latitude: mythis.data.placelist[mythis.data.placeindex][0].latitude,
                markers: mythis.data.placelist[mythis.data.placeindex]
            })
        }

    }
})