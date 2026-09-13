"""Shelter occupancy history model."""

from ..extensions import db


class ShelterUpdate(db.Model):
    """A recorded occupancy reading for a shelter."""

    __tablename__ = "shelter_updates"
    __table_args__ = (
        db.CheckConstraint("occupancy >= 0", name="ck_shelter_updates_occupancy_nonnegative"),
    )

    id = db.Column(db.Integer, primary_key=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey("shelters.id"), nullable=False)
    occupancy = db.Column(db.Integer, nullable=False)
    recorded_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    shelter = db.relationship("Shelter", back_populates="updates")

    def __repr__(self) -> str:
        return f"<ShelterUpdate id={self.id} shelter_id={self.shelter_id}>"
