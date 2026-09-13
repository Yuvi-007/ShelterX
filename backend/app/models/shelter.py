"""Shelter database model."""

from ..extensions import db


class Shelter(db.Model):
    """An emergency shelter and its current capacity state."""

    __tablename__ = "shelters"
    __table_args__ = (
        db.CheckConstraint("total_capacity >= 0", name="ck_shelters_total_capacity_nonnegative"),
        db.CheckConstraint(
            "current_occupancy >= 0", name="ck_shelters_current_occupancy_nonnegative"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Numeric(9, 6), nullable=True)
    longitude = db.Column(db.Numeric(9, 6), nullable=True)
    total_capacity = db.Column(db.Integer, nullable=False)
    current_occupancy = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    status = db.Column(db.String(50), nullable=False, default="active", server_default="active")
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now(),
        onupdate=db.func.now(),
    )

    disaster_assignments = db.relationship(
        "DisasterShelter", back_populates="shelter", cascade="all, delete-orphan"
    )
    updates = db.relationship("ShelterUpdate", back_populates="shelter", cascade="all, delete-orphan")
    outgoing_recommendations = db.relationship(
        "RedistributionRecommendation",
        foreign_keys="RedistributionRecommendation.from_shelter_id",
        back_populates="from_shelter",
    )
    incoming_recommendations = db.relationship(
        "RedistributionRecommendation",
        foreign_keys="RedistributionRecommendation.to_shelter_id",
        back_populates="to_shelter",
    )

    def __repr__(self) -> str:
        return f"<Shelter id={self.id} name={self.name!r}>"
