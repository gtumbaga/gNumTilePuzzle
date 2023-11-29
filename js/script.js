const existingTiles = 48;
let maxTile = 7;
let openCol = maxTile;
let openRow = maxTile;
const rootSelector = document.querySelector(':root');
//const audio_click = new Audio('./sfx/click-21156.mp3');
let useAudio = true;


const init = () => {
    handleDrawTileDivs();
    handleSetGameSize(3);
    autoSetGameSize();
    //setTimeout(() => {
        //autoSetGameSize();
    //}, 200);
}

const handleDrawTileDivs = () => {
    const tileStyle = document.createElement('style');
    tileStyle.type='text/css';

    for (let tile = 1; tile < (existingTiles+1); tile++) {
        const tilesHolder = document.getElementById("tilesHolder");
        const newDiv = document.createElement("div");
        newDiv.className = "tile";
        newDiv.id = `tile-${tile}`;
        newDiv.innerHTML = tile;
        tilesHolder.appendChild(newDiv);

        const calculatedPX = (tile -1) * 100;
        tileStyle.appendChild(document.createTextNode(`.col-${tile} { left: ${calculatedPX}px } .row-${tile} {top: ${calculatedPX}px}`));
    }
    document.getElementsByTagName('head')[0].appendChild(tileStyle);
}

const handleRandomize = () => {
    console.log('handleRandomize clicked');
    const totalTileCount = (maxTile*maxTile) -1;
    for (let i = 0; i < (totalTileCount*200); i++) {
        const rng = getRandomIntInclusive(1, totalTileCount);
        tile = document.getElementById(`tile-${rng}`);
        console.log('what do i do with the tile?', tile.dataset);
        handleClick(tile, true);
    }

}

const handleReset = () => {
    console.log(`handleReset, maxTile is ${maxTile}`);
    const totalTileCount = (maxTile*maxTile) -1;
    let counter = 1;
    for (let row = 1; row < (maxTile+1); row++) {
        for (let col = 1; col < (maxTile+1); col++) {
            console.log(`tile: ${counter} col: ${col}, row: ${row} `);

            const tileDiv = document.getElementById(`tile-${counter}`);
            tileDiv.className = `tile col-${col} row-${row}`;
            tileDiv.dataset.col = col;
            tileDiv.dataset.row = row;

            counter++;
            if (counter > totalTileCount) {
                break;
            }
        }
        //if (counter > totalTileCount) {
            //break;
        //}
    }
    openCol = maxTile;
    openRow = maxTile;
}

const autoSetGameSize = async () => {
    let zoomScale = 0.10;

    const scaleStep = 0.05;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const smallestSide = Math.min(viewportWidth, viewportHeight);

    console.log('viewport smallestSide', smallestSide);

    let keepLooping = true;
    const maxLoop = 200;
    let loopCounter = 0;

    const frameSize = document.getElementById('frame').offsetWidth;
    console.log('viewport differences', frameSize, smallestSide);
    const difference = (smallestSide / frameSize);
    rootSelector.style.setProperty('--framescale',`${difference}`);

    // scroll to top of doc if needed for some reason
    window.scrollTo(0,0);

}

const handleSetGameSize = (size) => {
    console.log(size);
    maxTile = parseInt(size);


    const totalTileCount = (maxTile*maxTile);
    console.log(`total tile count set to ${totalTileCount}`);
    let counter = 1;
    for (let tile = 1; tile < (existingTiles+1); tile++) {
        const tileDiv = document.getElementById(`tile-${tile}`);
        if (tile < totalTileCount) {
            tileDiv.style.display = "block";
        } else {
            tileDiv.style.display = "none";
        }
    }

    const tileSize = 100;
    const calculatedBoardSize = (tileSize * maxTile);
    rootSelector.style.setProperty('--boardsize',`${calculatedBoardSize}px`);
    handleReset();
    autoSetGameSize();
    //setTimeout(() => {
        //autoSetGameSize();
    //}, 200);
}

const handleClick = (e, skipSound = false) => {
    //console.log('click worked');
    setTimeout(() => {
        if (!skipSound && useAudio) {
            //audio_click.play();
        }
    }, 10)
    let col;
    let row;
    if (e.target) {
        col = parseInt(e.target.dataset.col);
        row = parseInt(e.target.dataset.row);
    } else {
        col = parseInt(e.dataset.col);
        row = parseInt(e.dataset.row);
    }

    // if row matches, check col movement
    if (row == openRow) {
        console.log('same row');
        console.log(`current col: ${col}, openCol: ${openCol}`);
        let newCol = '';

        if ( (openCol == (col - 1)) || (openCol == (col + 1)) ) {
            newCol = openCol;
        }

        if (newCol) {
            if (e.target) {
                e.target.classList.remove(`col-${col}`);
                e.target.classList.add(`col-${newCol}`);
                e.target.dataset.col = newCol;
            } else {
                e.classList.remove(`col-${col}`);
                e.classList.add(`col-${newCol}`);
                e.dataset.col = newCol;
            }
            openCol = col;
        }
    }
    // if col matches, check row movement
    if (col == openCol) {
        console.log('same col');
        console.log(`current row: ${row}, oepnRow: ${openRow}`);
        let newRow = '';

        if ((openRow == (row - 1)) || (openRow == (row + 1))) {
            newRow = openRow;
            console.log(`should be moving to row: ${newRow}`);
        }

        if (newRow) {
            if (e.target) {
                e.target.classList.remove(`row-${row}`);
                e.target.classList.add(`row-${newRow}`);
                e.target.dataset.row = newRow;
            } else {
                e.classList.remove(`row-${row}`);
                e.classList.add(`row-${newRow}`);
                e.dataset.row = newRow;
            }
            openRow = row;
        }
    }


}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const handleSider = (e) => {
    console.log(e.target.value);
    zoomScale = parseFloat(e.target.value);
    rootSelector.style.setProperty('--framescale',`${zoomScale}`);
    document.getElementById('zscale').innerHTML = zoomScale;
}
const handleZoomDown = () => {
    const slider = document.getElementById('zoomChooser');
    slider.stepDown(1);
    zoomScale = parseFloat(slider.value);
    rootSelector.style.setProperty('--framescale',`${zoomScale}`);
    document.getElementById('zscale').innerHTML = zoomScale;
}
const handleZoomUp = () => {
    const slider = document.getElementById('zoomChooser');
    slider.stepUp(1);
    zoomScale = parseFloat(slider.value);
    rootSelector.style.setProperty('--framescale',`${zoomScale}`);
    document.getElementById('zscale').innerHTML = zoomScale;
}

const handleCloseModal = () => {
    document.getElementById('settingsModal').classList.remove('show');
}
const handleShowModal = () => {
    document.getElementById('settingsModal').classList.add('show');
}

const handleSoundToggle = (e) => {
    //console.log(e.target.checked);
    useAudio = e.target.checked;
}




init();
