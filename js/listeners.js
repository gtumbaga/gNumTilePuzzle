const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});

document.getElementById('btn-randomize').addEventListener(clickOrTouch, handleRandomize);
document.getElementById('btn-reset').addEventListener(clickOrTouch, handleReset);

document.getElementById("zoomChooser").addEventListener("change", handleSider)

// anti double tap zoom (i hope)
document.addEventListener(
    "touchmove",
    function(event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    },
    { passive: false }
);
