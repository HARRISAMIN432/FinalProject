let undo = new Stack();
let redo = new Stack();

function saveState(cell) {
    undo.push({
        cell: cell,
        value: cell.innerText,
        style: {
            fontWeight: cell.style.fontWeight,
            fontStyle: cell.style.fontStyle,
            textDecoration: cell.style.textDecoration,
        },
    });
    redo.array.length = 0; 
}

function undoAction() {
    if (undo.array.length === 0) return;
    const lastState = undo.pop();
    redo.push({
        cell: lastState.cell,
        value: lastState.cell.innerText,
        style: { ...lastState.cell.style },
    });
    lastState.cell.innerText = lastState.value;
    restoreStyles(lastState.cell, lastState.style);
}

function redoAction() {
    if (redo.array.length === 0) return;
    const lastRedo = redo.pop();
    undo.push({
        cell: lastRedo.cell,
        value: lastRedo.cell.innerText,
        style: { ...lastRedo.cell.style },
    });
    lastRedo.cell.innerText = lastRedo.value;
    restoreStyles(lastRedo.cell, lastRedo.style);
}

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

// Undo and redo keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
        undoAction();
    } else if (event.ctrlKey && event.key === 'y') {
        redoAction();
    }
});


