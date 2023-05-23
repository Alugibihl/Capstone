from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, URL, ValidationError, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS


class EditIngredientForm(FlaskForm):
    # image = StringField("image", validators=[URL()])
    image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    details = StringField("details", validators=[DataRequired(), Length(min=10, message="Description must be at least 10 characters.")])
    name = StringField("name", validators=[DataRequired(), Length(min=3, max=40, message="Ingredient name must be between 3 and 40 characters")])
    user_id = IntegerField("user_id", validators=[DataRequired()])
