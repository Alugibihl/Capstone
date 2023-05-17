from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, URL


class RecipeForm(FlaskForm):
    details = StringField("details", validators=[DataRequired(), Length(min=20, message="Recipe must be at least 20 characters.")])
    name = StringField("name", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    category_id = SelectField("category_id", choices=[])
    image = StringField("image", validators=[URL()])