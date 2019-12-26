// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property()
    is_enable = true;
    @property()
    is_debug = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this;

        cc.director.getPhysicsManager().enabled = true;
        
        if(self.is_enable){
            let manager = cc.director.getCollisionManager();
            manager.enabled = true;//开启碰撞检测
            if(self.is_enable){
                manager.enabledDebugDraw = true;//显示碰撞检测区域
            }
        }      
    }

    start () {

    }

    // update (dt) {}
}
