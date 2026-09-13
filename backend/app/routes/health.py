"""Health check routes."""

from flask import Blueprint, jsonify


health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    """Report that the backend service is available."""
    return jsonify(
        {
            "status": "ok",
            "message": "ShelterX backend is running",
        }
    )
