<?php
    require_once __DIR__ . '/rest/services/CommentService.class.php';

    $comments_service = new CommentService();
    $data = $comments_service->get_comments();
    header('Content-Type: application/json');
    echo json_encode($data);
?>