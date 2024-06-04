<?php
require_once __DIR__ . '/../services/UserService.class.php';
Flight::set('user_service', new UserService());

/**
 * @OA\Post(
 *      path="/users",
 *      tags={"users"},
 *      summary="Add user data to database",
 *      @OA\Response(
 *           response=200,
 *           description="Patient data, or error message if email already exists or password and confirm password do not match"
 *      ),
 *     @OA\RequestBody(
 *          description="User data payload",
 *          @OA\JsonContent(
 *             required={"email", "password", "passwordconfirm"},
 *             @OA\Property(property="email", type="string", example="example@example.com", description="User email"),
 *             @OA\Property(property="password", type="string", example="password", description="User password"),
 *             @OA\Property(property="password_confirmation", type="string", example="password", description="User password")
 * 
 * )
 * )
 * )
 */
Flight::route('POST /users', function () {
    $data = Flight::request()->data->getData();

    if (!isset($data['email']) || !isset($data['password']) || !isset($data['password_confirmation'])) {
        Flight::halt(400, 'Email, password and confirm password are required');
    }

    if ($data['password'] !== $data['password_confirmation']) {
        Flight::halt(400, 'Password and confirm password do not match');
    }

    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    unset($data['password_confirmation']);

    $user = Flight::get('user_service')->add_user($data);
    Flight::json(
        $user
    );
});

/**
 * @OA\Get(
 *      path="/users/current",
 *      tags={"users"},
 *      summary="Get current user",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get current user"
 *      )
 * )
 */
Flight::route('GET /users/current', function () {
    $current_user_id = Flight::get('user');

    $user = Flight::get('user_service')->get_user_by_id($current_user_id);
    Flight::json(
        $user
    );
});

/**
 * @OA\Get(
 *      path="/user",
 *      tags={"users"},
 *      summary="Get user by id",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Re
 *      @OA\Response(
 *           response=200,
 *           description="User data or false if user does not exist"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="user_id", example="1", description="User ID")
 * )
 */

Flight::route('GET /user', function () {
    $params = Flight::request()->query;
    $user = Flight::get('user_service')->get_user_by_id($params['user_id']);
    Flight::json($user);
});

/**
 * @OA\Get(
 *      path="/users",
 *      tags={"users"},
 *      summary="Get all users",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Re
 *      @OA\Response(
 *           response=200,
 *           description="Get all users"
 *      )
 * )
 */

Flight::route('GET /users', function () {
    $users = Flight::get('user_service')->get_users();
    Flight::json($users);
});

/**
 * @OA\Post(
 *      path="/users/me",
 *      tags={"users"},
 *      summary="Update current user information",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Re
 *      @OA\Response(
 *           response=200,
 *           description="Update current user"
 *      ),
 *  @OA\RequestBody(
 *          description="User data payload",
 *          @OA\JsonContent(
 *             @OA\Property(property="id", type="string", example="1", description="User id"),
 *             @OA\Property(property="name", type="string", example="some name", description="User name"),
 *             @OA\Property(property="phone", type="number", example="1233456", description="User phone number"),
 *             @OA\Property(property="email", type="string", example="example@example.com", description="User email"),
 *             @OA\Property(property="dob", type="string", example="2024-04-21", description="User dob"),
 *             @OA\Property(property="bio", type="string", example="password", description="User password")
 * )
 * )
 * )
 */

Flight::route('POST /users/me', function () {
    $current_user_id = Flight::get('user');
    $data = Flight::request()->data->getData();
    $user = Flight::get('user_service')->update($current_user_id, $data);
    Flight::json(
        $user
    );
});

/**
 * @OA\Delete(
 *      path="/users/current",
 *      tags={"users"},
 *      summary="Delete current user",
 *      security={
 *         {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="User deleted"
 *      ), 
 *     @OA\Parameter(@OA\Schema(type="number"), in="query", name="user_id", example="1", description="User ID")
 * )
 */

Flight::route('DELETE /users/current', function () {
    $current_user_id = Flight::get('user');
    Flight::get('user_service')->delete_user($current_user_id);
    Flight::json(['message' => 'User deleted']);
});


