const rows = 25
const cols = 25
const list = new TernaryLinkedList()

for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) list.insertNode(i, j)

function display(list) {
    let container = document.getElementById('grid-container')
    let table = document.createElement('table');
    let currRow = list.head
    while (currRow) {   
        let row = document.createElement('tr')
        let currCol = currRow
        while (currCol) {
            let cell = document.createElement('td');
            cell.innerText = currCol.value;
            row.appendChild(cell);
            currCol = currCol.right;
        }
        table.appendChild(row);
        currRow = currRow.down;
    }
    container.appendChild(table);
}

display(list);