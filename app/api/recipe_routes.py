from flask import Blueprint, jsonify, session, request, json
from app.models import User, db, Recipe, Ingredient, Category
from app.forms import LoginForm
from app.forms import SignUpForm, RecipeForm, EditRecipeForm, IngredientForm
from flask_login import current_user, login_user, logout_user, login_required
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3


recipe_routes = Blueprint('recipe', __name__)

@recipe_routes.route("/current")
@login_required
def get_all_recipes_by_user():
    recipes = Recipe.query.filter(Recipe.user_id == current_user.id).all()
    response = [recipe.to_dict() for recipe in recipes]
    return {"recipes": response}

#Get all recipes
@recipe_routes.route("")
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
    users = User.query.filter(User.id == recipe.user_id).all()
    user = [users[0].to_dict()]
    response = recipe.to_dict()
    response["relations"] = [recipe_ingredients.to_dict() for recipe_ingredients in recipe.recipe_ingredients]
    response["likes"] = [recipe_likes.to_dict() for recipe_likes in recipe.recipe_likes]
    return {"recipe": response, "users": user}

@recipe_routes.route("/new", methods=["POST"])
@login_required
def create_one_recipe():
    """Creates a recipe"""
    form = RecipeForm()
    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        image = data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"errors": upload["errors"]}
        new_recipe = Recipe(
            name = data["name"],
            details = data["details"],
            user_id = int(data["user_id"]),
            category_id = data["category_id"],
            image = upload["url"]
        )
        ingredient_ids = data["ingredient_ids"]
        res = ingredient_ids[0].split(",")
        for ingredient_id in res:
            ingredient = Ingredient.query.get(ingredient_id)
            if ingredient:

                new_recipe.recipe_ingredients.append(ingredient)
        db.session.add(new_recipe)
        db.session.commit()
        return {
            "recipe": new_recipe.to_dict()
        }
    print(form.errors)
    return {
        "errors": form.errors
    }, 422

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

@recipe_routes.route("/<int:id>", methods=["GET", "PUT"])
@login_required
def edit_one_recipe(id):
    """Edit a recipe"""
    form = EditRecipeForm()
    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        image = data["image"]
        recipe = Recipe.query.get(id)
        if current_user.id == recipe.user_id:
            if image:
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return {"errors": upload["errors"]}
                recipe.image = upload["url"]
            recipe.details = data["details"]
            recipe.user_id = int(data["user_id"])
            recipe.category_id = data["category_id"]
            recipe.name = data["name"]

            ingredient_ids = data["ingredient_ids"]
            res = ingredient_ids[0].split(",")
            recipe.recipe_ingredients.clear()

            for ingredient_id in res:
                ingredient = Ingredient.query.get(ingredient_id)
                if ingredient:
                    recipe.recipe_ingredients.append(ingredient)
            db.session.commit()
            return {
                "recipe": recipe.to_dict()
            }
        else:
            return {"errors": "You must be the owner of a recipe to edit that recipe."}

    return { "errors": form.errors}

@recipe_routes.route("/<int:id>/likes", methods=["POST"])
@login_required
def add_like(id):
    recipe = Recipe.query.get(id)
    user_id = current_user.id
    if user_id not in [user.id for user in recipe.recipe_likes]:
        recipe.recipe_likes.append(current_user)
        db.session.commit()
    return {"likes": recipe.recipe_likes}

@recipe_routes.route("/<int:id>/likes", methods=["DELETE"])
@login_required
def remove_like(id):
    recipe = Recipe.query.get(id)
    user_id = current_user.id
    if user_id in [user.id for user in recipe.recipe_likes]:
        recipe.recipe_likes.remove(current_user)
        db.session.commit()
    return {"likes": recipe.recipe_likes}

@recipe_routes.route("/likes/current")
@login_required
def user_liked_recipes():
    recipes = Recipe.query.all()
    liked_recipes = [recipe for recipe in recipes if current_user in recipe.recipe_likes]
    response = [recipe.to_dict() for recipe in liked_recipes]
    return {"liked_recipes": response}
