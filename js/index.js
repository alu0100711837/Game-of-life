TABLE_SIZE = 20;

function init()
{
  for (i = 0; i < TABLE_SIZE; i++) {
    for (j = 0; j < TABLE_SIZE; j++) {
      cell = document.createElement('div');
      cell.id = i + ',' + j;
      cell.className = 'cell'
      document.querySelector('.frame').appendChild(cell);
    }
  }
}

function initCells(density)
{
  density = document.querySelector('#myRange').value / 100;
  numberOfCells = density * (TABLE_SIZE ** 2);
  cells = document.getElementsByClassName('cell');
  console.log(density)
  for (x = 0; x < TABLE_SIZE ** 2; x++) {
    cells[x].className = 'cell';
  }
  for (x = 0; x < TABLE_SIZE ** 2; x++) {
    alive = Math.random();
    if (alive > density)
      cells[x].className = 'cell aliveCell'
  }
}

function checkNeighbours(cell)
{
  points = 0;
  cellI = parseInt(cell.id.split(',')[0]);
  cellJ = parseInt(cell.id.split(',')[1]);
  for (a = cellI - 1; a <= cellI + 1; a++) {
    for (b = cellJ - 1; b <= cellJ + 1; b++) {
      neighCell = document.getElementById(a + ',' + b);
      if ( (neighCell != null) && (neighCell.id != cell.id) ) {
        if (neighCell.className.includes('aliveCell'))
          points++;
      }
    }
  }
  return points;
}

function checkCells()
{
  cells = document.getElementsByClassName('cell');
  refreshInfo = [];
  
  for (i = 0; i < cells.length; i++) {
    points = checkNeighbours(cells[i]);
    console.log(cells[i])
    refreshInfo.push(evalCell(cells[i], points));
  }
  refreshCells(cells, refreshInfo);
}

function evalCell(cell, points)
{
  if (cell.className.includes('aliveCell')) {
    console.log('viva!')
    if ((points == 2) || (points == 3)) {
      console.log('mantiene')
      return ('cell aliveCell');
    }
    else {
      console.log('muere')
      return ('cell');
    }
  }
  else {
    if (points == 3) {
      console.log('nace')
      return ('cell aliveCell');
    }
    else {
      console.log('mantiene');
      return ('cell');
    }
  }
}

function refreshCells(cells, refreshInfo)
{
  for (c = 0; c < cells.length; c++) {
    cells[c].className = refreshInfo[c];
  }
}

function play()
{
  checkCells();
}


function setSize()
{
  frame = document.querySelector('.frame');
  TABLE_SIZE = parseInt(document.querySelector('#tableSize').value);
  frame.style.width = TABLE_SIZE * 10 + "px";
  frame.style.height = TABLE_SIZE * 10 + "px";
  
  while (frame.firstChild) {
    frame.removeChild(frame.firstChild);
  }
  init();
  initCells();
}

function fullPlay()
{
  (function myLoop (i) {          
     setTimeout(function () {   
        play();               
        if (--i) myLoop(i);
     }, 50)
  }(1000));   
}
 

setSize();