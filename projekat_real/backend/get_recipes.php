<?php
    require_once __DIR__ . '/rest/services/RecipeService.class.php';

    $recipes_service = new RecipeService();
    $data = $recipes_service->get_recipes();
    header('Content-Type: application/json');
    echo json_encode($data);
?>