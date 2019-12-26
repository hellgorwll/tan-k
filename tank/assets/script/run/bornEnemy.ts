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
    bornEnemy:cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this;

        self.schedule(function(){
            self.spawnEnemy();
        },3,6,0); 
        
    }

    spawnEnemy () {
        let self = this;

        let Enemy = cc.instantiate(self.bornEnemy);
        self.node.addChild(Enemy);
        Enemy.setPosition(this.getEnemyPosition());
    }

    getEnemyPosition () {
        let self = this;

        let randX = 0;
        let randY = 0;
        let place = Math.ceil(Math.random()*3);
        if(place==1){
            randX = 20;
            randY = 280;
        }else if(place==2){
            randX = 450;
            randY = 280;
        }else if(place==3){
            randX = -450;
            randY = 280;
        }
        return cc.v2(randX,randY);
    }

    start () {

    }

    // update (dt) {}
}
