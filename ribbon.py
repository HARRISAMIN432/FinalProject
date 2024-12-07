from PyQt5.QtWidgets import QWidget, QTabWidget, QVBoxLayout, QPushButton


class RibbonToolbar(QTabWidget):
    def __init__(self, parent):
        super().__init__(parent)
        self.setTabPosition(QTabWidget.North)

        # Home Tab
        home_tab = QWidget()
        home_layout = QVBoxLayout()
        self.bold_btn = QPushButton("Bold")
        self.italic_btn = QPushButton("Italic")
        self.underline_btn = QPushButton("Underline")
        self.clear_btn = QPushButton("Clear Data")
        home_layout.addWidget(self.bold_btn)
        home_layout.addWidget(self.italic_btn)
        home_layout.addWidget(self.underline_btn)
        home_layout.addWidget(self.clear_btn)
        home_tab.setLayout(home_layout)

        # Insert Tab
        insert_tab = QWidget()
        insert_layout = QVBoxLayout()
        self.insert_chart_btn = QPushButton("Insert Chart")
        self.insert_table_btn = QPushButton("Insert Table")
        insert_layout.addWidget(self.insert_chart_btn)
        insert_layout.addWidget(self.insert_table_btn)
        insert_tab.setLayout(insert_layout)

        # View Tab
        view_tab = QWidget()
        view_layout = QVBoxLayout()
        self.toggle_grid_btn = QPushButton("Toggle Gridlines")
        self.toggle_theme_btn = QPushButton("Toggle Theme")
        view_layout.addWidget(self.toggle_grid_btn)
        view_layout.addWidget(self.toggle_theme_btn)
        view_tab.setLayout(view_layout)

        # Add tabs
        self.addTab(home_tab, "Home")
        self.addTab(insert_tab, "Insert")
        self.addTab(view_tab, "View")
