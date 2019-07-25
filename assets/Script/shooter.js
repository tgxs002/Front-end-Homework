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
    director: cc.Node,
    bullet_speed: 300,
    bullet: {
      default: null,
      type: cc.Node
    },
    x_up_limit: 400,
    x_down_limit: -400,
    y_up_limit: 570,
    y_down_limit: 70,
    renew_frequency: 10,
    life: 5,
    dieAudio: {
      default: null,
      type: cc.AudioClip
    },
    hurtAudio: {
      default: null,
      type: cc.AudioClip
    }

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // let manager = cc.director.getPhysicsManager()
    // manager.enabled = true
    this.state = 0// state 0 代表一般,state 1代表无敌状态, -1代表死亡
    // this.score = 0
    // this.count = 0
  },

  rad2deg: function (x) {
    return x * 180 / Math.PI
  },

  start () {
    this.scene = cc.director.getScene()
  },

  onBeginContact: function (contact, selfCollider, otherCollider) {
    if (this.state === 0) {
      this.life--
      if (this.life > 0) {
        this.changeToInvincibleState(500)
        cc.audioEngine.play(this.hurtAudio, false, 1)
      } else if (this.life === 0) {
        this.state = -1
        this.node.opacity = 0
        this.node.getComponent(cc.RigidBody).enabled = false
        this.node.getComponent(cc.PhysicsPolygonCollider).enabled = false
        this.node.getComponent(cc.PolygonCollider).enabled = false
        this.node.dispatchEvent(new cc.Event.EventCustom('SHOOTER_DIE'))
        cc.audioEngine.play(this.dieAudio, false, 1)
        // this.node.destroy()
      }
    }
  },

  // 改变状态为无敌模式
  changeToInvincibleState (invicibleTime) {
    console.log('call Invincible')
    this.state = 1
    this.node.opacity = 100
    setTimeout(() => {
      if (this.node !== null) {
        this.state = 0
        this.node.opacity = 255
      }
    }, invicibleTime)
  },

  shoot (angle) {
    let bullet = cc.instantiate(this.bullet)
    bullet.position = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 60))
    bullet.rotation = this.rad2deg(-angle) - 45
    bullet.active = true
    let rigid = bullet.getComponent(cc.RigidBody)
    rigid.linearVelocity = cc.v2(this.bullet_speed * Math.cos(angle), this.bullet_speed * Math.sin(angle))
    this.scene.addChild(bullet)
  },

  update (dt) {
    // this.score += this.count
    // if (this.cycle_counter % this.renew_frequency !== 0) {
    //   return
    // }
    if (this.node.x > this.x_up_limit) {
      this.node.x = this.x_down_limit
    } else if (this.node.x < this.x_down_limit) {
      this.node.x = this.x_up_limit
    }
    if (this.node.y > this.y_up_limit) {
      this.node.y = this.y_down_limit
    } else if (this.node.y < this.y_down_limit) {
      this.node.y = this.y_up_limit
    }
    // this.score_label = cc.find('Canvas/scoreLabel').getComponent(cc.RichText)
    // this.score_label.string = 'Life: ' + this.life.toString() + ' Score: ' + this.score.toString()
  }
})
