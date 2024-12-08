function evaluate(cell) {
    const formula = cell.node.formula;
    const content = formula.slice(1).trim();
    if (/^SUM|MUL|MAX|MIN/i.test(content)) return evaluateFunction(content, list);
    else return '#NAME?';
}

function evaluateFunction(content, list) {
    const match = content.match(/^(\w+)\((.+)\)$/i);
    if (!match) return '#NAME?';
    const funcName = match[1].toUpperCase(); 
    const range = match[2].trim(); 
    const cells = parseRange(range, list); 
    if (!cells) return '#NAME?';
    
    switch (funcName) {
        case "SUM":
            return cells.reduce((sum, cell) => sum + (parseFloat(cell.value) || 0), 0);
        case "MUL":
            return cells.reduce((product, cell) => product * (parseFloat(cell.value) || 1), 1);
        case "MAX":
            return Math.max(...cells.map(cell => parseFloat(cell.value) || 0));
        case "MAX":
            return Math.min(...cells.map(cell => parseFloat(cell.value) || 0));
        default:
            return '#NAME?';
    }
}

function parseRange(range, list) {
    // Check if the range is a comma-separated list of cells (e.g., A1,A2)
    const commaSeparatedMatch = range.match(/^([A-Z]+\d+)(?:,([A-Z]+\d+))*$/);
    if (commaSeparatedMatch) {
        const cells = [];
        const cellRefs = range.split(',');
        for (const cellRef of cellRefs) {
            const [row, col] = getCellCoordinates(cellRef);
            const node = list.getNode(row - 1, col - 1); // Adjust for 0-based index
            if (node) cells.push(node);
        }
        return cells;
    }

    // Handle colon-separated range (e.g., A1:A3)
    const rangeMatch = range.match(/^([A-Z]+\d+):([A-Z]+\d+)$/);
    if (rangeMatch) {
        const [startRow, startCol] = getCellCoordinates(rangeMatch[1]);
        const [endRow, endCol] = getCellCoordinates(rangeMatch[2]);
        const cells = [];
        for (let i = startRow - 1; i <= endRow - 1; i++) {
            for (let j = startCol - 1; j <= endCol - 1; j++) {
                const node = list.getNode(i, j);
                if (node) cells.push(node);
            }
        }
        return cells;
    }

    return null; 
}

function getCellCoordinates(cell) {
    const match = cell.match(/^([A-Z]+)([0-9]+)$/);
    if (!match) throw new Error("Invalid Cell Reference");
    const column = match[1];
    const row = parseInt(match[2], 10); 
    let colIndex = 0;
    for (let i = 0; i < column.length; i++) {
        colIndex = colIndex * 26 + (column.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return [row, colIndex];
}
