from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

recipe_routes = Blueprint('recipe', __name__)

#Get all recipes
@recipe_routes.route("/")
def get_all_recipes():
    """Query for all recipes"""
    all_recipes = Recipe.query.all()
    response = [recipe.to_dict() for recipe in all_recipes]
    return {"recipes": response}
