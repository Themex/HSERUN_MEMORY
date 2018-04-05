var loadState = {
    preload: function(){
        firstRunLandscape = game.scale.isGameLandscape;
        game.scale.fullScreenScaleMode =  Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode =  Phaser.ScaleManager.SHOW_ALL;
        game.scale.refresh();
        game.scale.forceOrientation(false, true);
        game.scale.enterIncorrectOrientation.add(handleIncorrect);
        game.scale.leaveIncorrectOrientation.add(handleCorrect);
        var loadLabel = game.add.text(game.world.centerX,game.world.centerY,'loading...',{font:'56px Open Sans',fill:'#fff'});
        loadLabel.anchor.set(0.5);
        loadLabel.scale.set(config.scale_ratio*game.device.pixelRatio);
        game.load.atlasJSONHash('cards', 'sprites/output.png', 'sprites/output.json');
        game.load.text('cache','data/memory.json');
    },
    create:function () {
        cards = JSON.parse(game.cache.getText('cache'));

        game.state.start('menu');
    }
};



function handleIncorrect(){
    if(!game.device.desktop){
        document.getElementById('turn').style.display = 'block';
        document.getElementById('gameDiv').style.display = 'none';
    }
}

function handleCorrect(){
    if(!game.device.desktop){
        if(firstRunLandscape){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.setMaximum();
            game.scale.setScreenSize(true);
            game.state.start('play');
        }
        document.getElementById('turn').style.display = 'none';
        document.getElementById('gameDiv').style.display = 'block';
    }
}