# Group Project 2 - App Dating - Granny-Crush 👵🏻 ❤️‍🔥 👴🏼

![license](https://img.shields.io/github/license/ZahraMertens/granny-crush)
![Contributor](https://img.shields.io/badge/Contributor-3-green.svg) 
![Sql](https://img.shields.io/badge/Npm-MySql-red.svg) 
![sequelize](https://img.shields.io/badge/Npm-sequelize-red.svg) 
![express](https://img.shields.io/badge/Npm-expressJs-red.svg)

Granny crush was an idea compiled in the difficulty seniors have in finding a partner for life.
According to ABS (Australian Bureau of Statistic), the median age at marriage has increased over time, and so too has the age at separation and divorce. The median age at divorce is now: 45 years old (males) and 43 years for females.
Along with divorce usually come children and lifelong responsibilities, so the rate of single seniors is high, and that old story of the busy day-to-day one doesn't notice loneliness but after retirement you can feel the empty of not having someone to warm your feet when you go to sleep.


## Mock up


## Content

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)
- [Documentation](#documentation)
- [Installation](#installation)
- [Project Creators](#project-creators)

## User Story

As a single senior looking for love
I want to find people like me 
So that I can find someone to spend the rest of my life with.

## Acceptance Criteria

- GIVEN a dating site for seniors
- WHEN I visit the site for the first time
- THEN I am presented the option to either signup or login
- WHEN I choose to signup
- THEN I am taken to a signup form which asks for my username, email, gender, phone number, postcode, hobby, fun fact, and password
- WHEN I click on the SIGNUP button
- THEN my credentials are added to the database and I am taken to the homepage 
- WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
- WHEN I am signed in to the site
- THEN I see navigation links to view my profile, view my matches, search for my matches, and chat with others
- WHEN I click view my profile
- THEN I am taken to my profile with a button to edit my profile
- WHEN I click Edit Profile 
- THEN I am taken to an Edit Profile form with options to upload a profile picture and edit my username, age, gender, email, phone, postcode, fun fact, and hobby
- WHEN I click Delete Account
- THEN my account is deleted from the database and I am signed out
- WHEN I click choose a file
- THEN a file upload module pops up and I can select a file 
- WHEN I click Upload Image 
- THEN a new image is uploaded to my profile picture and saved in the database 
- WHEN I click Save 
- THEN all of my profile edits are saved
- WHEN I click Search
- THEN I am taken to a form with inputs for minimum age, maximum age, gender, and postcode
- WHEN I fill out the search form
- THEN I am shown all users that fit the criteria, showing their name, age, gender, postcode, hobby, fun fact, and a button to save the user
- WHEN there are no users that match the search
- THEN a modal pops up to inform me that there were no users found 
- WHEN I click the save (heart) button
- THEN the user is saved to my matches and is removed from the search results 
- WHEN I click the Match button on the navbar
- THEN I am taken to a list of all the users I've matched with
- WHEN I view each match
- THEN I can see all the details shown in search, plus their email, phone number, and a button to remove them from the match
- WHEN I click "Remove" 
- THEN the user is removed from my Match list and can be searched again 
- WHEN I click the Chat button on the navbar 
- THEN I am taken to a form which lets them pick their username and chatroom to join
- WHEN I click Join Chat
- THEN I am taken to a public chatroom which lets me interact with other users 
- WHEN I send a message
- THEN my message is displayed along with my username and a timestamp of the message
- WHEN I click Leave Room
- THEN I am taken back to the Chat form 
- WHEN I click the Logout button
- THEN I am logged out of the site and sent back to the login form 
- WHEN I am logged in and idle on the site for more than a set time 
- THEN I am logged out automatically


## Technologies

- HTML
- CSS (Bulma) 
- Javascript (plus JQuery / Moment)
- Handlebars
- Node.js
- Express
- Sequelize
- MySQL
- Dotenv
- Bcrypt
- Express-connect-session
- Multer
- Socket.io
- Deployed on Heroku

## Documentation

[Drive](https://drive.google.com/drive/folders/1YllmmA5xDgezHvq3V69OUoKFUbQsy_fH)

[Wireframes](https://docs.google.com/presentation/d/1gigxmF-F-vquMnrDmzTlEAxO8XtZ3diWX_d1IswSzFs/edit#slide=id.p)

## Installation

- If you want to run this locally on your machine:
- Clone to your local machine from this repo
- Start by creating the databases by running SOURCE schema.sql;
- Change the .env.example to a .env file with your MySQL credentials
- Type npm i on your terminal to install all dependencies
- Type npm run seed to seed the database
- Type npm start to run the application
- Go to http://localhost:3001/ to use the application

## Project Creators

[ZahraMertens](https://github.com/ZahraMertens) 

[EllaFerreira](https://github.com/EllaFerreira)

[Paolo Garde](https://github.com/rpgarde)


