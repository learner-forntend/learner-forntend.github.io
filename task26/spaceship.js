(function() {
    'use strict';



    /**
     * 飞船对象
     **/
    function Spaceship(id) {
        this.id = id; //ID
        this.charge = 100; //电量
        this.deg = 0; //角度
        this.chargeTimmer = null;
        this.flyTimmer = null;
        this.state = "stop";
        this.states = {
            FLYING: "flying",
            STOP: "stop"
        };
    }


    Spaceship.prototype.chargePower = function chargePower() {
        if (this.charge === 100) {
            this.charge = 100;
            if (chargeTimmer) clearTimeout(chargeTimmer);
            return;
        }

        chargeTimmer = setTimeout(function() {
            this.charge++;
            chargePower();
        }, 50);
    }

    /** 飞行  **/
    Spaceship.prototype.fly = function fly() {
        if (this.chargeTimmer) { //如果正在充电，则取消充电状态
            clearTimeout(this.chargeTimmer)
        }

        if (this.charge <= 0) {
            this.charge = 0;
            state = states.STOP;
            if (flyTimmer) clearTimeout(flyTimmer);
            return;
        }

        flyTimmer = setTimeout((function() {
            this.state = this.states.FLYING; //飞行状态
            charge--; //释放能量
            deg += 2 / (id - 0); //角度增加
        }).bind(this), 20);
    }

    /** 暂停 **/
    Spaceship.prototype.pause = function() {
        state = states.STOP;
        if (flyTimmer) clearTimeout(flyTimmer); //暂停
        this.chargePower();
    }

    /** 挂载 **/
    window.Spaceship = Spaceship;

})()
