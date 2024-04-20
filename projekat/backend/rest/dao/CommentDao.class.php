<?php

require_once __DIR__ . '/BaseDao.class.php';

class CommentDao extends BaseDao {
    public function __construct() {
        parent::__construct('comments');
    }

    public function get_comments() {
        $query = "select *
        from comments
        order by id DESC;";
        return $this->query($query, []);  
    }

    public function add_comment($payload) {
        return $this->insert('comments', $payload);
    }
}