<?php

require_once __DIR__ . '/BaseDao.class.php';

class CategoryDao extends BaseDao {
    public function __construct() {
        parent::__construct('categories');
    }

    public function get_categories() {
        $query = "SELECT *
                  FROM categories;";
        return $this->query($query, []);  
    }
}