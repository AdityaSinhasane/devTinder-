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