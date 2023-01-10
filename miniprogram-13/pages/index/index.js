// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    currentIndex:0,
    banner_arr:[],
    list_arr:[]
  },
  swiperChange(e){
    // console.log(e,"轮播触发");
    this.setData({
      currentIndex:e.detail.current
    })
  },
  indexDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Detail/Detail?itemId='+e.currentTarget.dataset.id,
    })
  },
  // 事件处理函数
  bindViewTap() {
    
  },
  onLoad() {
    var that=this;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/banner',
      success:function(res){
        if(res.data.status==200){
        // console.log(res.data);
        that.setData({
          banner_arr:res.data.data
        })
        }
      }
    }),
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '数据加载成功',
        })
        if(res.data.status==200){
          console.log(res);
          that.setData({
            list_arr:res.data.data
          })
        }
      }
    })
    wx.getUserProfile({
      success:(data)=>{
        console.log(data);
        this.setData({
          userInfo:data.userInfo
        })
      },
      fail:()=>{
        console.log("获取用户数据失败");
      }
      
    })
    
  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
