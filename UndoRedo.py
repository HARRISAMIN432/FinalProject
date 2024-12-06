from PyQt5.QtWidgets import QApplication, QTableWidget, QTableWidgetItem, QPushButton, QVBoxLayout, QWidget
from PyQt5.QtGui import QFont
from PyQt5.QtCore import Qt
from Stack import Stack

class SpreadsheetApp(QWidget):
    def __init__(self):
        super().__init__()
        self.undo_stack = Stack()
        self.redo_stack = Stack()
        self.current_cell = None

        self.init_ui()

    def init_ui(self):
        # Main table
        self.table = QTableWidget(10, 10)  # 10x10 grid for demonstration
        self.table.cellClicked.connect(self.select_cell)
        self.table.itemChanged.connect(self.save_state)

        # Buttons
        bold_button = QPushButton("Bold")
        bold_button.clicked.connect(self.toggle_bold)

        italic_button = QPushButton("Italic")
        italic_button.clicked.connect(self.toggle_italic)

        underline_button = QPushButton("Underline")
        underline_button.clicked.connect(self.toggle_underline)

        # Layout
        layout = QVBoxLayout()
        layout.addWidget(self.table)
        layout.addWidget(bold_button)
        layout.addWidget(italic_button)
        layout.addWidget(underline_button)
        self.setLayout(layout)

        # Keyboard shortcuts
        self.table.keyPressEvent = self.handle_keypress

    def select_cell(self, row, column):
        self.current_cell = self.table.item(row, column)
        if self.current_cell is None:
            self.current_cell = QTableWidgetItem("")
            self.table.setItem(row, column, self.current_cell)

    def save_state(self):
        if not self.current_cell:
            return

        state = {
            "row": self.table.currentRow(),
            "col": self.table.currentColumn(),
            "value": self.current_cell.text(),
            "font": self.current_cell.font(),
        }
        self.undo_stack.push(state)
        self.redo_stack.clear()

    def restore_state(self, state):
        item = self.table.item(state["row"], state["col"])
        if item is None:
            item = QTableWidgetItem("")
            self.table.setItem(state["row"], state["col"], item)

        item.setText(state["value"])
        item.setFont(state["font"])

    def undo_action(self):
        if self.undo_stack.is_empty():
            return

        last_state = self.undo_stack.pop()
        current_state = {
            "row": last_state["row"],
            "col": last_state["col"],
            "value": self.table.item(last_state["row"], last_state["col"]).text() if self.table.item(last_state["row"], last_state["col"]) else "",
            "font": self.table.item(last_state["row"], last_state["col"]).font() if self.table.item(last_state["row"], last_state["col"]) else QFont(),
        }
        self.redo_stack.push(current_state)
        self.restore_state(last_state)

    def redo_action(self):
        if self.redo_stack.is_empty():
            return

        last_state = self.redo_stack.pop()
        current_state = {
            "row": last_state["row"],
            "col": last_state["col"],
            "value": self.table.item(last_state["row"], last_state["col"]).text() if self.table.item(last_state["row"], last_state["col"]) else "",
            "font": self.table.item(last_state["row"], last_state["col"]).font() if self.table.item(last_state["row"], last_state["col"]) else QFont(),
        }
        self.undo_stack.push(current_state)
        self.restore_state(last_state)

    def toggle_bold(self):
        if not self.current_cell:
            return

        font = self.current_cell.font()
        font.setBold(not font.bold())
        self.current_cell.setFont(font)

    def toggle_italic(self):
        if not self.current_cell:
            return

        font = self.current_cell.font()
        font.setItalic(not font.italic())
        self.current_cell.setFont(font)

    def toggle_underline(self):
        if not self.current_cell:
            return

        font = self.current_cell.font()
        font.setUnderline(not font.underline())
        self.current_cell.setFont(font)

    def handle_keypress(self, event):
        if event.modifiers() == Qt.ControlModifier:
            if event.key() == Qt.Key_Z:
                self.undo_action()
            elif event.key() == Qt.Key_Y:
                self.redo_action()
        else:
            super(SpreadsheetApp, self).keyPressEvent(event)


if __name__ == "__main__":
    app = QApplication([])
    window = SpreadsheetApp()
    window.show()
    app.exec()
