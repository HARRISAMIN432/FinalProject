from PyQt5.QtWidgets import QTableWidget, QTableWidgetItem
from PyQt5.QtCore import Qt
from DisplayGrid import SpreadsheetApp


class SpreadsheetGrid(QTableWidget):
    def __init__(self, parent):
        super().__init__(20, 56, parent)
        self.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)

        # Set default cell dimensions
        self.horizontalHeader().setDefaultSectionSize(70)
        self.verticalHeader().setDefaultSectionSize(30)

        # Initialize Headers
        self.initialize_headers()

    def initialize_headers(self):
        for col in range(self.columnCount()):
            if col < 26:
                self.setHorizontalHeaderItem(col, QTableWidgetItem(chr(65 + col)))
            else:
                prefix = chr(65 + (col // 26) - 1)
                suffix = chr(65 + (col % 26))
                self.setHorizontalHeaderItem(col, QTableWidgetItem(f"{prefix}{suffix}"))

        for row in range(self.rowCount()):
            self.setVerticalHeaderItem(row, QTableWidgetItem(str(row + 1)))

    def toggle_bold(self):
        current_item = self.currentItem()
        if current_item:
            font = current_item.font()
            font.setBold(not font.bold())
            current_item.setFont(font)
        print("asdasa")
        

    def toggle_italic(self):
        current_item = self.currentItem()
        if current_item:
            font = current_item.font()
            font.setItalic(not font.italic())
            current_item.setFont(font)

    def toggle_underline(self):
        current_item = self.currentItem()
        if current_item:
            font = current_item.font()
            font.setUnderline(not font.underline())
            current_item.setFont(font)

    def clear_data(self):
        self.clearContents()
        
