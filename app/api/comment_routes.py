from flask import Blueprint, jsonify, session, request
from app.models import User, db, Recipe_comment, Recipe
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comment', __name__)

@comment_routes.route("/<int:recipe_id>")
# @login_required
def get_comments_by_recipe(recipe_id):
    """Gets all comments on a recipe by recipe_id"""
    comments = Recipe_comment.query.filter(Recipe_comment.recipe_id == recipe_id).all()
    response = [comment.to_dict() for comment in comments]
    return {"comment": response}

# @comment_routes.route("/new")
