<?php
    require_once __DIR__ . '/../services/CategoryService.class.php';

    Flight::set('category_service', new CategoryService());

    Flight::route('GET /categories', function() {
        $data = Flight::get('category_service')->get_categories();
        Flight::json(
            $data
        );
    });