from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Recipe(db.Model):
    __tablename__ = "recipes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # category = db.relationship("Category", back_populates="recipes")
    # user = db.relationship("User", back_populates="recipes")


    def to_dict(self):
        return {
            "id": self.id,
            "details": self.details,
            "name": self.name,
            "userId": self.user_id,
            "image": self.image,
            "categoryId": self.category_id,
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at)
        }
