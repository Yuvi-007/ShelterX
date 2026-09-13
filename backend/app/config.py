"""Application configuration."""

import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.engine import URL


# Load local development settings without requiring environment variables in source.
load_dotenv(Path(__file__).resolve().parent.parent / ".env")


class Config:
    """Base configuration for the ShelterX backend."""

    ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = os.getenv("FLASK_DEBUG", "True").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY", "change-this-in-production")

    SQLALCHEMY_DATABASE_URI = URL.create(
        drivername="mysql+pymysql",
        username=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        host=os.getenv("MYSQL_HOST", "localhost"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        database=os.getenv("MYSQL_DATABASE", "shelterx_db"),
    ).render_as_string(hide_password=False)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
