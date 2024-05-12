var RecipeService = {
  reload_recipes_datatable: function () {
    RestClient.get("get_recipes.php", function (data) {
      console.log("Recipes loaded!", data);
    });
  },
};
