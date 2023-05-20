from flask import Blueprint, jsonify, session, request
from app.models import User, db, Recipe_comment, Recipe
from app.forms import LoginForm
from app.forms import SignUpForm, RecipeCommentForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comment', __name__)

@comment_routes.route("/<int:recipe_id>")
# @login_required
def get_comments_by_recipe(recipe_id):
    """Gets all comments on a recipe by recipe_id"""
    comments = Recipe_comment.query.filter(Recipe_comment.recipe_id == recipe_id).all()
    response = [comment.to_dict() for comment in comments]
    users = User.query.filter(User.id == Recipe_comment.user_id).all()
    print("_-_____------___----_----__-_--_-_", users)
    userRes = [user.to_dict() for user in users]
    return {"comment": response,
            "user": userRes}

@comment_routes.route("/new", methods=["POST"])
@login_required
def create_recipe_comment():
    """Create a comment on a recipe"""
    form = RecipeCommentForm()
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_comment = Recipe_comment(
            details = data["details"],
            user_id = data["user_id"],
            recipe_id = data["recipe_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return {
            "comment": new_comment.to_dict()
        }
    return {
        "errors": form.errors
    }

@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_recipe_comment(id):
    """Deletes a recipe on a comment if the user is the comments creator"""
    comment = Recipe_comment.query.get(id)
    if current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return "Comment Deleted"
    else:
        return {
            "errors": "Only the comment creator can delete this comment"
        }
@comment_routes.route("/<int:id>", methods=["GET","PUT"])
@login_required
def edit_one_comment(id):
    """Edit a comment on a recipe"""
    form = RecipeCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        comment = Recipe_comment.query.get(id)
        # Can only edit an ingredient if the current user id == question user id
        if current_user.id == comment.user_id:
            comment.details = data["details"]
            comment.user_id = request.json.get("user_id")
            comment.recipe_id = data["recipe_id"]
            db.session.commit()
            return {
                "comment": comment.to_dict()
            }
        else:
            return {"errors": "You must be the owner of a comment to edit that comment."}

    return {
        "errors": form.errors
    }
