## Submission Instructions
* **A deployed Heroku URL is not due until Lab 14, but you should start working on deployment for this lab now** 
* Create a pull request from your lab branch branch to your `master` branch
* Open a pull request to this repository
* Submit on canvas 
- a question:  why does a mongoose.Model.update() not do what it's supposed to do!?!?
- and observation: mongoose is a POS.
- your original estimate: 7 hours.
- how long you spent: 7 hours. still not done. bedtime though.
- and a link to your pull request: https://github.com/ashtonkellis/13-14-two-resource-api/pull/2


================================================================
<!-- Lab 14 -->
![cf](https://i.imgur.com/7v5ASc8.png) Lab 14: Express and Mongo two resource REST API
======

## Submission Instructions
* Work in a new branch called `lab-14`
* **Keep your work as separate as possible from `lab-13`**
* Set up Travis CI on your repo
* Deploy your app to Heroku 
* Create a pull request from your lab branch branch to your master branch
* Submit on canvas:
  * your original estimate: 4 hours
  * how long you spent: 5 hours
  * a link to your pull request: https://github.com/ashtonkellis/13-14-two-resource-api/pull/5
  * your deployed Heroku URL: https://lab13-14.herokuapp.com/

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoose guide](http://mongoosejs.com/docs/guide.html)
* [mongoose api docs](http://mongoosejs.com/docs/api.html)

## Feature Tasks  
Continue your work from Lab 13. Refactor your app to utilize the new `modelFinder` middleware demonstrated in lecture. 

## Tests
* Write at least two 409 tests for your routes that would be appropriate for this error. This may mean you will have to put a `unique` flag on one of your schema properties if you haven't done that already in Lab 13. 

## Stretch Goals
* Find and utilize a well-tested and widely-used npm module that can accomplish the same thing our custom `modelFinder` middleware does
* Research the new [ES7 async/await functionality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), and figure out how you can utilize `async/await` in your test modules in place of Promises. [Jest docs can get you started.](http://jestjs.io/docs/en/tutorial-async.html#async-await)

## Documentation
Add your Travis badge to the top of your README. List all of your registered routes and describe their behavior. Describe what your resouce is. Imagine you are providing this API to other developers who need to research your API in order to use it. Describe how a developer should be able to make requests to your API. Refer to the [PokeAPI docs](https://pokeapi.co/docsv2/#resource-lists) for a good example to follow. 