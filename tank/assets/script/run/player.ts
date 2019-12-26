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
    
    @property(cc.Integer)
    Leftspeed:number = 0;
    @property(cc.Integer)
    Upspeed:number = 0;
    @property(cc.Integer)
    Rightspeed:number = 0;
    @property(cc.Integer)
    Downspeed:number = 0;
    @property(cc.Integer)
    accel:number = 0;
    @property(cc.Integer)
    maxSpeed:number = 0;
    @property(cc.Event)
    accLeft: boolean = false;
    @property(cc.Event)
    accRight: boolean = false;
    @property(cc.Event)
    accUp: boolean = false;
    @property(cc.Event)
    accDown: boolean = false;
    @property(cc.Event)
    accShoot: boolean = false;
    @property(cc.Integer)
    xScreenWidth:number = 0;
    @property(cc.Integer)
    yScreenHeight:number = 0;
    @property(cc.Integer)
    direction:number = 0;
    @property(cc.Prefab)
    bulletPrefabL:cc.Prefab = null;
    @property(cc.Prefab)
    bulletPrefabR:cc.Prefab = null;
    @property(cc.Prefab)
    bulletPrefabU:cc.Prefab = null;
    @property(cc.Prefab)
    bulletPrefabD:cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    setShootAction () {
        let self = this;

        if(self.direction==1){
            let bulletP = cc.instantiate(self.bulletPrefabL);
            self.node.parent.addChild(bulletP);
            bulletP.setPosition(self.node.x-30,self.node.y);
        }else if(self.direction==2){
            let bulletP = cc.instantiate(self.bulletPrefabR);
            self.node.parent.addChild(bulletP);
            bulletP.setPosition(self.node.x+30,self.node.y);
        }else if(self.direction==3){
            let bulletP = cc.instantiate(self.bulletPrefabU);
            self.node.parent.addChild(bulletP);
            bulletP.setPosition(self.node.x,self.node.y+30);
        }else if(self.direction==4){
            let bulletP = cc.instantiate(self.bulletPrefabD);
            self.node.parent.addChild(bulletP);
            bulletP.setPosition(self.node.x,self.node.y-30);
        };
    }

    onLoad () {
        let self = this;

        self.accLeft = false;
        self.accRight = false;
        self.accUp = false;
        self.accDown = false;
        self.accShoot = false;
        self.Leftspeed = 0;
        self.Upspeed = 0;
        self.Rightspeed = 0;
        self.Downspeed = 0;
        self.direction = 0;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,self.onKeyDown,self);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,self.onKeyUp,self);    
    }

    onKeyDown (event) {
        let self = this;
        
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                self.accLeft = true;
                self.Rightspeed = 0;
                self.Upspeed = 0;
                self.Downspeed = 0;
                self.direction = 1;
                break;
            case cc.macro.KEY.d:
                self.accRight = true;
                self.Leftspeed = 0;
                self.Upspeed = 0;
                self.Downspeed = 0;
                self.direction = 2;
                break;
            case cc.macro.KEY.w:
                self.accUp = true;
                self.Leftspeed = 0;
                self.Rightspeed = 0;
                self.Downspeed = 0;
                self.direction = 3;
                break;
            case cc.macro.KEY.s:
                self.accDown = true;
                self.Leftspeed = 0;
                self.Rightspeed = 0;
                self.Upspeed = 0;
                self.direction = 4;
                break;
            case cc.macro.KEY.j:
                if(!self.accShoot){
                    self.accShoot = true;
                    self.setShootAction();
                    break;
                }
                break;    
        };
    };

    onKeyUp (event) {
        let self = this;

        switch (event.keyCode) {
            case cc.macro.KEY.a:
                self.accLeft = false;
                self.Leftspeed = 0;
                break;
            case cc.macro.KEY.d:
                self.accRight = false;
                self.Rightspeed = 0;
                break;
            case cc.macro.KEY.w:
                self.accUp = false;
                self.Upspeed = 0;
                break;
            case cc.macro.KEY.s:
                self.accDown = false;
                self.Downspeed = 0;
                break;
            case cc.macro.KEY.j:
                self.accShoot = false;
                break;
        };
    };

    onDestroy () {
        let self = this;

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,self.onKeyDown,self);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,self.onKeyUp,self);
    }

    update (dt) {
        let self = this;

        if (self.accLeft) {
            self.Leftspeed -= self.accel*dt;
            self.node.angle = 180;
        } else if (self.accRight) {
            self.Rightspeed += self.accel*dt;
            self.node.angle = 0;
        } else if (self.accUp) {
            self.Upspeed += self.accel*dt;
            self.node.angle = 90;
        } else if (self.accDown) {
            self.Downspeed -= self.accel*dt;
            self.node.angle = 270;
        };

        if (Math.abs(self.Leftspeed)>self.maxSpeed) {
            self.Leftspeed = self.maxSpeed*self.Leftspeed/Math.abs(self.Leftspeed);
        };

        self.node.x += self.Leftspeed*dt;

        if (Math.abs(self.Rightspeed)>self.maxSpeed) {
            self.Rightspeed = self.maxSpeed*self.Rightspeed/Math.abs(self.Rightspeed);
        };

        self.node.x += self.Rightspeed*dt;

        if (Math.abs(self.Upspeed)>self.maxSpeed) {
            self.Upspeed = self.maxSpeed*self.Upspeed/Math.abs(self.Upspeed);
        };

        self.node.y += self.Upspeed*dt;

        if (Math.abs(self.Downspeed)>self.maxSpeed) {
            self.Downspeed = self.maxSpeed*self.Downspeed/Math.abs(self.Downspeed);
        };

        self.node.y += self.Downspeed*dt;

        self.xScreenWidth = self.node.parent.width/2-self.node.width/2;
        let xNodeX = self.node.x;
        if (Math.abs(xNodeX)>self.xScreenWidth) {
            self.node.x = self.xScreenWidth*xNodeX/Math.abs(xNodeX);
            self.Leftspeed = 0;
            self.Rightspeed = 0;
        };

        self.yScreenHeight = self.node.parent.height/2-self.node.height/2;
        let yNodeY = self.node.y;
        if (Math.abs(yNodeY)>self.yScreenHeight) {
            self.node.y = self.yScreenHeight*yNodeY/Math.abs(yNodeY);
            self.Upspeed = 0;
            self.Downspeed = 0;
        };
    };
}