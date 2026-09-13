"""Explicit database initialization command for ShelterX.

Run from the backend directory in PowerShell:
    ./.venv/Scripts/python.exe ./init_db.py
"""

from app import create_app
from app.extensions import db


def main() -> None:
    """Create all registered SQLAlchemy tables in the configured database."""
    app = create_app()

    with app.app_context():
        db.create_all()

    print("Database initialization complete: all ShelterX tables are ready.")


if __name__ == "__main__":
    main()
