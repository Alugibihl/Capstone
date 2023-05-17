from app.models import db, Recipe_comment, environment, SCHEMA
from sqlalchemy.sql import text
import random

# Adds a demo user, you can add other users here if you want
def seed_recipe_comments():
    for i in range(1, 56):
        user_id = (i % 4) + 1
        recipe_id = i
        details = random.choice(["That looks fun to make!", "That looks delicious!", "I made this and it was bad.", "I can't wait to try this recipe!", "This recipe is a family favorite.", "The flavors in this dish are amazing!", "I highly recommend this recipe.", "I added my own twist to this recipe and it turned out great!"])

        comment = Recipe_comment(
            details=details,
            user_id=user_id,
            recipe_id=recipe_id
        )
        db.session.add(comment)

    db.session.commit()


def undo_recipe_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipe_comments"))

    db.session.commit()
