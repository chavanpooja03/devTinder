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
SignUp-
-1.Enter the info,including password
-2.Hash the password using bcrypt.hash(password,rounds);
-3.save user in database

Login-
-1.Take the email ans password,
-2.See weather the user is present in database or not
-3.compare the password entered by user and the hashed password stored in db
-4.if the password is validated
-5.create a token by passing id,privateKey and expire using jwt.sign({id:_id},"dndgnjng");
-6.wrap that token inside cookies ans send cookies using res.cookies("token",token);

Profile-
-1.To see weather the logged in user is accessing the api
-2.request the token from cookie
-3.get the id from token by using jwt.verify(token,privateKey);
-4.if the id is found in db then gives accesss to profile api
-5.create separate auth function to check verify the user 
