let undo = new Stack();
let redo = new Stack();

function saveState(cell) {
    console.log(cell.node.value.trim().length)
    if(cell.node.value.trim() == "") return
    undo.push({
        cell: cell,
        PrevValue: cell.node.value,
        style: {
            fontWeight: cell.style.fontWeight,
            fontStyle: cell.style.fontStyle,
            textDecoration: cell.style.textDecoration,
        },
    });
    
    console.log(undo.peek())
    redo.array.length = 0; 
}

function undoAction() {
    if (undo.empty()) return;
    const lastState = undo.pop();
    console.log(undo.peek())
    redo.push({
        cell: lastState.cell,
        prevValue: lastState.cell.innerText,
        style: { ...lastState.cell.style },
    });
    lastState.value = lastState.prevValue || ''
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
    if(!lastRedo.prevValue) lastRedo.prevValue = ''
    lastRedo.value = lastRedo.prevValue
    lastRedo.cell.innerText = lastRedo.value 
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
    if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
            undoAction();
        } else if (event.key.toLowerCase() === 'y') {
            redoAction();
        }
    }
});

function enableEditing(cell) {
    if (cell.querySelector('input')) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = cell.innerText;
    input.style.width = `${cell.offsetWidth}px`;
    input.style.height = `${cell.offsetHeight}px`;
    input.style.boxSizing = 'border-box';
    input.style.caretColor = 'transparent'; 
    cell.innerText = '';
    cell.appendChild(input);
    input.focus();
    input.addEventListener('input', () => {
        input.style.caretColor = 'black';
    });
    const saveInput = () => {
        cell.node.value = input.value
        cell.innerText = cell.node.value;
        saveState(cell); 
    };
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') input.blur();
    });
    input.addEventListener('blur', saveInput);
}