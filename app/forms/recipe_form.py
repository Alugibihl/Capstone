from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField,IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, URL
from ..api.aws_helpers import ALLOWED_EXTENSIONS


class RecipeForm(FlaskForm):
    details = StringField("details", validators=[DataRequired(), Length(min=20, message="Recipe must be at least 20 characters.")])
    name = StringField("name", validators=[DataRequired(), Length(min=3, max=40, message="Recipe name must be between 3 and 40 characters.")])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    category_id = SelectField("category_id", choices=[])
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image = StringField("image", validators=[URL()])
