def apply_light_theme(window):
    """Applies a light theme."""
    window.setStyleSheet("""
        QMainWindow { background-color: white; }
        QPushButton { background-color: #007bff; color: white; border-radius: 5px; padding: 5px; }
        QPushButton:hover { background-color: #0056b3; }
    """)


def apply_dark_theme(window):
    """Applies a dark theme."""
    window.setStyleSheet("""
        QMainWindow { background-color: #121212; color: white; }
        QPushButton { background-color: #1e90ff; color: white; border-radius: 5px; padding: 5px; }
        QPushButton:hover { background-color: #1c7ed6; }
    """)
