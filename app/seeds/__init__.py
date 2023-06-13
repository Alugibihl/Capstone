from flask.cli import AppGroup
from .users import seed_users, undo_users
from .category import seed_categories, undo_categories
from .ingredient import seed_ingredients, undo_ingredients
from .recipe import seed_recipes, undo_recipes
from .recipe_comment import seed_recipe_comments, undo_recipe_comments
from .recipe_likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_ingredients()
        undo_recipe_comments()
        undo_likes()
        undo_recipes()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_recipes()
    seed_likes()
    seed_recipe_comments()
    seed_ingredients()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_ingredients()
        undo_recipe_comments()
        undo_likes()
        undo_recipes()
        undo_categories()
        undo_users()
    # Add other undo functions here
