<?php
    require_once __DIR__ . '/rest/services/CategoryService.class.php';

    $categories_service = new CategoryService();
    $data = $categories_service->get_categories();
    header('Content-Type: application/json');
    echo json_encode($data);
?>