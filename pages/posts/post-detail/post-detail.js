var postsdataAll = require('../../../data/post-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postdetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id
    var postsdata = postsdataAll.postcontent[postid]
    // this.data.postdetail = postsdata
    this.setData({
      postdetail: postsdata
    })
    
    wx.setStorage({
      key: 'key',
      data: {
        game:'风暴',
        list:'dd'
      },
    }),
    wx.setStorageSync('key2', {maxi:'maxi'})
    wx.setStorageSync('key1', {dd:'ddd'})
  },
  collectiontap:function(event){
    var key = wx.getStorageSync('key');
    // console.log(key)
  },
  sharetap:function(){
    wx.clearStorageSync()
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