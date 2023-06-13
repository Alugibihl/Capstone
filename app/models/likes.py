from .db import db


likes = db.Table(
    "likes",
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('recipes', db.Integer, db.ForeignKey('recipes.id'), primary_key=True)
)
