<?php
    require_once __DIR__ . '/../services/CategoryService.class.php';

    Flight::set('category_service', new CategoryService());
    
    /**
     * @OA\Get(
     *      path="/categories",
     *      tags={"categories"},
     *      summary="Get all categories",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get all categories"
     *      )
     * )
     */
    
    Flight::route('GET /categories', function() {
        $data = Flight::get('category_service')->get_categories();
        Flight::json(
            $data
        );
    });