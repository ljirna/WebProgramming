<?php
require_once __DIR__ . '/../services/RecipeService.class.php';

Flight::set('recipe_service', new RecipeService());

Flight::route('GET /recipes', function () {
    $category_id = Flight::request()->query['category_id'];

    if ($category_id) {
        $data = Flight::get('recipe_service')->get_recipes_by_category($category_id);
    } else {
        $data = Flight::get('recipe_service')->get_recipes();
    }
    Flight::json(
        $data
    );

    /**
     * @OA\Get(
     *      path="/recipes",
     *      tags={"recipes"},
     *      summary="Get all recipes",
     *      @OA\Response(
     *           response=200,
     *           description="Get all recipes"
     *      )
     * )
     */

    Flight::route('GET /recipes', function () {
        $data = Flight::get('recipe_service')->get_all_recipes();
        Flight::json($data);
    });
});
