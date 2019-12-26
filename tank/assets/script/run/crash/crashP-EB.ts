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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onCollisionEnter(other,self){
        if(other.node.group != 'enemyBullet'){
            cc.log('enemyBullet');
            return;
        }
        
        if(other.node.group == 'enemyBullet'){
            other.node.removeFromParent();
            self.node.group = 'default';
            let en = self.node.getComponent(cc.Animation);
            en.play('boom');
            self.schedule(function(){
                cc.director.loadScene('endGame');
                //self.node.removeFromParent();
            },1,0,0);
        }        
    }

    // update (dt) {}
}
