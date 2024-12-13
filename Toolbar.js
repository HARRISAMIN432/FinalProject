document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.tab-button.active').classList.remove('active');
    document.querySelector('.tab-panel.active').classList.remove('active');
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

function restoreStyles(cell, style) {
  cell.style.fontWeight = style.fontWeight || 'normal';
  cell.style.fontStyle = style.fontStyle || 'normal';
  cell.style.textDecoration = style.textDecoration || 'none';
}

document.getElementById('bold').addEventListener('click', () => {
  if (!currentCell) return;
  saveState(currentCell);
  currentCell.style.fontWeight = currentCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
});

document.getElementById('italic').addEventListener('click', () => {
  if (!currentCell) return;
  saveState(currentCell);
  currentCell.style.fontStyle = currentCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
});

document.getElementById('underline').addEventListener('click', () => {
  if (!currentCell) return;
  saveState(currentCell);
  currentCell.style.textDecoration = currentCell.style.textDecoration === 'underline' ? 'none' : 'underline';
});

document.getElementById('clearData').addEventListener('click', function () {
  clearData();
});

document.getElementById('toggleGrid').addEventListener('click', function () {
  toggleGridlines();
});

document.getElementById('toggleTheme').addEventListener('click', function () {
  toggleTheme();
});

function clearData() {
  let arr = Array.from(document.querySelectorAll('td'));
  for (let i = 0; i < arr.length; i++) {
    if (i < cols || (i % (cols + 1)) === 0)
      continue;
    arr[i].innerText = ""
  }
  let row = list.head
  while (row) {
    col = row
    while (col) {
      col.value = ""
      col = col.right
    }
    row = row.down
  }
}

function toggleGridlines() {
  console.log('Toggling gridlines...');
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

document.body.classList.add('light-theme');

const style = document.createElement('style');
style.innerHTML = `
        .light-theme {
            background-color: white;
            color: black;
        }

        .dark-theme {
            background-color: #121212;
            color: white;
        }
    `;
document.head.appendChild(style);

