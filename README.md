# Softoom

---

by team EmptyStackDevelopers

### Team members with student numbers

Miao Han, 1007423566

### Description of the web application

Softoom is a casual game that brings the player's own thoughts, personality and behavior into a virtual world.<br/>
It is an independent(no interact) game in which it doesn't require players to invest a lot of times and effort on it, but can make playes relax mentally. Enjoy<br/>
the feeling of living in a cozy and comfortable room. <br/>

- This application creates a 3D room for every user and every user has his/her own 3D character model. Players <br/>
  are able to move in their room. <br/>
- When a user sign up, a 3D room with all furniture created, style base on the gender that user selected<br/>
- The 3D room contains a food menu and a fridge, where they can order food and store it in the fridge.<br/>
- Each user has a hunger value, and it decreases as time passes. If the hunger value decreases to 0,<br/>
  the user will be hungry and you will need to feed them, but it is not forced<br/>
- The user can gain hunger value by ordering food. Buying food requires payment.<br/>
- On delivery, food can be consumed right away, or be stored in the fridge.<br/>

### What complexity points will this project contain

- Email Delivery, API, Marketing Service | SendGrid
- Stripe | Payment Processing Platform for the Internet
- Three.js – JavaScript 3D Library

### (optional) What complexity points will be attempted as bonus for the challenge factor

- Email Delivery, API, Marketing Service | SendGrid
- PeerJS - Simple peer-to-peer with WebRTC
- Web audio API - Web APIs
- Auth0

### What you aim to complete for the alpha version, beta version, and final version

- For alpha version, we are going deploy a single 3d room for each user signed up. A food menu and a fridge would be available in<br/>
  the room as well.<br/>
- For beta version, we are going to deploy the player movement, food order/payment and fridge storage features.<br/>
- For final version, we are going to increate the looking and function of order confirmation through email<br/>

### video link

https://youtu.be/RDJMhaDrBFE

### Manually Set Up On localhost
Go to develop branch (main is trying to deploy)<br/>
Frontend:<br/>
cd frontend/Softoom<br/>
npm install<br/>
npm run ng serve<br/>
Backend:<br/>
cd backend<br/>
npm install<br/>
npx nodemon app.js<br/>
Then the web app will be served on http://localhost:4200/
