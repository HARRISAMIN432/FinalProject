from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QTableWidget, QTableWidgetItem, QVBoxLayout, QWidget, QLineEdit, QHeaderView
)
from PyQt5.QtCore import Qt
from LinkedLists import TernaryLinkedList


class SpreadsheetApp(QMainWindow):
    def __init__(self, rows, cols):
        super().__init__()
        self.rows = rows
        self.cols = cols
        self.list = TernaryLinkedList(rows, cols)
        self.current_cell = None
        self.init_ui()
        
    def init_ui(self):
        self.setWindowTitle("Spreadsheet with Navigation")
        self.setGeometry(100, 100, 1200, 800)

        # Table Widget
        self.table = QTableWidget(self.rows, self.cols, self)
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        self.table.verticalHeader().setSectionResizeMode(QHeaderView.Stretch)
        self.table.setAlternatingRowColors(True)
        self.table.setStyleSheet(
            "QTableWidget::item { border: 1px solid black; }"
            "QTableWidget::item:selected { background-color: #e0f7fa; border: 2px solid blue; }"
        )

        # Populate Table
        self.populate_table(self.list.head)

        # Layout
        layout = QVBoxLayout()
        layout.addWidget(self.table)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        # Keyboard Navigation
        self.table.itemClicked.connect(self.handle_click)

    def populate_table(self, head):
        for i in range(self.rows):
            for j in range(self.cols):
                self.list.insert_node(i, j)
                
        curr_row = head
        row = 0
        while curr_row:
            curr_col = curr_row
            col = 0
            while curr_col:
                item = QTableWidgetItem(curr_col.value)
                self.table.setItem(row, col, item)
                curr_col.dom_element = item
                curr_col = curr_col.right
                col += 1
            curr_row = curr_row.down
            row += 1

    def handle_click(self, item):
        """Handles click on a table cell."""
        self.current_cell = item
        self.enable_editing(item)

    def enable_editing(self, item):
        """Allows editing of a table cell."""
        row, col = self.table.row(item), self.table.column(item)
        edit = QLineEdit(item.text(), self)
        self.table.setCellWidget(row, col, edit)
        edit.setFocus()

        def save_text():
            item.setText(edit.text())
            self.table.setCellWidget(row, col, None)
            
            # After saving the text, update the linked list and print it
            linked_node = self.list.get_node(row, col)
            linked_node.value = edit.text() 
            

        edit.editingFinished.connect(save_text)