from app.models import db, User, Category, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_categories():
    Mexican = Category(
        name="Mexican", description="Mexican cuisine is known for its bold flavors, vibrant colors, and use of ingredients such as corn, beans, tomatoes, chili peppers, and various spices.")
    Chinese = Category(
        name="Chinese", description="Chinese cuisine is diverse and varies by region. It features a balance of flavors, textures, and cooking techniques.")
    Italian = Category(
        name="Italian", description="Italian cuisine is beloved worldwide for its simplicity and emphasis on fresh ingredients.")
    Indian = Category(
        name="Indian", description=": Indian cuisine is renowned for its rich flavors, spices, and diverse regional dishes. It incorporates ingredients like rice, lentils, vegetables, and a wide range of spices.")
    American = Category(
        name="American", description="American cuisine is diverse and influenced by various cultures and regional specialties.")
    French = Category(
        name="French", description=" French cuisine is considered one of the finest in the world, known for its sophisticated techniques and rich flavors.")
    Japanese = Category(
        name="Japanese", description="Japanese cuisine is known for its meticulous preparation, delicate flavors, and visual presentation."
    )

    all_categories = [Mexican, Chinese, Italian, Indian, American, French, Japanese]
    add_categories = [db.session.add(category) for category in all_categories]
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
