from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, URL


class RecipeCommentForm(FlaskForm):
    details = StringField("details", validators=[DataRequired(), Length(min=3, max=500, message="Comment must be atleast 3 characters.")])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    recipe_id = IntegerField("recipe_id", validators=[DataRequired()])
