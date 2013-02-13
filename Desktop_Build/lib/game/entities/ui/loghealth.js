ig.module(
    'game.entities.ui.loghealth'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityLogHealth = ig.Entity.extend({
    size: {x:0, y:0},
    collides: ig.Entity.COLLIDES.NONE,
    gravityFactor: 0,
    
    
        
    update: function() {
        
    },
    
    draw: function() {
        ig.system.context.fillStyle = "rgb(255,255,255)";
        ig.system.context.strokeStyle = "rgb(255,255,255)";
        ig.system.context.lineWidth = 3;
        ig.system.context.beginPath();
        ig.system.context.rect(this.pos.x, this.pos.y, 300, 50);
        ig.system.context.closePath();
        ig.system.context.fill();
        ig.system.context.stroke();        
        
        ig.system.context.fillStyle = "rgb(255,222,0)";
        ig.system.context.beginPath();
        ig.system.context.rect(this.pos.x + 180, this.pos.y, 80, 50);
        ig.system.context.closePath();
        ig.system.context.fill();
        
        ig.system.context.fillStyle = "rgb(255,0,0)";
        ig.system.context.beginPath();
        ig.system.context.rect(this.pos.x + 210, this.pos.y, 20, 50);
        ig.system.context.closePath();
        ig.system.context.fill();
        
        ig.system.context.fillStyle = "rgb(0,0,0)";
        ig.system.context.beginPath();
        ig.system.context.rect((this.pos.x + this.gauge), this.pos.y, 10, 50);
        ig.system.context.closePath();
        ig.system.context.fill();
        
        if (this.gauge >= 290) {
            this.step = -8;
        } else if (this.gauge <= 0) {
            this.step = +8;
        }
        
        if (this.running) {
            this.gauge += this.step;
        }
    }
    
});

});