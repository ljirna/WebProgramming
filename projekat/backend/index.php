<?php

// If you're using Composer, require the autoloader.
require 'vendor/autoload.php';

// if you're not using Composer, load the framework directly
// require 'flight/Flight.php';

// Then define a route and assign a function to handle the request.
Flight::route('/', function () {
  echo 'hello world!';
});

require 'rest/routes/middleware_routes.php';
require 'rest/routes/auth_routes.php';
require 'rest/routes/category_routes.php';
require 'rest/routes/comment_routes.php';
require 'rest/routes/recipe_routes.php';
require 'rest/routes/newsletter_routes.php';
require 'rest/routes/user_routes.php';
// Finally, start the framework.
Flight::start();