# The New Fork Dines

Welcome to The New Fork Dines, a web application that allows you to create, manage, edit and delete Recipes an comments. You are able also able Comment on recipes and leave feed back for their creator. This README will provide you with the necessary information to get started with The New Fork Dines.
To see how it should look, you can see it by going to <a href="https://the-new-fork-dines.onrender.com/" target="_blank"> Live Link</a>

![Screenshot 2023-06-02 130305](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/8ae1f890-dc04-4338-b202-a35da3cfbaee)


# Technologies Used

- The New Fork Dines uses a Flask/SQLAlchemy backend
- React/Redux frontend
- Alembic
- Jinja2
- Boto3
- AWS

![Screenshot 2023-06-02 130250](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/179080a1-9aae-4f93-99bc-7b43df5afe15)


# Getting Started

To get started with The New Fork Dines, you will need to have Python 3.9.4 and Node.js installed on your machine. Once you have these installed, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/Alugibihl/The-New-Fork-Dines
   ```

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. Once the Flask server is running, navigating to the client directory

6. Install the dependencies: `npm install`

7. Start the frontend: `npm start`

8. The frontend will be accessible at http://localhost:3000/

![Screenshot 2023-06-02 130333](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/011cc519-f24b-442c-b2e1-8463e181f390)

![Screenshot 2023-06-02 130321](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/6f81ce80-822d-420a-8bdc-4b969bffe50d)

# Navigating The New Fork Dines

The New Fork Dines is currently in development and does not have is does not include all the functionality the contributors intend to add. The functions that the New Fork Times currently has:

1. `LogIn` using any of the included demo user accounts

2. `SignUp` from the landing page and create your own account

3. Create a `Recipe` that you would like to post to The New Fork Dines for other users to see and `comment` on

4. Navigate to any `Recipe` posted to The New Fork Dines to see that recipe's details

5. Create an `Ingredient` for user's to view and learn about

6. Delete any `Ingredient` posted by the logged in user

7. Edit any `Ingredient` posted by the logged in user

8. `Comment` on any `Recipe`

9. Delete any `comment` posted by the logged in user

10. Edit any `comment` posted by the logged in user

11. See all `comments` on a `Recipe` left by any user

12. Navigate to a the user's profile tab to see a list of all `Recipes` created by the user

13. Navigate to a the user's profile tab to see a list of all `Ingredientss` created by the user

14. Edit any `Recipes` created by the user

15. Delete any `Recipe` along with all the associated `comments`

![commenttab](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/5fc50f93-508c-4d5c-ab7a-d13071b2f4a8)
   
# Contributors

The following individuals are responsible for the creation of this application:

## Alex Lugibihl

GitHub: https://github.com/Alugibihl
LinkedIn: https://www.linkedin.com/in/alexander-lugibihl-2abb70169
