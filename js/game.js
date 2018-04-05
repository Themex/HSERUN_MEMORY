var config = {
    canvas_width_max:4096,
    canvas_width:650,
    canvas_height_max:4096,
    canvas_height:650,
    scale_ratio:1,
    aspect_ratio:1
};

config.canvas_width = window.innerWidth * window.devicePixelRatio;
config.canvas_height = window.innerHeight * window.devicePixelRatio;
config.aspect_ratio = config.canvas_width / config.canvas_height;
if (config.aspect_ratio < 1) {
    config.scale_ratio = config.canvas_height / config.canvas_height_max;
} else {
    config.scale_ratio = config.canvas_width / config.canvas_width_max;
}

var game = new Phaser.Game(config.canvas_width,config.canvas_height,Phaser.CANVAS,'gameDiv');

var firstRunLandscape;

var upSeconds = 0;
var cards;
var cur_lang = "ru";

String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
        return args[+(a.substr(1,a.length-2))||0];
    });
};

var dictionary = {
    "ru": {
        "_start":"СТАРТ",
        "_time_out":"Время вышло",
        "_try_again":"Попробуй еще раз",
        "_time_is":"Пройдено за {0} сек.",
        "_play_once_more":"Пройти еще раз",
        "_share": "Поделиться",
        "_guide": "<p>Кто в детстве не играл хотя бы раз в <b>«Мемори»</b>?</p>" +
        "<p><b>HSE RUN</b> предлагает вспомнить юные годы и потренировать память, а заодно и узнать Москву немного лучше</p>" +
        "<p><b>Правила игры:</b></p>" +
        "<p><b>Шаг 1.</b> Переворачиваете две любые карточки и запоминаете локации Москвы, которые на них изображены</p>" +
        "<p><b>Шаг 2.</b> Карточки исчезают с поля, когда вы переворачиваете\n две одинаковые за один ход</p>" +
        "<p><b>Шаг 3.</b> Задача – убрать с поля все карточки за 150 секунд</p>",
        "_guide_l":"Как играть?"
    },
    "en": {
        "_start":"START",
        "_time_out":"Time is out",
        "_try_again":"Try again",
        "_time_is":"Your time is {0}s",
        "_play_once_more":"Play again",
        "_share": "Share",
        "_guide":"<p>We bet you enjoyed playing <b>«Memory»</b> in your childhood!</p>" +
        "<p><b>HSE RUN</b> gives you a chance to go back to those days, train you brain and learn some interesting facts about Moscow</p>" +
        "<p><b>How to play:</b></p>" +
        "<p><b>Step 1.</b> Turn over two random cards and memorize places in Moscow that are depicted on them</p>" +
        "<p><b>Step 2.</b> The moment you turn over two identical cards they flip away</p>" +
        "<p><b>Step 3.</b> The main goal is to remove all the cards for 2,5 minutes</p>",
        "_guide_l":"How to play?"
    }
};

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('win',winState);
game.state.add('lose',loseState);

game.state.start('boot');