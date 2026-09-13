"""Database connectivity health check route."""

from flask import Blueprint, current_app, jsonify
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from ..extensions import db


db_health_bp = Blueprint("db_health", __name__)


@db_health_bp.get("/db-health")
def database_health_check():
    """Verify that the configured MySQL database accepts a query."""
    try:
        db.session.execute(text("SELECT 1"))
    except SQLAlchemyError:
        db.session.rollback()
        current_app.logger.warning("Database connectivity check failed")
        return (
            jsonify(
                {
                    "status": "error",
                    "database": "disconnected",
                    "message": (
                        "Unable to connect to the database. Confirm MySQL is running "
                        "and the connection settings are correct."
                    ),
                }
            ),
            503,
        )

    return jsonify({"status": "ok", "database": "connected"})
