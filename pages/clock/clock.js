var intervalT;
var IntervalT;
var context = wx.createCanvasContext('canvass');
var Context = wx.createCanvasContext('Can');
var current_choice=999;
var Current_choice=999;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
      text:'开始刷牙',
      innerText:120,
      _Text:120,
      _text:'开始刷牙',
      selectShow: false,
      selectArray: [{
        "id": "0",
        "text": "自动牙刷"
      }, {
        "id": "1",
        "text": "普通牙刷"
      }],
    poster: 'http://p1.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=130y130',
      name: '刷牙歌',
      author: '宝宝巴士',
      src: 'http://music.163.com/song/media/outer/url?id=566443217.mp3',
  },
    //事件处理函数 点击text
    toast: function() {
      wx.navigateTo({
        url: '../Sign_in/Sign_in'
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },
  
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current

      })
    }
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (){
  //  第一页
    context.setLineWidth(4);
    context.moveTo(180, 100);
    context.arc(100, 100, 80, 0, -Math.PI * 2 / 120 * 120, true);
    context.setStrokeStyle("#49f");
    context.stroke();
    context.restore();
    context.draw();
  // 第二页
    Context.setLineWidth(4);
    Context.moveTo(180, 100);
    Context.arc(100, 100, 80, 0, -Math.PI * 2 / 120 * 120, true);
    Context.setStrokeStyle("#49f");
    Context.stroke();
    Context.restore();
    Context.draw();
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

},

  item_change:function(e){
    current_choice=e.detail.text;
  },

  Item_change:function(e){
    Current_choice=e.detail.text;
  },
  but:function(e){
    clearInterval(intervalT);//重新清空开始画圆
    this.setData({
      text:'重新开始'
     })
   
    // var flag=getApp().globalData.flag;
    // console.log(flag);
    // if(flag==true)
    // {
    //   return;
    // }
    // getApp().globalData.flag=true;
    // console.log(flag);


    // 使用 wx.createContext 获取绘图上下文 context
    var n;
    var m;
    if(current_choice=="自动牙刷")
      {
          n = 120;
          m = 120;
      }
    if(current_choice=="普通牙刷")
      {
          n = 180;
          m = 180;
      }   
    this.setData({ "innerText": n });// 倒计时圈中的文字显示
    var _this = this;
    function drawInnerCircle() {    // 绘制固定内圈圆
      context.save();              // save-保存绘图上下文
      context.setLineWidth(1);     // setLineWidth-设置线条宽度；参数-setLineWidth(线条宽度，单位px)
      context.moveTo(180, 100);    // moveTo-把路径移动到画布中的制定点，不创建线条；参数-moveTo(目标位置的x坐标，目标位置的y坐标)
      context.arc(100, 100, 80, 0, 2 * Math.PI, true);  // arc-创建一条弧线；参数-arc(圆心x坐标，圆心y坐标，圆半径，起始弧度，终止弧度，弧度方向是否是逆时针)
      context.stroke();            // stroke-画出当前路径的边框，默认颜色为黑色
      context.restore();           // restore-恢复之前保存的绘图上下文
      context.draw();    // draw-将之前在绘图上下文中的描述(路径，变形，样式)画到canvas中
    }
    function drawOutCircle(n) {    // 绘制倒计时外圈圆
      
      context.save();
      context.setLineWidth(4);
      context.moveTo(180, 100);
      context.arc(100, 100, 80, 0, -Math.PI * 2 / m * n, true);
      context.stroke();
      context.restore();
    }
      intervalT = setInterval(function () {
      context.setStrokeStyle("#49f");    // setStrokeStyle-设置描边颜色；参数-setStrokeStyle(描边的颜色，默认颜色为black)
      if (n >= 0) {
        _this.setData({ "innerText": n });
        drawOutCircle(n);
        n -= 1;
        if(m==120)
        {
          if(n/30==0)
          {
            //添加音效
            const innerAudioContext = wx.createInnerAudioContext()
            innerAudioContext.autoplay = true  // 是否自动开始播放，默认为 false
            innerAudioContext.loop = false  // 是否循环播放，默认为 false
            wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
              obeyMuteSwitch: false,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
              success: function (e) {
                console.log(e)
                console.log('play success')
              },
              fail: function (e) {
                console.log(e)
                console.log('play fail')
              }
            })
            innerAudioContext.src = 'http://downsc.chinaz.net/Files/DownLoad/sound1/201908/11827.mp3';  // 音频资源的地址
            innerAudioContext.onPlay(() => {  // 监听音频播放事件
              console.log('开始播放')
            })
            innerAudioContext.onError((res) => { // 监听音频播放错误事件
              console.log(res.errMsg)
              console.log(res.errCode)
            })
          }
        }
      } else {
        clearInterval(intervalT);     // 倒计时一次停止
        context.clearRect(0,0,200,200);
      }
      drawInnerCircle();
    }, 1000);
  },
  But:function(e){
    clearInterval(IntervalT);//重新清空开始画圆
    this.setData({
      _text:'重新开始'
     })
   
    // var flag=getApp().globalData.flag;
    // console.log(flag);
    // if(flag==true)
    // {
    //   return;
    // }
    // getApp().globalData.flag=true;
    // console.log(flag);


    // 使用 wx.createContext 获取绘图上下文 context
    
    var n;// 倒计时圈中的文字显示
    var m;
    if(Current_choice=="自动牙刷")
      {
          n = 120;
          m = 120;
      }
    if(Current_choice=="普通牙刷")
      {
          n = 180;
          m = 180;
      }    
    this.setData({ "_Text": n });
    var _this = this;
    function drawInnerCircle() {    // 绘制固定内圈圆
      Context.save();              // save-保存绘图上下文
      Context.setLineWidth(1);     // setLineWidth-设置线条宽度；参数-setLineWidth(线条宽度，单位px)
      Context.moveTo(180, 100);    // moveTo-把路径移动到画布中的制定点，不创建线条；参数-moveTo(目标位置的x坐标，目标位置的y坐标)
      Context.arc(100, 100, 80, 0, 2 * Math.PI, true);  // arc-创建一条弧线；参数-arc(圆心x坐标，圆心y坐标，圆半径，起始弧度，终止弧度，弧度方向是否是逆时针)
      Context.stroke();            // stroke-画出当前路径的边框，默认颜色为黑色
      Context.restore();           // restore-恢复之前保存的绘图上下文
      Context.draw();    // draw-将之前在绘图上下文中的描述(路径，变形，样式)画到canvas中
    }
    function drawOutCircle(n) {    // 绘制倒计时外圈圆
      
      Context.save();
      Context.setLineWidth(4)
      Context.moveTo(180, 100)
      Context.arc(100, 100, 80, 0, -Math.PI * 2 / m * n, true)
      Context.stroke()
      Context.restore();
    }
      IntervalT = setInterval(function () {
      Context.setStrokeStyle("#49f");    // setStrokeStyle-设置描边颜色；参数-setStrokeStyle(描边的颜色，默认颜色为black)
      if (n >= 0) {
        _this.setData({ "_Text": n });
        drawOutCircle(n);
        n -= 1;
      } else {
        clearInterval(IntervalT);     // 倒计时一次停止
      }
      drawInnerCircle();
    }, 1000);
  }
  
})
