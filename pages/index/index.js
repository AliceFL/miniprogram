// pages/home/marquee/marquee.js
Page({
  data: {
    text: '恭喜1676568686237成功领取25元红包',
    marqueePace: 1,//滚动速度
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin:60,
    size: 12,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    showInterModal: false,//是否参加弹出框
    showOnfoucsModal: false,//是否显示关注弹出框
    showOrderModal: false,//是否下单弹出框
    showActivationModal: false,//是否激活弹出框
    showRechargeModal: false,//是否充值弹出框
    showMoneyModal:false//邀好友弹出框
  }, 
  // 参加事件
  onInter: function () {
    // this.hideModal();
    this.setData({
      showInterModal: false,
      showOnfoucsModal: true
    });
  },

  onShow: function () {
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run2();// 第一个字消失后立即从右边出现
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  }
})