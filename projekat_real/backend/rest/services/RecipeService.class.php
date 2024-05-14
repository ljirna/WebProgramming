<?php

require_once __DIR__ . '/../dao/RecipeDao.class.php';

class RecipeService {
    private $recipe_dao;

    public function __construct() {
        $this->recipe_dao = new RecipeDao();
    }

    public function get_recipes() {
        return $this->recipe_dao->get_recipes();
        
    }

    public function get_recipes_by_category($category_id) {
        return $this->recipe_dao->get_recipes_by_category($category_id);
    }
}