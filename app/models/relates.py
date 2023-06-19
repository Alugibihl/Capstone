from .db import db, environment, add_prefix_for_prod, SCHEMA


relates = db.Table(
    "relates",
    db.Model.metadata,
    db.Column('ingredients', db.Integer, db.ForeignKey(add_prefix_for_prod('ingredients.id')), primary_key=True),
    db.Column('recipes', db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), default=1 ,primary_key=True)
)
if environment == "production":
    relates.schema = SCHEMA
