import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from spreadsheet import SpreadsheetGrid
from ribbon import RibbonToolbar
from styles import apply_light_theme


class SpreadsheetApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Excel-Like Spreadsheet")
        self.setGeometry(100, 100, 1200, 800)

        # Central Widget
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        # Layout
        self.main_layout = QVBoxLayout(self.central_widget)

        # Ribbon Toolbar
        self.ribbon = RibbonToolbar(self)
        self.main_layout.addWidget(self.ribbon)

        # Spreadsheet Grid
        self.grid = SpreadsheetGrid(self)
        self.main_layout.addWidget(self.grid)

        # Initial Theme
        apply_light_theme(self)

        # Connect Ribbon Actions
        self.ribbon.bold_btn.clicked.connect(self.grid.toggle_bold)
        self.ribbon.italic_btn.clicked.connect(self.grid.toggle_italic)
        self.ribbon.underline_btn.clicked.connect(self.grid.toggle_underline)
        self.ribbon.clear_btn.clicked.connect(self.grid.clear_data)
        self.ribbon.toggle_theme_btn.clicked.connect(self.toggle_theme)

        self.light_theme = True

    def toggle_theme(self):
        """Toggles between light and dark themes."""
        self.light_theme = not self.light_theme
        if self.light_theme:
            apply_light_theme(self)
        else:   
            from styles import apply_dark_theme
            apply_dark_theme(self)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = SpreadsheetApp()
    window.show()
    sys.exit(app.exec())