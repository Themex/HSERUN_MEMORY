var winState = {
    create: function(){
        $("meta[name='theme-color']").attr("content", '#a746db');
        var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        var grd=myBitmap.context.createLinearGradient(0,0,this.game.width,this.game.height);
        grd.addColorStop(0,"#a746db");
        grd.addColorStop(1,"#547ac6");
        myBitmap.context.fillStyle=grd;
        myBitmap.context.fillRect(0,0,this.game.width, this.game.height);
        //myBitmap.draw(new Phaser.Sprite(this.game, 50, 50, 'player'), 0, 0);
        var lol = this.game.add.sprite(0,0, myBitmap);
        lol.alpha = 0;
        this.game.add.tween(lol).to({ alpha: 1 }, 2000).start();

        var coef = game.device.pixelRatio >= 3 ? 2 : Math.trunc(game.device.pixelRatio);

        console.log(coef);

        var logo = game.add.sprite(game.world.centerX, game.world.centerY/1.5, 'cards', 'logo-w');
        logo.anchor.set(0.5);
        logo.scale.setTo(config.scale_ratio*coef);
        logo.alpha = 0;

        var startLabel = game.add.text(logo.x,logo.y+350*config.scale_ratio, dictionary[cur_lang]._time_is.toString().format(Math.round(upSeconds)),{font:'84px Open Sans',fill:'#fff',align:'center'});
        startLabel.anchor.set(0.5);
        startLabel.scale.setTo(config.scale_ratio*coef);
        startLabel.alpha = 0;


        var restartLabel = game.add.text(startLabel.x,startLabel.y+300*config.scale_ratio, dictionary[cur_lang]._play_once_more,{font:'76px Open Sans',fill:'#fff',align:'center'});
        restartLabel.anchor.set(0.5);
        restartLabel.inputEnabled = true;
        restartLabel.scale.setTo(config.scale_ratio*coef);
        restartLabel.alpha = 0;

        restartLabel.events.onInputDown.add(this.restart,this);
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.restart,this);

        game.add.tween(logo).to({alpha:1}, 1500, "Linear", true);
        game.add.tween(restartLabel).to({alpha:1}, 1500, "Linear",true);
        game.add.tween(startLabel).to({alpha:1}, 1500, "Linear",true);
    },
    restart: function(){
        game.state.start('play');
    }
};