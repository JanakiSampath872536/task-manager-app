# task-manager-app
The task management app is designed to streamline the organization and tracking of tasks for individuals. With features including adding tasks, deleting tasks, retrieving all tasks, user login, and adding users, the app offers comprehensive functionality to enhance productivity and collaboration. 

# Setting up the project:

1. Import project in Visual Studio Code: Open the project directory in Visual Studio Code to access and edit project files within the IDE's environment.
2. Install Dependencies:
   ⦁	npm init -y: Initialize a new Node.js project with default values, skipping interactive prompts, and generating a "package.json" file automatically.
   ⦁	npm install express mongoose body-parser: Install required Node.js packages for building a web server and interacting with MongoDB. Express is a web 
      application framework, Mongoose is an ODM for MongoDB, and Body-parser is middleware for parsing request bodies in Express.
   ⦁	npm install bcrypt: Install bcrypt, a library for hashing passwords securely, commonly used for user authentication in web applications.
   ⦁	npm install passport-local-mongoose: Install Passport-local-mongoose, a Passport.js plugin for integrating Mongoose-based user authentication with 
      Passport.js, simplifying authentication processes in Node.js applications.
3. Connect to MongoDB:
   Ensure that MongoDB is installed and running.
   If you don't have a MongoDB connection, use Mongoose to connect your application to MongoDB.
4. Run the Server:
   use command - node server.js
5. Test in Browser:
   Open your browser and navigate to your server's URL -  http://localhost:9000/
   Ensure that your app is running successfully.

