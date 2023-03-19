# No-google auth

## Story

It has always been a barrier for you for freelancer projects - authentication.

You understand the concepts - more or less - you now, why is it important, you know that you _can_ implement it in plain old javascript, but you have yet to do it.

You will do that now. You will implement a dummy project where you have just two endpoint, a public and a private - and some more for authentication. You will hash the passwords, send confirm and password reset emails, and create the session tokens.

Let's get into it!

## What are you going to learn?

- Authentication
- Account confirmation
- Password reset
- Password hashing
- Stateless session management

## Tasks

1. Create a frontend and a backend service with a mongodb. The backend service should have two endpoints, one, that returns the word "public", and one that returns "private".
    - The backend has two endpoints, /api/public, that return the word "public" for a GET request, and /api/private which returns "private"
    - The frontend has two buttons, one sends a get request ot /api/public and shows the response on the page, while the other goes to /api/private
    - The DB is connected to the backend, the words "public" and "private" are stored in the db, and read for every request

2. There is a page, where the user can set a username, a password and an email, and register if the username and the email is not yet occupied, and the password is valid.
    - There is a page, where the user can set a username, a password and an email, and register.
    - There is a /api/signup endpoint, where the payload is validated, the password is hashed, the data is saved to an 'authEntity' table, and a response is sent.
    - The frontend sends requests to the backend to check if the username and email is still unoccupied - even before sign up, after almost every input change.

3. There is a page, where the user can login with the password and the username (or the email address).
    - There is a page, where the user can set a username or email address and a password and hit login.
    - The backend has an endpoint (/api/login) that receives the username (or email) and the password in a post request's body, validates it, (creates a user/profile in the user/profiledb if it is not yet saved and links it to the authEntity model - optional), and creates a jwt signed with a secret key, with the userid in the payload, and sends it back to the frontend

4. The users can not login when there email address is not yet validated.
    - Whenever a user registers, a 'confirmation' is saved with a date, a secure(!) random code and the userId.
    - Whenever a confirmation is created, a link is sent to the users email address with a link: host/confirm?code=the-code&user=user-name
    - Whenever the user clicks on the link in the email, he is sent to a page, where the code and username are read from the url, sent back to the backend and a loading mask is shown while there is response.
    - At /api/confirm the backend accepts confirmation (POST) request, and the code and username sent from the frontend are validated, and the user/profile is confirmed if only 5 minutes has passed. After that, the frontend shows the login page and a success message.

5. The users can reset their passwords.
    - The page has a "Forgot password" button, which redirects the user to a page, where he can send the related username or email to the backend.
    - The backend has an endpoint (/api/reset) which accepts a reset request with the email/username in the body, and creates a 'reset' object in a reset table with a date and a secure(!) random code linked to the authEntity with the userId.
    - When the 'reset' is created, and email is sent with the code and the username in the url as query parameters.
    - When the user clicks on the link a page appears where the password can be reset. The code and the username are read from the url, and when the users hits reset all data is sent to the backend.
    - The backend has an endpoint (/api/password) which accepts the code, the username and the new password in the body, and updates the related authEntity object with the new hashed password if only 5 minutes has passed. After that, the frontend shows the login page and a success message.

6. The result of the login (the session identifier, the jwt) is validated on every subsequent request.
    - Whenever the user send a request to /api/private the jwt is validated on the backend, if it is not valid it does not return the word "private" - if valid, the userid is logged (only with console.log) and the response "private" is sent
    - When the user is not logged in the button that sends a request to /api/private is not even visible
    - The jwt contains at least the unique id of the user

## General requirements

None

## Hints

- Brace yourself, you do not have to do it EVER again

## Background materials

- <i class="far fa-book-open"></i> [Password hashing in node](https://www.npmjs.com/package/bcrypt)
- <i class="far fa-book-open"></i> [Secure random in node](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)
- <i class="far fa-book-open"></i> [Email sending with node](https://nodemailer.com/about/)
