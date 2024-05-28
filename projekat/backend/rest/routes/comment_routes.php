<?php
require_once __DIR__ . '/../services/CommentService.class.php';

Flight::set('comment_service', new CommentService());
/**
 * @OA\Get(
 *      path="/comments",
 *      tags={"comments"},
 *      summary="Get all comments",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get all comments"
 *      )
 * )
 */
Flight::route('GET /comments', function () {
    echo "GET comments";
    $data = Flight::get('comment_service')->get_comments();
    Flight::json(
        $data
    );
});
/**
 * @OA\Post(
 *      path="/comments",
 *      tags={"comments"},
 *      summary="Post a comment",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Post a comment"
 *      ),
 *     @OA\RequestBody(
 *     description="Comment data payload",
 *     @OA\JsonContent(
 *         required={"email","text"},
 *         @OA\Property(property="email", type="string", example="example@example.com"),
 *         @OA\Property(property="text", type="string", example="message")
 * )
 * 
 * )
 * )
 */
Flight::route('POST /comments', function () {
    $data = Flight::request()->data->getData();
    $comment = Flight::get('comment_service')->add_comment($data);
    Flight::json(
        $comment
    );
});
