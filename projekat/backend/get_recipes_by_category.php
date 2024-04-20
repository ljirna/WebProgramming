<?php
    require_once __DIR__ . '/rest/services/RecipeService.class.php';

    $category_id = $_GET['category_id'];
    $recipes_service = new RecipeService();
    $data = $recipes_service->get_recipes_by_category($category_id);
    header('Content-Type: application/json');
    echo json_encode($data);
?>