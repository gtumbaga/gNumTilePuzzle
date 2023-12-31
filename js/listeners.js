const clickOrTouch = (('ontouchend' in window)) ? 'touchstart' : 'click';

const allTiles = document.getElementsByClassName("tile");

Array.from(allTiles).forEach(function(singleTile) {
    singleTile.addEventListener(clickOrTouch, handleClick);
});

document.getElementById('btn-randomize').addEventListener(clickOrTouch, handleRandomize);
document.getElementById('btn-reset').addEventListener(clickOrTouch, handleReset);
document.getElementById('btn-settings').addEventListener(clickOrTouch, handleShowModal);
document.getElementById('btn-closeModal').addEventListener(clickOrTouch, handleCloseModal);
document.getElementById('btn-minus').addEventListener(clickOrTouch, handleZoomDown);
document.getElementById('btn-plus').addEventListener(clickOrTouch, handleZoomUp);
//document.getElementById('useAudio').addEventListener("change", handleSoundToggle);

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

window.addEventListener("resize", autoSetGameSize);
window.addEventListener("orientationchange", autoSetGameSize);
screen.orientation.addEventListener("change", autoSetGameSize);

document.getElementById('frame').addEventListener(clickOrTouch, (e) => {e.preventDefault()}, { passive: false });
document.getElementById('frame').addEventListener('touchend', detectDoubleTapClosure(), { passive: false });
document.getElementById('tilesHolder').addEventListener(clickOrTouch, (e) => {e.preventDefault(), { passive: false }});
document.getElementById('tilesHolder').addEventListener('touchend', detectDoubleTapClosure(), { passive: false });
document.body.addEventListener('touchend', detectDoubleTapClosure(), { passive: false });

