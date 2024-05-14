<?php
    require_once __DIR__ . '/rest/services/CommentService.class.php';
    $payload = $_REQUEST;

    $comments_service = new CommentService();
    $data = $comments_service->add_comment($payload);
    header('Content-Type: application/json');
    echo json_encode(['message' => "You have successfully added the comment", 'data' => $data]);
?>