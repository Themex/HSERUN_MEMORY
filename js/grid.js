var AlignGrid = function(game, cols, rows, par){
    Phaser.Group.call(game);

    if(par == null) {
        par = game;
    }

    //cw cell width is the parent width divided by the number of columns
    this.cw = par.width / cols;
    //ch cell height is the parent height divided the number of rows
    this.ch = par.height / rows;
    //promote to a class variable
    this.par = par;
};

AlignGrid.prototype = Object.create(Phaser.Group.prototype);
AlignGrid.prototype.constructor = AlignGrid;

AlignGrid.prototype.placeAt = function(xx,yy,obj){
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
};

AlignGrid.prototype.show = function(){
    this.graphics = game.add.graphics();
    this.graphics.lineStyle(4, 0xff0000, 1);
    //
    //
    for (var i = 0; i < this.par.width; i += this.cw) {
        this.graphics.moveTo(i, 0);
        this.graphics.lineTo(i, this.par.height);
    }
    for (var i = 0; i < this.par.height; i += this.ch) {
        this.graphics.moveTo(0, i);
        this.graphics.lineTo(this.par.width, i);
    }
};