var Input = {
    space: false,
    up: false,
    down: false,
    left: false,
    right: false
};
$(function() {
    if(gameSetup) {
        gameSetup();
    }
    if(gameLoop) {
        setInterval(gameLoop, 1000/engineFps);
    }

    $(document).on('keydown', function(evt) {
        switch(evt.which){
            case 37: Input.left = true; break;
            case 38: Input.up = true; break;
            case 39: Input.right = true; break;
            case 40: Input.down = true; break;
            case 32: Input.space = true; break;
        } 
    });
    $(document).on('keyup', function(evt) {
        switch(evt.which){
            case 37: Input.left = false; break;
            case 38: Input.up = false; break;
            case 39: Input.right = false; break;
            case 40: Input.down = false; break;
            case 32: Input.space = false; break;
        } 
    });

});