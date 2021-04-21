// pages/home/home.js
import{getMuliData,getGoodsData} from '../../service/home'

const types = ['pop','new','sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
      banners:[],
      recommends:[],
      titles:['流行','潮流','新款'],
      curindex:0,
     goods:{
      //  数据模型设计
       pop:{page:0,list:[] },
      new:{page:0,list:[]},
      sell:{page:0,list:[]},
     
     },
     curentType:'pop',//记录当前类型
    //  hidden对自定义组件是无效的
     showback:false
  },
click(e){
console.log(e.detail.index);
//取出index
const index = e.detail.index;
//设置curentTypr
 const type = types[index]
 this.setData({
  curentType:type
 })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //  1:发送网络请求，轮播图，推荐数据
      this._getMultidata()
      //请求商品数据
      this._getGoodsdata('pop')
      this._getGoodsdata('new')
      this._getGoodsdata('sell')
     
  },
  // 网络请求
  _getMultidata(){
    getMuliData().then(res=>{
      // console.log(res);
      //取出轮播图和推荐数据
     const banners = res.data.data.banner.list;
     const recommends = res.data.data.recommend.list;
    //  将banner和recommends放到data中
 this.setData({
   banners:banners,
   recommends:recommends
 })
    })
  },
  _getGoodsdata(type){
    // 1:获取页码
    const page = this.data.goods[type].page + 1;
    // 2:发送网络请求
    getGoodsData(type,page).then(res=>{
        // 2.1取出数据
        const list = res.data.data.list;
        // 2.2将数据设置到对应的type list中
        // 设置一个临时list
        const oldList = this.data.goods[type].list;
        oldList.push(...list)
          // 2.3将数据设置到goods中
          const typekey = `goods.${type}.list`
          // 页码对应的key
          const pagekey = `goods.${type}.page`
        this.setData({
            //这里可以写成字符串代表goods.pop的list数据，'goods.pop.list':oldList但不这样写
            [typekey]:oldList,
            [pagekey]:page +1
        })
    })
   
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
      this._getGoodsdata(this.data.curentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 监听页面滚动
  //管方不要再滚动中频繁的调用this.setData
  onPageScroll(options){
// 1：取出scrolltop
const scrollTop = options.scrollTop;
if (scrollTop >= 1000){
// 修改backtop属性
this.setData({
  showback:scrollTop >= 1000
})
}

  }
})