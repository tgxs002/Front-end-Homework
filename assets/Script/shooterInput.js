// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    let canvas = cc.find('Canvas')
    canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)
  },

  rad2deg: function (x) {
    return x * 180 / Math.PI
  },

  onTouchBegan: function (event) {
    let touchLoc = event.touch.getLocation()
    this.node.getComponent('shooter').shoot(50, touchLoc)
  }

  // update (dt) {},
})
