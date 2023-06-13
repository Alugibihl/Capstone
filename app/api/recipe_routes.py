from flask import Blueprint, jsonify, session, request
from app.models import User, db, Recipe, Ingredient, Category
from app.forms import LoginForm
from app.forms import SignUpForm, RecipeForm, EditRecipeForm
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
    # print("all-----------", all_recipes)
    all_ingredients = Ingredient.query.all()
    # print("all ingredients", all_ingredients)
    all_categories = Category.query.all()
    # print("all_categories", all_categories)
    cats = [category.to_dict() for category in all_categories]
    # print("cats", cats)
    ing_res = [ingredient.to_dict() for ingredient in all_ingredients]
    # print("ing_res", ing_res)
    response = [recipe.to_dict() for recipe in all_recipes]
    # print("response", response)
    return {"recipes": response,
            "ingredients": ing_res,
            "categories": cats}

@recipe_routes.route('/<int:id>')
@login_required
def get_one_recipe(id):
    """Query for one recipe"""
    recipe = Recipe.query.get(id)
    # print("recipe", recipe)
    users = User.query.filter(User.id == recipe.user_id).all()
    # print("______________users____________-----", users)
    user = [users[0].to_dict()]
    # print("______________user____________-----", user)
    response = recipe.to_dict()
    # print("response", response)
    response["likes"] = [recipe_likes.to_dict() for recipe_likes in recipe.recipe_likes]
    # print("likes", response, "other", response["likes"])
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
            user_id = data["user_id"],
            category_id = data["category_id"],
            image= upload["url"]
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
    form = EditRecipeForm()
    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        image = data["image"]
            # Can only edit an ingredient if the current user id == question user id
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
            db.session.commit()
            return {
                "recipe": recipe.to_dict()
            }
        else:
            return {"errors": "You must be the owner of a recipe to edit that recipe."}

    return {
        "errors": form.errors
    }

@recipe_routes.route("/<int:id>/likes", methods=["POST"])
@login_required
def add_like(id):
    recipe = Recipe.query.get(id)
    user_id = current_user.id
    # Check if the user has already liked the recipe
    if user_id not in [user.id for user in recipe.recipe_likes]:
        # Add the like to the recipe
        recipe.recipe_likes.append(current_user)
        db.session.commit()
    # Return the updated number of likes for the recipe
    return {"likes": recipe.recipe_likes}

@recipe_routes.route("/<int:id>/likes", methods=["DELETE"])
@login_required
def remove_like(id):
    recipe = Recipe.query.get(id)
    user_id = current_user.id
    # Check if the user has liked the recipe
    if user_id in [user.id for user in recipe.recipe_likes]:
        # Remove the like from the recipe
        recipe.recipe_likes.remove(current_user)
        db.session.commit()
    # Return the updated number of likes for the recipe
    return {"likes": recipe.recipe_likes}
