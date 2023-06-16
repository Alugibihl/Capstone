from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField,IntegerField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, ValidationError, Length, URL
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from ..models import Ingredient, Category

class RecipeForm(FlaskForm):
    details = StringField("details", validators=[DataRequired(), Length(min=20, message="Recipe must be at least 20 characters.")])
    name = StringField("name", validators=[DataRequired(), Length(min=3, max=40, message="Recipe name must be between 3 and 40 characters.")])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    category_id = SelectField("category_id", choices=[])
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    ingredient_ids = SelectMultipleField('Ingredients', choices=[], validate_choice=False)

def validate_ingredient_ids(self, field):
    """
    Custom validator to ensure at least one ingredient is selected.
    """
    if not field.data:
        raise ValidationError("Please select at least one ingredient.")

def __init__(self, *args, **kwargs):
    super(RecipeForm, self).__init__(*args, **kwargs)
    # Set choices for category_id field
    self.category_id.choices = [(category.id, category.name) for category in Category.query.all()]
    # Set choices for ingredient_ids field
    self.ingredient_ids.choices = [(str(ingredient.id)) for ingredient in Ingredient.query.all()]
