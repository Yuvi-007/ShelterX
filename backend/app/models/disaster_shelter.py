"""Disaster-to-shelter assignment model."""

from ..extensions import db


class DisasterShelter(db.Model):
    """Associates a shelter with a disaster response."""

    __tablename__ = "disaster_shelters"
    __table_args__ = (
        db.UniqueConstraint("disaster_id", "shelter_id", name="uq_disaster_shelters_disaster_shelter"),
    )

    id = db.Column(db.Integer, primary_key=True)
    disaster_id = db.Column(db.Integer, db.ForeignKey("disasters.id"), nullable=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey("shelters.id"), nullable=False)
    assigned_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    disaster = db.relationship("Disaster", back_populates="shelter_assignments")
    shelter = db.relationship("Shelter", back_populates="disaster_assignments")

    def __repr__(self) -> str:
        return f"<DisasterShelter disaster_id={self.disaster_id} shelter_id={self.shelter_id}>"
