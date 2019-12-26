// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//import A from './player'
const {ccclass, property} = cc._decorator;

@ccclass
export default class B extends cc.Component {

    @property(cc.Integer)
    speed:number = 0;
    @property(cc.Boolean)
    state:boolean = false;
    @property(cc.Integer)
    yScreenHeight:number = 0;
    @property(cc.Integer)
    xScreenHeight:number = 0;

    update (dt) {
        let self = this;
        if (!self.state) {
            self.speed = 400;
        };
        self.node.y -= self.speed*dt;

        self.yScreenHeight = self.node.parent.height/2-self.node.height/2;
        let yNodeY = self.node.y;
        if (Math.abs(yNodeY)>self.yScreenHeight) {
            self.node.destroy;
        };

        self.xScreenHeight = self.node.parent.height/2-self.node.height/2;
        let xNodeX = self.node.y;
        if (Math.abs(xNodeX)>self.xScreenHeight) {
            self.node.destroy;
        };
    };
}
