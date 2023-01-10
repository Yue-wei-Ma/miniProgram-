// pages/food/food.js
var productType=require('../../utils/productType')
console.log(productType);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:'北京',
    productType:productType,
    list:[],
    num:1,
    isShow:false,
    moreInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //http://iwenwiki.com:3002/api/foods/list?city=%E5%8C%97%E4%BA%AC&page=1
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          console.log(res.data.data);
          this.setData({
            list:this.data.list.concat(res.data.data.result),
            isShow:true
          })
        }else{
          console.log("没有更多的数据了");
          this.setData({
            isShow:false,
            moreInfo:'没有更多的数据了'
          })
        }
      }
    })
  },

  getMore(){
    this.data.num++;
    console.log('请求页面数据：',this.data.num);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.num++;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            list:this.data.list.concat(res.data.data.result),
          })
        }else{
          this,setData({
            moreInfo:'没有更多的数据了'
        })
      }
    }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})