const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});

document.getElementById('btn-randomize').addEventListener(clickOrTouch, handleRandomize);
document.getElementById('btn-reset').addEventListener(clickOrTouch, handleReset);

document.getElementById("zoomChooser").addEventListener("change", handleSider)

// anti double tap zoom (i hope)
let doubleTouchStartTimestamp = 0;
document.addEventListener("touchstart", function(event){
    var now = +(new Date());
    if (doubleTouchStartTimestamp + 500 > now){
        event.preventDefault();
    };
    doubleTouchStartTimestamp = now;
});
