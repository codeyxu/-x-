// components/tabcoun/tabcoun.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curindex : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e){
      const index = e.currentTarget.dataset.index;
      this.setData({
        curindex:index
      })
      this.triggerEvent('itclick',{index:index,title:this.properties.titles[index]},{})
    }
  }
})
