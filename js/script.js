let maxTile = 4;
let openCol = maxTile;
let openRow = maxTile;


const handleRandomize = () => {
    const totalTileCount = (maxTile*maxTile) -1;
    for (let i = 0; i < 3000; i++) {
        const rng = getRandomIntInclusive(1, totalTileCount);
        document.getElementById(`tile-${rng}`).click();
    }

}

const handleReset = () => {
    const totalTileCount = (maxTile*maxTile) -1;
    let counter = 1;
    for (let row = 1; row < 5; row++) {
        for (let col = 1; col < 5; col++) {
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
        if (counter > totalTileCount) {
            break;
        }
    }
    openCol = maxTile;
    openRow = maxTile;
}

const handleClick = (e) => {
    console.log('click worked');
    const col = parseInt(e.target.dataset.col);
    const row = parseInt(e.target.dataset.row);

    // if row matches, check col movement
    if (row == openRow) {
        console.log('same row');
        console.log(`current col: ${col}, openCol: ${openCol}`);
        let newCol = '';

        if ( (openCol == (col - 1)) || (openCol == (col + 1)) ) {
            newCol = openCol;
        }

        if (newCol) {
            e.target.classList.remove(`col-${col}`);
            e.target.classList.add(`col-${newCol}`);
            e.target.dataset.col = newCol;
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
            e.target.classList.remove(`row-${row}`);
            e.target.classList.add(`row-${newRow}`);
            e.target.dataset.row = newRow;
            openRow = row;
        }
    }


}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

