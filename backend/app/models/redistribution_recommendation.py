"""Shelter redistribution recommendation model."""

from ..extensions import db


class RedistributionRecommendation(db.Model):
    """A proposed movement of people between two shelters for a disaster."""

    __tablename__ = "redistribution_recommendations"
    __table_args__ = (
        db.CheckConstraint(
            "people_to_move > 0", name="ck_redistribution_recommendations_people_positive"
        ),
        db.CheckConstraint(
            "status IN ('pending', 'accepted', 'rejected', 'completed')",
            name="ck_redistribution_recommendations_status",
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    disaster_id = db.Column(db.Integer, db.ForeignKey("disasters.id"), nullable=False)
    from_shelter_id = db.Column(db.Integer, db.ForeignKey("shelters.id"), nullable=False)
    to_shelter_id = db.Column(db.Integer, db.ForeignKey("shelters.id"), nullable=False)
    people_to_move = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="pending", server_default="pending")
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    disaster = db.relationship("Disaster", back_populates="redistribution_recommendations")
    from_shelter = db.relationship(
        "Shelter",
        foreign_keys=[from_shelter_id],
        back_populates="outgoing_recommendations",
    )
    to_shelter = db.relationship(
        "Shelter",
        foreign_keys=[to_shelter_id],
        back_populates="incoming_recommendations",
    )

    def __repr__(self) -> str:
        return (
            f"<RedistributionRecommendation id={self.id} disaster_id={self.disaster_id}>"
        )
