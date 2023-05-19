from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, IngredientForm
from ..models import Ingredient
from flask_login import current_user, login_user, logout_user, login_required

ingredient_routes = Blueprint('ingredient', __name__)

@ingredient_routes.route("/")
def get_all_ingredients():
    ingredients = Ingredient.query.all()
    response = [ingredient.to_dict() for ingredient in ingredients]
    return {"ingredient": response}

@ingredient_routes.route('/<int:id>')
@login_required
def get_one_ingredient(id):
    """Query for one ingredient"""
    ingredient = Ingredient.query.get(id)
    response = ingredient.to_dict()
    return {"ingredient": response}

@ingredient_routes.route("/new", methods=["POST"])
@login_required
def create_one_ingredient():
    """Creates an ingredient"""
    form = IngredientForm()
    #provides choices to the form
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_ingredient = Ingredient(
            name = data["name"],
            details = data["details"],
            user_id = data["user_id"],
            image = data["image"]
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return {
            "ingredient": new_ingredient.to_dict()
        }

    return {
        "errors": form.errors
    }


@ingredient_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_ingredient(id):
    """Delete an ingredient Route"""
    ingredient = Ingredient.query.get(id)
    if current_user.id == ingredient.user_id:
        db.session.delete(ingredient)
        db.session.commit()
        return "Ingredient Deleted"
    else:
        return {"errors": "Only the ingredient poster can remove their ingredient."}

@ingredient_routes.route("/<int:id>", methods=["GET","PUT"])
@login_required
def edit_one_ingredient(id):
    """ Edit an ingredient"""
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        ingredient = Ingredient.query.get(id)
        # Can only edit an ingredient if the current user id == question user id
        if current_user.id == ingredient.user_id:
            ingredient.details = data["details"]
            ingredient.user_id = request.json.get("user_id")
            ingredient.name = data["name"]
            ingredient.image = data["image"]
            db.session.commit()
            return {
                "ingredient": ingredient.to_dict()
            }
        else:
            return {"errors": "You must be the creater of an ingredient to edit and ingredient."}

    return {
        "errors": form.errors
    }
