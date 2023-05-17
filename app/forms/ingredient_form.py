from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, URL, ValidationError, Length


class IngredientForm(FlaskForm):
    image = StringField("image", validators=[URL])
    details = StringField("details", validators=[DataRequired(), Length(min=10, message="Description must be at least 10 characters.")])
    name = StringField("name", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
