from .db import db, environment, add_prefix_for_prod, SCHEMA


likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('recipes', db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), primary_key=True)
)
if environment == "production":
    likes.schema = SCHEMA
