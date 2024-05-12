<?php
    require_once __DIR__ . '/../services/CommentService.class.php';
    require_once __DIR__ . '/../utils.php';


    Flight::set('comment_service', new CommentService());

    Flight::route('GET /comments', function() {
        $data = Flight::get('comment_service')->get_comments();
        Flight::json(
            $data
        );
    });

    Flight::route('POST /comments', function() {
        authenticate();
        $data = Flight::request()->data->getData();
        $comment = Flight::get('comment_service')->add_comment($data);
        Flight::json(
            $comment
        );
    });