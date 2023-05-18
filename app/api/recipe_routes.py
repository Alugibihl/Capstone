from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, RecipeForm
from ..models import Recipe, Ingredient, Category
from flask_login import current_user, login_user, logout_user, login_required

recipe_routes = Blueprint('recipe', __name__)

#Get all recipes
@recipe_routes.route("/")
def get_all_recipes():
    """Query for all recipes"""
    all_recipes = Recipe.query.all()
    all_ingredients = Ingredient.query.all()
    all_categories = Category.query.all()
    cats = [category.to_dict() for category in all_categories]
    ing_res = [ingredient.to_dict() for ingredient in all_ingredients]
    response = [recipe.to_dict() for recipe in all_recipes]
    return {"recipes": response,
            "ingredients": ing_res,
            "categories": cats}

@recipe_routes.route('/<int:id>')
@login_required
def get_one_recipe(id):
    """Query for one recipe"""
    recipe = Recipe.query.get(id)
    response = recipe.to_dict()
    return {"recipe": response}

@recipe_routes.route("/new", methods=["POST"])
@login_required
def create_one_recipe():
    """Creates a recipe"""
    form = RecipeForm()
    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    #provides choices to the form
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_recipe = Recipe(
            name = data["name"],
            details = data["details"],
            user_id = data["user_id"],
            category_id = data["category_id"],
            image= data["image"]
        )
        db.session.add(new_recipe)
        db.session.commit()
        return {
            "recipe": new_recipe.to_dict()
        }

    return {
        "errors": form.errors
    }

@recipe_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_recipe(id):
    """Delete a recipe Route"""
    recipe = Recipe.query.get(id)
    if current_user.id == recipe.user_id:
        db.session.delete(recipe)
        db.session.commit()
        return "Recipe Deleted"
    else:
        return {"errors": "Only the recipe poster can remove their recipe."}

@recipe_routes.route("/<int:id>", methods=["GET","PUT"])
@login_required
def edit_one_recipe(id):
    """Edit a recipe"""
    form = RecipeForm()
    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        recipe = Recipe.query.get(id)
        # Can only edit an ingredient if the current user id == question user id
        if current_user.id == recipe.user_id:
            recipe.details = data["details"]
            recipe.user_id = request.json.get("user_id")
            recipe.category_id = data["category_id"]
            recipe.image = data["image"]
            recipe.name = data["name"]
            db.session.commit()
            return {
                "recipe": recipe.to_dict()
            }
        else:
            return {"errors": "You must be the owner of a recipe to edit that recipe."}

    return {
        "errors": form.errors
    }
