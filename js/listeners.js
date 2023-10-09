const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

//document.getElementById('tile-6').addEventListener(clickOrTouch, handleClick);
//document.getElementById('tile-7').addEventListener(clickOrTouch, handleClick);
//document.getElementById('tile-8').addEventListener(clickOrTouch, handleClick);
//document.getElementById('tile-9').addEventListener(clickOrTouch, handleClick);
//document.getElementById('tile-15').addEventListener(clickOrTouch, handleClick);

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});
