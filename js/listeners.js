const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});

document.getElementById('btn-randomize').addEventListener(clickOrTouch, handleRandomize);
document.getElementById('btn-reset').addEventListener(clickOrTouch, handleReset);

document.getElementById("zoomChooser").addEventListener("change", handleSider)

// anti double tap zoom (i hope)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 500) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
