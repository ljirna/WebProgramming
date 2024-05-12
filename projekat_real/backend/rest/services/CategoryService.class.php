<?php

require_once __DIR__ . '/../dao/CategoryDao.class.php';

class CategoryService {
    private $category_dao;

    public function __construct() {
        $this->category_dao = new CategoryDao();
    }

    public function get_categories() {
        return $this->category_dao->get_categories();
    }
}