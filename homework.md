- Create a Respository
- Initialize the Repository
- what are the node_modules, package.json, package-lock.json ?
- Install express
- Create a Server
- Listen to port 7777
- write Request Handlers for /, /hello, /test
- Install nodemon and update scripts inside package.json
- Difference between caret(^) and tilda(~)
- What are the Dependencies?
- What is the use of "-g" while npm install


- Initialize git in your local repository
- .gitignore
- Create a remote repository on github
- Push all code to remote origin
- play with Routes and Extensions example -> /hello, /, /hello/2, /xyz
- IMP:Order of the Routes Matter a lot.
- Install Postman App and make a workspace/collection > test API call
- Write logic to handle GET, POST, PATCH, DELETE API calls and test them on Postman.
- Explore routing and use of ?, +, (), * in the routes.
- Use of regex in routes  /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes


- Multiple Route Handlers - Play with the code
- next()
- next function and error along with res.send()
- app.use("/route",rH, [rH2, rH3], rH4, rH4);
- What is midddleware? why do we need it?
- How expressJS basically handle request behind the scenes.
- Difference Between app.use() Vs app.all().
- Write a dummy auth middleware for admin
- Write a dummy auth middlerware for all user routes, except /user/login
- Error handling using app.use("/",(err,req,res,next) =>{});



- Create a free cluster on MongoDB official website(MongoDB Atlas)
- Install mongoose Library
- Connect your application to the database "connection-url"/devTinder
- Call the connectDB function and connect to the database before starting application on 7777
- Create a user Schema  & user Model
- Create POST /signup API to add data to database
- Push Some documents using API calls from postman
- Error Handling using try, catch



- JavaScript Object VS JSON Difference
- Add the express.json() middleware to your app
- Make your signup API Dynamic to recive data from the end user
- User.findOne() with duplicate emailId's , which object will returned?
- API - get user by email
- Feed API - GET /feed - get all users from the database
- API - get user by ID
- Create a DELETE user API
- difference between PATCH & PUT
- API - Update a user
- Explore the Mongoose Documentation for Model methods.
- What are options in a Model.findOneUpdate() method, explore more about it.
- API - Update the user with Email Id


- Explore Schematype options from the documentation
- add required, unique, lowercase, min, minLength, maxLength, trim
- Add default 
- Create  a custom validate function for gender
- Improve the DB Schema - PUT all appropiate validations on each field in schema  
- Add timestamps to the userSchema
- Add API level validations on PATCH request & signup POST API
- DATA SANITIZATION - Add API validation for each field