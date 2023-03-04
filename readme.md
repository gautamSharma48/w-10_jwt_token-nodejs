# module.exports
 -module respresent the current module
 -exports is an object that will be exposed as module
 -for local module pass a path directory
 -third party module or package dont need for path directory simply used by name

# model
 -model will help you communicate with those particular collections that will saved on db.

 # app use
 The app.use method is used to configure middleware functions that will be used for all incoming requests. The first middleware function is express.json(), which is used to parse incoming JSON data in the request body. The second middleware function is router, which is an instance of an Express Router object that defines routes for the application.