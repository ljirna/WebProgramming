<?php
    require_once __DIR__ . '/rest/services/NewsletterService.class.php';
    $payload = $_REQUEST;

    $newsletters_service = new NewsletterService();
    $data = $newsletters_service->add_newsletters($payload);
    header('Content-Type: application/json');
    echo json_encode(['message' => "You have successfully subscribed for newsletter", 'data' => $data]);
?>