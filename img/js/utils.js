'use strict'
var gDigitNames = ['zero ', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ']

function countNegsMines(cellI, cellJ, mat) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}
function updateCell(cell) {
    cell.isShown = true
    gGame.shownCount++
    checkVictory()

}
function renderCell(elCell, value) {
    elCell.classList.add('shown')
    elCell.innerText = value
    // elCell.innerHTML = value
}

function unrenderCell(elCell,value,cell){
    elCell.classList.remove('shown')
    if(cell.isMarked) elCell.style.backgroundImage = MARKED

    else if(cell.isMine) elCell.style.backgroundImage = value
    elCell.innerHTML = value

}

function renderMine(elCell, value) {
    elCell.classList.add('shown')
    elCell.style.backgroundImage = value

}

function getEmptyCell(board){
    const cells = getCellsWithoutMine(board)
    const idx = getRandomInt(0, cells.length)
    return cells[idx]
}

function getCellsWithoutMine(board) {
    const Cells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine && !board[i][j].isShown) {
                Cells.push({ i, j })
            }
        }
    }
    return Cells

}

// Returns the class name for a specific cell
function getClassName(location) {
    console.log(location);
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] }
    return coord
}

function uploadClock() {
    const elClock = document.querySelector('.clock')
    const now = new Date().getTime()
    const timer = ((now - gTime) / 1000).toFixed(0)
    gGame.secsPassed = +timer
    elClock.innerText = timer

}


function resetTime() {
    var elClock = document.querySelector('.clock')
    elClock.innerText = '0'//'000'
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}