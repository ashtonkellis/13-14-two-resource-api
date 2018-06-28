## Submission Instructions
* **A deployed Heroku URL is not due until Lab 14, but you should start working on deployment for this lab now** 
* Create a pull request from your lab branch branch to your `master` branch
* Open a pull request to this repository
* Submit on canvas 
- a question:  
- and observation: 
- your original estimate: 
- how long you spent: 
- and a link to your pull request: 

### MOVIES!!
### `/api/resource-name/:id`
* `PUT` request
  * should pass data as stringifed JSON in the body of a put request to overwrite a pre-existing resource
* `PUT` - test 200, returns a resource with an updated body
* `PUT` - test 400, responds with 'bad request' if no request body was provided
* `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found

* `DELETE` request
  * should pass the id of a resource though the url endpoint to delete a resource
    * **this should use `req.params`**





=====================================

### DINOSAURS!!
* `POST` request
  * should pass data as stringifed JSON in the body of a post request to create a new resource
  * `POST` - test 400, responds with 'bad request' if no request body was provided
  * `POST` - test 200, returns a resource for requests made with a valid body

### `/api/resource-name/:id`
* `GET` request
  * should pass the id of a resource through the url endpoint to get a resource
    * **this should use `req.params`, not querystring parameters**
* `GET` - test 200, returns a resource with a valid body
* `GET` - test 404, respond with 'not found' for valid requests made with an id that was not found

* `PUT` request
  * should pass data as stringifed JSON in the body of a put request to overwrite a pre-existing resource
* `PUT` - test 200, returns a resource with an updated body
* `PUT` - test 400, responds with 'bad request' if no request body was provided
* `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found

* `DELETE` request
  * should pass the id of a resource though the url endpoint to delete a resource
    * **this should use `req.params`**