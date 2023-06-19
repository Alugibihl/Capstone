"""empty message

Revision ID: 7a8274d506d4
Revises: 5eea948a05ad
Create Date: 2023-06-14 16:20:04.207044

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '7a8274d506d4'
down_revision = '5eea948a05ad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('relates',
    sa.Column('ingredients', sa.Integer(), nullable=False),
    sa.Column('recipes', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ingredients'], ['ingredients.id'], ),
    sa.ForeignKeyConstraint(['recipes'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('ingredients', 'recipes')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('relates')
    # ### end Alembic commands ###