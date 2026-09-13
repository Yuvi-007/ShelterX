"""Disaster database model."""

from ..extensions import db


class Disaster(db.Model):
    """A disaster event associated with one or more shelters."""

    __tablename__ = "disasters"
    __table_args__ = (
        db.CheckConstraint(
            "severity IN ('low', 'medium', 'high', 'critical')",
            name="ck_disasters_severity",
        ),
        db.CheckConstraint(
            "status IN ('active', 'resolved')", name="ck_disasters_status"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    disaster_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    severity = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="active", server_default="active")
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    shelter_assignments = db.relationship(
        "DisasterShelter", back_populates="disaster", cascade="all, delete-orphan"
    )
    redistribution_recommendations = db.relationship(
        "RedistributionRecommendation", back_populates="disaster", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Disaster id={self.id} name={self.name!r}>"
