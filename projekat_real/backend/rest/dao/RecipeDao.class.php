<?php

require_once __DIR__ . '/BaseDao.class.php';

class RecipeDao extends BaseDao {
    public function __construct() {
        parent::__construct('recipes');
    }

    public function get_recipes() {
        $query = "SELECT recipes.*, 
        GROUP_CONCAT(ingredients.name SEPARATOR ', ') as recipe_ingredients
        FROM recipes 
        LEFT JOIN ingredients ON recipes.id = ingredients.recipe_id
        GROUP BY recipes.id";
        return $this->query($query, []);  
    }

    public function get_recipes_by_category($category_id) {
        $query = "SELECT recipes.*, GROUP_CONCAT(ingredients.name  SEPARATOR ', ') as recipe_ingredients
        FROM recipes 
        LEFT JOIN ingredients ON recipes.id = ingredients.recipe_id
        WHERE recipes.category_id = ?
        GROUP BY recipes.id";
        return $this->query($query, [$category_id]);  
    }
}