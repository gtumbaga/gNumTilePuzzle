const maxTile = 4;
let openCol = maxTile;
let openRow = maxTile;

const clickTest = (e) => {
    console.log('click worked', e);
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
