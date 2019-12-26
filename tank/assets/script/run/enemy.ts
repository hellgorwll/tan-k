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

    @property(cc.Prefab)
    enemyBullet: cc.Prefab = null;
    @property(cc.Boolean)
    state:boolean = false;


    setShootAction () {
        let self = this;
        let bulletE = cc.instantiate(self.enemyBullet);
        self.node.parent.addChild(bulletE);
        bulletE.setPosition(self.node.x,self.node.y-40);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this;
        if(!self.state){
            self.schedule(function(){
                self.setShootAction();
            },1);    
        }        
    }

    start () {
        
    }

    update (dt) {}
}
