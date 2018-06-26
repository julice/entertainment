var postsdataAll = require('../../../data/post-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postdetail:'',
    isplaying:false,
    musicsrc:'/images/music/music-start.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globaldata = app.globalData;
    var postid = options.id
    this.data.postid = postid
    var postsdata = postsdataAll.postcontent[postid]
    // this.data.postdetail = postsdata
    this.setData({
      postdetail: postsdata
    })
    // var postcollected = {
    //   1:"false",
    //   2:"true",
    //   3:"false"
    // },
    // wx.clearStorageSync('posts_collected')
    var postscollected = wx.getStorageSync('posts_collected')
    if(postscollected){
      var postcollect = postscollected[postid]
      this.setData({
        collected: postcollect
      })
    }
    else{
      var postscollected = {}
      postscollected[postid]=false
      wx.setStorageSync('posts_collected', postscollected)
    }
    if (app.globalData.g_isplaying && app.globalData.g_currentpostid===postid){
      this.setData({
        isplaying: true
      })
    }

    this.setMusic()
  

  },

  setMusic:function(){
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isplaying: true
      })
      app.globalData.g_isplaying=true
      app.globalData.g_currentpostid = that.data.postid
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isplaying: false
      })
      app.globalData.g_isplaying=false
      app.globalData.g_currentpostid = null
    })
  },

  // collectiontap:function(event){
  //   var postscollected = wx.getStorageSync('posts_collected');
  //   var postcollected = postscollected[this.data.postid]
  //   console.log('postcollected' + postcollected)
  //   postcollected = !postcollected
  //   postscollected[this.data.postid] = postcollected
  //   this.showToast(postscollected, postcollected)
  //   // this.showModal(postscollected, postcollected)
    
    
  // },
  collectiontap:function(){
    var that = this
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postscollected = wx.getStorageSync('posts_collected');
        var postcollected = postscollected[that.data.postid]
        postcollected = !postcollected
        postscollected[that.data.postid] = postcollected
        that.showToast(postscollected, postcollected)
        // this.showModal(postscollected, postcollected)
      },
    })
  },
  showToast: function (postscollected, postcollected){
    wx.setStorageSync('posts_collected', postscollected)
    this.setData({
      collected: postcollected
    })
    wx.showToast({
      title: postcollected?'收藏成功':'取消收藏',
      duration:1000,
      icon:'success'
    })
  },
  showModal: function (postscollected, postcollected){
    var that = this;
    wx.showModal({
      title: postcollected ? '收藏' : '取消收藏',
      content: postcollected ? '收藏该文章？' : '取消收藏该文章？',
      cancelText: '取消',
      confirmText: '确定',
      cancelColor: '#f00',
      confirmColor: '#405f80',
      success:function(res){
        
        if(res.confirm){
          wx.setStorageSync('posts_collected', postscollected)
          that.setData({
            collected: postcollected
          })
        }
      }
    })
  },
  showAction:function(){
    var itemlist = ['分享给微信好友', '分享给qq好友', '分享到朋友圈']
    wx.showActionSheet({
      itemList: itemlist,
      itemColor: '#405f80',
      success: function (res) {
        wx.showModal({
          title: '用户分享',
          content: '用户分享到' + itemlist[res.tapIndex],
        })
       },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onmusictap:function(){
    var postsdata = postsdataAll.postcontent[this.data.postid]
    var isplay = this.data.isplaying;
    if(isplay){
      wx.pauseBackgroundAudio()
      this.setData({
        isplaying:false
      })
    }
    else {
      this.setData({
        isplaying: true
      })
      wx.playBackgroundAudio({
        dataUrl: postsdata.music.url,
        title: postsdata.music.title,
        coverImgUrl: postsdata.music.coverImg,
        success: function () {
          console.log("ok")
        }
      })
    }
  },


  sharetap:function(){
    this.showAction()
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