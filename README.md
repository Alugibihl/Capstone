# The New Fork Dines

Welcome to The New Fork Dines, a web application that allows you to create, manage, edit and delete Recipes an comments. You are able also able Comment on recipes and leave feed back for their creator. This README will provide you with the necessary information to get started with The New Fork Dines.
To see how it should look, you can see it by going to <a href="https://the-new-fork-dines.onrender.com/" target="_blank">The Live Link</a>

### :hammer_and_wrench: Technologies Used :

<div align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlite/sqlite-original-wordmark.svg" title="SQLite3"  alt="SQLite3" width="40" height="40"/>&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/flask/flask-original-wordmark.svg" title="Flask" alt="Flask" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="postgresql" alt="postgresql" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="Python" alt="python" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original.svg" title="SQLA" alt="sqla" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

---


# Login Modal

![image](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/6b22d926-9812-4279-9153-4d61d7015489)


# Home Page

![Screenshot 2024-01-12 162759](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/f0e78242-ec63-4cf5-8b73-6f0a2a792b08)


# Edit a Recipe

![Screenshot 2024-01-12 162824](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/9320f104-0c23-4a57-bb8e-137fbe606cea)


# Mobile Friendly

![Screenshot 2024-01-12 162925](https://github.com/Alugibihl/The-New-Fork-Dines/assets/111261195/61c68560-767f-4d47-b198-bf55c4562952)


---

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

### API Endpoints
| HTTP Verbs | Endpoints | Action | Return Value |
| --- | --- | --- | --- |
| POST | /api/user/signup | To sign up a new user account | { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/user/login | To login an existing user account | { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/recipes/new | To create a new recipe | { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as JSON |
| POST | /api/ingredients/new | To create a new ingredients | { id: #, details: '...', name: '...', user_id: #, image: '...' } as JSON |
| POST | /api/comments/new | To create a new comment | { id: #, details: '...', recipe_id: #, user_id: # } as JSON |
| GET | /api/recipes/:id | To retrieve one recipe |  { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as JSON |
| GET | /api/recipes | To retrieve all questions | { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as a list as JSON |
| GET | /api/recipes/current | To retrieve all of the current users recipes | [{ id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' }, {}] as a list as JSON |
| GET | /api/ingredients/current | To retrieve all of the current users ingredients |   { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as a list as JSON |
| GET | /api/ingredients | To retrieve all ingredients | { id: #, details: '...', name: '...', user_id: #, image: '...' } as a list of JSON objects |
| GET | /api/ingredients/:id | To retrieve one ingredient | { id: #, details: '...', name: '...', user_id: #, image: '...' } as JSON |
| GET | /api/comments/:id | To retrieve one comment | { id: #, details: '...', recipe_id: #, user_id: # } as JSON |
| GET | /api/categories/:id | To retrieve all recipes in one category |  { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as a list as JSON |
| GET | /api/categories | To retrieve all categories | { id: #, name: '...', description: '...' } as JSON |
| PUT | /api/recipes/:id | To edit the details of a single recipe |  { id: #, details: '...', name: '...', user_id: #, category_id: #, image: '...' } as JSON |
| PUT | /api/ingredients/:id | To edit the details of a ingredients |  { id: #, details: '...', name: '...', user_id: #, image: '...' } as JSON |
| PUT | /api/comments/:id | To edit the details of a comments | { id: #, details: '...', recipe_id: #, user_id: # } as JSON |
| DELETE | /api/recipes/:id  | To delete a single recipe | None|
| DELETE | /api/ingredients/:id  | To delete a single ingredients | None |
| DELETE | /api/comments/:id  | To delete a single comments | None |
   
# Contributors

The following individuals are responsible for the creation of this application:

## Alex Lugibihl

GitHub: https://github.com/Alugibihl
LinkedIn: https://www.linkedin.com/in/alexander-lugibihl-2abb70169
