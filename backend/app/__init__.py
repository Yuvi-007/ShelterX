"""ShelterX Flask application factory."""

from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db


def create_app(config_class: type[Config] = Config) -> Flask:
    """Create and configure the ShelterX Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    db.init_app(app)

    # Import models so their table metadata is registered with SQLAlchemy.
    from . import models  # noqa: F401
    from .routes.db_health import db_health_bp
    from .routes.health import health_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(db_health_bp, url_prefix="/api")

    return app
