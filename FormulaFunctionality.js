function evaluate(cell, cellRefsInFormula) {
    const formula = cell.node.formula;
    const content = formula.slice(1).trim();
    if (/^SUM|MUL|MAX|MIN/i.test(content)) return evaluateFunction(content, list, cellRefsInFormula);
    else if (/^[A-Z]+\d+([+\-*/^][A-Z]+\d+)+$/i.test(content)) return evaluateArithmetic(content, list, cellRefsInFormula);
    else return '#NAME?';
}

function evaluateArithmetic(formula, list, cellRefsInFormula) {
    const operators = new Stack(); 
    const postfix = new Stack(); 
    const precedence = operator => {
        switch (operator) {
            case '^': return 3;
            case '*': case '/': return 2;
            case '+': case '-': return 1;
            default: return 0;
        }
    };
    let index = 0;
    while (index < formula.length) {
        const token = formula[index];
        if (/[A-Z]/.test(token)) {
            const match = formula.slice(index).match(/[A-Z]+\d+/);
            if (match) {
                postfix.push(match[0]);
                index += match[0].length;
            }
        } else if (/\d/.test(token)) {
            const match = formula.slice(index).match(/\d+(\.\d+)?/);
            if (match) {
                postfix.push(parseFloat(match[0]));
                index += match[0].length;
            }
        } else if (/[\+\-\*\/\^]/.test(token)) {
            while (!operators.empty() && precedence(token) <= precedence(operators.peek())) {
                postfix.push(operators.pop());
            }
            operators.push(token);
            index++;
        } else index++
    }
    while (!operators.empty()) postfix.push(operators.pop());
    const evalStack = new Stack();
    while (!postfix.empty()) {
        const token = postfix.pop();
        if (typeof token === 'string' && /[A-Z]+\d+/.test(token)) {
            const [row, col] = getCellCoordinates(token);
            const node = list.getNode(row - 1, col - 1);
            cellRefsInFormula.push([row - 1, col - 1]);
            evalStack.push(node ? parseFloat(node.value) || 0 : 0);
        } else if (typeof token === 'number') {
            evalStack.push(token);
        } else if (/[\+\-\*\/\^]/.test(token)) {
            const b = evalStack.pop();
            const a = evalStack.pop();
            switch (token) {
                case '+': evalStack.push(a + b); break;
                case '-': evalStack.push(a - b); break;
                case '*': evalStack.push(a * b); break;
                case '/': evalStack.push(a / b); break;
                case '^': evalStack.push(Math.pow(a, b)); break;
                default: throw new Error(`Unknown operator: ${token}`);
            }
        }
    }
    return evalStack.pop();
}

function parseRange(range, list) {
    const commaSeparatedMatch = range.match(/^([A-Z]+\d+)(?:,([A-Z]+\d+))*$/);
    if (commaSeparatedMatch) {
        const cells = [];
        const cellRefs = range.split(',');
        for (const cellRef of cellRefs) {
            const [row, col] = getCellCoordinates(cellRef);
            const node = list.getNode(row - 1, col - 1);
            if (node) cells.push(node);
        }
        return cells;
    }

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