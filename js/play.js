var playState = {
    create:function(){
        $("meta[name='theme-color']").attr("content", '#9eccb3');
        var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        var grd=myBitmap.context.createLinearGradient(0,0,0,500);
        grd.addColorStop(0,"#9eccb3");
        grd.addColorStop(1,"#83b5dd");
        myBitmap.context.fillStyle=grd;
        myBitmap.context.fillRect(0,0,this.game.width, this.game.height);
        //myBitmap.draw(new Phaser.Sprite(this.game, 50, 50, 'player'), 0, 0);
        var lol = this.game.add.sprite(0,0, myBitmap);
        lol.alpha = 0;
        this.game.add.tween(lol).to({ alpha: 1 }, 1000).start();

        this.linesCanvasGraphic = game.add.graphics(0,0);
        this.squareList = [];
        this.openedCards = [];
        this.timer = game.time.create();
        this.countDownSeconds = 0;

        this.cards = game.add.group();
        this.cards.enableBody = true;
        this.cards.physicsBodyType = Phaser.Physics.ARCADE;
        this.cards.inputEnableChildren = true;

        this.generateTiles();

        this.cards.onChildInputDown.add(this.flipCard, this);

        this.timer.start();
    },

    randomizeTiles:function(){
        var arr = [];
        while(arr.length < 15){
            var random_number = Math.floor(Math.random()*16);
            if(arr.indexOf(random_number) > -1) continue;
            arr[arr.length] = random_number;
        }

        for (var num = 0; num < arr.length; num++) {
            this.squareList.push(arr[num]);
            this.squareList.push(arr[num]);
        }

        var j, x, i;
        for (i = this.squareList.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.squareList[i];
            this.squareList[i] = this.squareList[j];
            this.squareList[j] = x;
        }

    },

    generateTiles: function(){
        this.randomizeTiles();

        this.cards.createMultiple(30,'cards', 'hserun_card',true);

        this.cards.children.forEach(function(value,index){
           value.scale.setTo(config.scale_ratio);
           value.mainFrame = cards[this.squareList[index]].frame;
           value.id = this.squareList[index];
        },this);


        var marginX = -1;
        var marginY = -1;
        if(game.device.desktop)
        {
            this.cards.align(-1,6, 512*config.scale_ratio + 10, config.scale_ratio*512 + 10, Phaser.CENTER);
            this.cards.scale.setTo(config.scale_ratio);
            marginX = (game.world.width - (5*512*Math.pow(config.scale_ratio,2)+40))/2;
            marginY = config.scale_ratio * game.world.centerY;
        } else {
            marginX = (game.world.width - (5 * 512 * config.scale_ratio + 40)) / 2;
            this.cards.align(-1,6, 512*config.scale_ratio + 10, config.scale_ratio*512 + 10, Phaser.LEFT_CENTER);
            if(marginX < 0) {
                var coef = game.world.width / (5*512*config.scale_ratio+60);
                this.cards.scale.setTo(coef);
                marginX = (game.world.width - this.cards.width) / 2;
            }
            marginY = 0.3 * game.world.centerY;
        }
        this.cards.position = new Phaser.Point(marginX, marginY);


        var k = 3 * game.device.pixelRatio >= 3 ? 2 : Math.trunc(game.device.pixelRatio);

        this.timeLabel = game.add.text(game.world.centerX, marginY - 200*config.scale_ratio, "120",{font:'120px Open Sans',fill:'#000'});
        this.timeLabel.scale.setTo(config.scale_ratio*k);
        this.timeLabel.anchor.set(0.5);
        },

    countDownTimer: function(){
        this.timeLimit = 150;

        var mySeconds = this.timer.seconds;
        this.countDownSeconds = this.timeLimit - mySeconds;

        this.timeLabel.setText(Math.floor(this.countDownSeconds));

        /*
        var left_bound = this.timeLabel.x + 50;
        var right_bound_max = left_bound + this.cards.width;

        var delta = Math.floor((right_bound_max - left_bound) / this.timeLimit);

        this.linesCanvasGraphic.clear();

        this.linesCanvasGraphic.lineStyle(35, 0x000000, 3);
        this.linesCanvasGraphic.moveTo(left_bound, this.timeLabel.y);
        this.linesCanvasGraphic.lineTo(left_bound+delta*this.countDownSeconds, this.timeLabel.y);
        */

        if(this.countDownSeconds<=0) {
            this.countDownSeconds = 0;
            this.timeLabel.setText(this.countDownSeconds);
            this.Lose();
        }
    },


    update:function(){
        this.countDownTimer();
        if(this.cards.children.length === 0 && this.countDownSeconds !== 0) {
            this.Win();
        }
    },

    tween:function(card){
        var tween1 = game.add.tween(card.scale);
        tween1.to({x: 0}, 300, Phaser.Easing.Linear.None, false, 0);

        tween1.onComplete.addOnce(function (sprite, tween) {
            if (card.frameName === 'hserun_card') {
                card.frameName = card.mainFrame;
            } else {
                card.frameName = 'hserun_card';
            }

        }, this);

        var tween2 = game.add.tween(card.scale);
        tween2.to({x: card.scale.x}, 300, Phaser.Easing.Linear.None, false, 0);

        tween1.chain(tween2);
        tween1.start();
    },

    flipCard:function(card){
        if(!card.clicked && this.openedCards.length < 2) {
            card.clicked = true;
            this.openedCards.push(card);

            this.tween(card);

            if (this.openedCards.length === 2) {
                console.log(this.openedCards);
                var timer = game.time.events.add(Phaser.Timer.SECOND, function(){
                    if (this.openedCards[0].mainFrame === this.openedCards[1].mainFrame) {
                        this.timer.pause();
                        this.cards.remove(this.openedCards[0], true);
                        this.cards.remove(this.openedCards[1], true);

                        $('#popup_close').click(function(){
                            this.timer.resume();
                            $('.popup').hide();
                        }.bind(this));
                        var img = $(document.createElement('img')); //Equivalent: $(document.createElement('img'))
                        img.attr('src', "//hserun.ru/memory/img/"+cards[this.openedCards[0].id].frame+".png");
                        img.attr('class', "cover");
                        $('#popup_heading').text(cards[this.openedCards[0].id].name[cur_lang]);
                        $('#popup_desc').text(cards[this.openedCards[0].id].fact[cur_lang]);
                        $('#popup_desc').prepend(img);
                        $('.popup').fadeIn(300);

                    } else {
                        var card1 = this.cards.getChildAt(this.cards.getChildIndex(this.openedCards[0]));
                        var card2 = this.cards.getChildAt(this.cards.getChildIndex(this.openedCards[1]));
                        this.tween(card1);
                        this.tween(card2);
                        card1.clicked = false;
                        card2.clicked = false;
                    }

                    this.openedCards = [];

                }, this);
            }
        }
    },

    Win:function(){
        upSeconds = this.timeLimit - this.countDownSeconds;
        game.state.start('win');
    },

    Lose:function(){
        game.state.start('lose');
    }
};