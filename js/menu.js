var menuState = {
    create: function(){
        var coef = game.device.pixelRatio >= 3 ? 2 : Math.trunc(game.device.pixelRatio);

        $("meta[name='theme-color']").attr("content", '#f47d44');

        console.log(coef);

        var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        var grd=myBitmap.context.createLinearGradient(0,0,0,500);
        grd.addColorStop(0,"#f47d44");
        grd.addColorStop(1,"#e46764");
        myBitmap.context.fillStyle=grd;
        myBitmap.context.fillRect(0,0,this.game.width, this.game.height);
        //myBitmap.draw(new Phaser.Sprite(this.game, 50, 50, 'player'), 0, 0);
        var lol = this.game.add.sprite(0,0, myBitmap);
        lol.alpha = 0;
        this.game.add.tween(lol).to({ alpha: 1 }, 1000).start();
        var logo = game.add.sprite(game.world.centerX, game.world.centerY/1.5, 'cards', 'logo-bw');
        logo.anchor.set(0.5);
        logo.scale.setTo(config.scale_ratio*coef);
        logo.alpha = 0;

        var width_coef = game.world.width / game.world.height;

        this.guideLabel = game.add.text(logo.x, logo.y+400*config.scale_ratio, dictionary[cur_lang]._guide_l,{font:'76px Open Sans', fill:'#000', align:'center'});
        this.guideLabel.anchor.set(0.5);
        this.guideLabel.scale.set(config.scale_ratio*coef);
        this.guideLabel.alpha = 0;
        this.guideLabel.inputEnabled = true;


        var enLabel = game.add.text(logo.x-50*coef,this.guideLabel.y+300*config.scale_ratio, "en",{font:'76px Open Sans',fill:'#000'});
        enLabel.anchor.set(0.5);
        enLabel.scale.set(config.scale_ratio*coef);
        enLabel.alpha = 0;
        enLabel.inputEnabled = true;
        enLabel.lang = "en";

        var slashLabel = game.add.text(enLabel.x+50*coef,enLabel.y, "/",{font:'76px Open Sans',fill:'#000'});
        slashLabel.anchor.set(0.5);
        slashLabel.scale.setTo(config.scale_ratio*coef);
        slashLabel.alpha = 0;

        var ruLabel = game.add.text(slashLabel.x+50*coef,enLabel.y, "ru",{font:'76px Open Sans',fill:'#000'});
        ruLabel.anchor.set(0.5);
        ruLabel.scale.setTo(config.scale_ratio*coef);
        ruLabel.alpha = 0;
        ruLabel.lang = "ru";
        ruLabel.inputEnabled = true;

        this.startLabel = game.add.text(logo.x,enLabel.y+200*config.scale_ratio, "СТАРТ",{font:'76px Open Sans',fill:'#000',align:'center'});
        this.startLabel.anchor.set(0.5);
        this.startLabel.scale.setTo(config.scale_ratio*coef);
        this.startLabel.alpha = 0;
        this.startLabel.inputEnabled = true;


        enLabel.events.onInputDown.add(this.switchLang,this,0);
        ruLabel.events.onInputDown.add(this.switchLang,this,0);
        this.startLabel.events.onInputDown.add(this.start, this);
        this.guideLabel.events.onInputDown.add(this.showGuide,this);

        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.start,this);


        game.add.tween(logo).to({alpha:0.7}, 1500, "Linear", true);
        game.add.tween(enLabel).to({alpha:0.7}, 1500, "Linear",true);
        game.add.tween(slashLabel).to({alpha:0.7}, 1500, "Linear",true);
        game.add.tween(ruLabel).to({alpha:0.7}, 1500, "Linear",true);
        game.add.tween(this.startLabel).to({alpha:0.7}, 1500, "Linear",true);
        game.add.tween(this.guideLabel).to({alpha:0.7}, 1500, "Linear",true);
    },

    start: function(){
        game.state.start('play');
    },
    showGuide:function(){
        $('.guide').fadeIn(300);
        $('#guide_close').click(function(){
            $('.guide').hide();
        });
        $('#guide_heading').text(dictionary[cur_lang]._guide_l);
        $('#guide_desc').html(dictionary[cur_lang]._guide);
    },
    switchLang: function(item){
        cur_lang = item.lang;
        this.startLabel.setText(dictionary[cur_lang]._start);
        this.guideLabel.setText(dictionary[cur_lang]._guide_l);
    }
};