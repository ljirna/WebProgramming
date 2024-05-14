<?php
    require_once __DIR__ . "/../config.php";


    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    function authenticate() {
        $token = Flight::request()->getHeader('Authentication');
        if (!$token) {
            Flight::halt(401, 'Token not provided');
        }

        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            $id = $decoded->user->id;
            Flight::set('user', $id);
        } catch (Exception $e) {
            Flight::halt(401, "Invalid token");
        }
    }