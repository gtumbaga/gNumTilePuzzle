const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});

document.getElementById('btn-randomize').addEventListener(clickOrTouch, handleRandomize);
document.getElementById('btn-reset').addEventListener(clickOrTouch, handleReset);
