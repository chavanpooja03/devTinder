-package.json created by writing command npm init;
-package-lock.json have the exact version of dependencies
-Version - devided into major. minor.patch;
-^ used before version for automatic conversion of version;
- Tilde allows only the patch version upgrades avoiding the minor updates while caret allows updates to - - patch as well as minor versions.
- In Node, package.json file contains the list of dependencies and scripts in a project while the - - - - - package-lock.json specifies their respective versions to ensure consistent installations in different environments.
- Dependencies are libraries on which the project relies to function effectively. 
- Installing Packages Globally: Some packages are designed to be used globally across multiple projects. - - To install a package globally, use the -g flag: npm install -g

- use of regex expression
- query parameters

- middleware
- next function
- app.use("/route",rH,[rH2 , rH3], rH4);
- How expressJs handle request behind screen
- error handling
- app.use and app.all
- dummy middleware for admin
- dummy middlewarre for all user routes
- Error handling using app.use("/",(err,req,res,next)=>{})

- create cluster
- install mongoose lobrary
- connect mongodb to database
- call mongoDb first and then listen on to server

- schema validation
- lowercase,required,uppercase,maxLength,minLength,unique,default,trim
- create custom validation function for gender
- Improve DB schema- put appropriate validations on each field in schema
- add timestamps to userSchema
- Add API level validations on patch post signup
-Data sanitizing for each field
- install validator
- never trust req.body

-login and signup using jwt token
-1.LoginApi-create token by using bcrypt.compare();
-2.send the cookies
-SignUp
-1.request the cookie,verify the user by using bcrypt.verify
-userAuth middleware
-Set the expiry of jwt token and middleware


