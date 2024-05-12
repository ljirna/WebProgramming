<?php

require_once __DIR__ . '/../dao/CommentDao.class.php';

class CommentService {
    private $comment_dao;

    public function __construct() {
        $this->comment_dao = new CommentDao();
    }

    public function get_comments() {
        return $this->comment_dao->get_comments();
    }

    public function add_comment($payload) {
        return $this->comment_dao->add_comment($payload);
    }
}