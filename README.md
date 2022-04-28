# The Internationl Digital Exhibit of Art
This website was the final project for our Database Principles class. We were tasked to implement a website or application using an SQL relational database. Our team put together an art gallery website that people can freely request to have their own art displayed in the gallery. Requested art is then sent to administrators for review before they are posted to the gallery. Once the art is reviewed and accepted (admins also have the option to decline), it is open to see for all in the gallery. Art pieces in the gallery also have comment sections for any logged-in user to make comments.

There are three main entities for this website: Accounts, Art Pieces, and Comments. An account can request multiple art pieces and make multiple comments and each account must a unique username.

## Visit the website
If you would like to see the website for yourself, vist https://theideawebsite.netlify.app/ and make an account to try out all of the features. There is also a detailed description below of how the site works. The description will be helpful to see what's happening on the administrative side of things that regular users won't have access to.

## Accounts
An account can be one of two types: a regular user or an admin. A regualr user has the ability to request art and make comments on an art piece. The user is able to delete any of their own comments if they would like to. An admin has all of the same functionalities of a user but they can delete any comment. They can also delete art pieces and accounts

### Registration Page
The registration has a lot of the necessary form validation. All fields are required. They have to type in their password twice to make sure they've entered it correctly. There is also a check to see if the username is already taken. The user must have a unique username since that is how we specified it in our database schema.

![image](https://user-images.githubusercontent.com/65355965/165791190-42b482aa-6762-498f-8b7f-bbae97eb1a89.png)

### Log In Page
The log in page simply checks with the database if the username entered exists and if the password matches the correct username.

![image](https://user-images.githubusercontent.com/65355965/165792077-239f9618-92bd-4c4e-94aa-95c3dc309047.png)
![image](https://user-images.githubusercontent.com/65355965/165792151-d84f51c0-7c4f-4dec-842c-0da523c2cdea.png)

## Administration Page
### Art Table
Here on the Admin page, I can review all of the art pieces that have ever been submitted and all of the accounts that have been created. This is the page where admins accept or decline submissions.

![image](https://user-images.githubusercontent.com/65355965/165792605-ffe32021-17ea-4777-a544-a337f8c087de.png)
![image](https://user-images.githubusercontent.com/65355965/165794057-8f8028fe-5133-41b3-b36a-8284cd847ae3.png)

### Accounts Table
This is where admins can delete accounts and even edit account types if needed. Later, an admin may need to add another admin to the table. This is a way to do it.

![image](https://user-images.githubusercontent.com/65355965/165792708-09e2d11e-f796-4b7a-9509-969cbf24bb10.png)
![image](https://user-images.githubusercontent.com/65355965/165794543-f1cc3dee-bb64-46b4-8eeb-b9c1b5c37412.png)

This is what it looks like if a regular user tries to go to the admin route of the website.

![image](https://user-images.githubusercontent.com/65355965/165795593-a79718bb-6f8a-4e7b-b2f3-1f45fef8ce0a.png)


## Gallery + Comment Section
The gallery will show all of the accepted art from the art table as seen from the admin page.

![image](https://user-images.githubusercontent.com/65355965/165792875-c3916b4c-3079-4e07-abef-1a79a92e9d87.png)

The comment input field will only appear if the user has successfully logged in. 

![image](https://user-images.githubusercontent.com/65355965/165792981-1540800b-1a03-468c-bb9a-082e45cfb53c.png)

If an artist makes a comment on their own piece of art, an icon will appear next to their username to show that they are the official artist for this particular art piece making the comment.

![image](https://user-images.githubusercontent.com/65355965/165793387-8f08b8c5-bb98-42da-a679-28007fa1138e.png)

If I'm logged in as sarah, for example, I'll be able to comment and delete my own comment.

![image](https://user-images.githubusercontent.com/65355965/165793623-251f66ec-b2a0-49e9-bfa1-214a63ea634f.png)


If I'm logged in as an admin, I can delete any comment.

![image](https://user-images.githubusercontent.com/65355965/165793880-50f8dd1c-2428-451d-8f9e-deb727378581.png)
