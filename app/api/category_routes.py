from flask import Blueprint, jsonify, session, request
from app.models import User, db, Recipe, Category
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

category_routes = Blueprint('category', __name__)

@category_routes.route("/<int:category_id>")
def get_all_recipes_by_category(category_id):
    """Get all recipes in a category"""
    recipes = Recipe.query.filter(Recipe.category_id == category_id).all()
    response = [recipe.to_dict() for recipe in recipes]
    return {"recipes": response}
