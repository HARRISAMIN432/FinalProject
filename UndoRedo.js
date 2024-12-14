let undo = new Stack();
let redo = new Stack();

function saveState(cell, textForUndo = cell.node.value) {
    if (cell.node.value.trim() == "") return
    undo.push({
        cell: cell,
        prevValue: textForUndo,
        style: {
            fontWeight: cell.style.fontWeight,
            fontStyle: cell.style.fontStyle,
            textDecoration: cell.style.textDecoration,
        },
    });

    redo = new Stack();
}

function undoAction() {
    if (undo.empty()) return;

    const lastState = undo.pop();
    
    redo.push({
        cell: lastState.cell,
        prevValue: lastState.cell.innerText,
        style: { ...lastState.cell.style },
    });
    lastState.value = lastState.prevValue || ''
    lastState.cell.node.value = lastState.prevValue
    lastState.cell.innerText = lastState.value
    restoreStyles(lastState.cell, lastState.style);
}

function redoAction() {
    if (redo.empty()) return;
    const lastRedo = redo.pop();
    undo.push({
        cell: lastRedo.cell,
        prevValue: lastRedo.cell.innerText,
        style: { ...lastRedo.cell.style },
    });
    if (!lastRedo.prevValue) lastRedo.prevValue = ''
    lastRedo.value = lastRedo.prevValue
    lastRedo.cell.innerText = lastRedo.value
    restoreStyles(lastRedo.cell, lastRedo.style);
}

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
            undoAction();
        } else if (event.key.toLowerCase() === 'y') {
            redoAction();
        }
    }
});

