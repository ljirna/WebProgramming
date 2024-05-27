<?php

require_once __DIR__ . '/BaseDao.class.php';

class CommentDao extends BaseDao {
    public function __construct() {
        parent::__construct('comments');
    }

    public function get_comments() {
        $query = "SELECT *
        FROM comments
        ORDER BY id DESC LIMIT 5;";
        return $this->query($query, []);  
    }

    public function add_comment($payload) {
        return $this->insert('comments', $payload);
    }
}