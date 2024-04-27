$(document).ready(function () {
  console.log("Script loaded!");
  console.log("Constants", Constants.API_BASE_URL);

  // Get categories for navbar
  RestClient.get("get_categories.php", function (data) {
    console.log("Categories loaded!", data);
    const categoriesContainer = document.querySelector("#categories");
    data.forEach((category) => {
      const newCategory = document.createElement("li");
      let href;
      if (category.name === "All recipes") {
        href = "#receipe-post";
      } else if (category.name === "Healthy recipes") {
        href = "#healthy-recipes";
      } else {
        href`#categories?${category.name}`;
      }
      newCategory.innerHTML = `<a href="${href}" class="dropdown-item">${category.name}</a>`;
      categoriesContainer.appendChild(newCategory);
    });

    $(".navbar-nav>li>a").on("click", function () {
      $(".navbar-collapse").collapse("hide");
    });
  });

  var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/",
    pageNotFound: "home",
  });

  app.route({
    view: "contact",
    load: "contact.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Contact is ready!");
      initNewsletterForm("newsletter-form");
    },
  });
  function initNewsletterForm(form_id) {
    $(".alert-danger").hide();
    $(".alert-success").hide();

    $(`#${form_id}`).validate({
      rules: {},
      invalidHandler: function (event, validator) {
        $(".alert-danger").show();
        console.log("Invalid form");
      },
      submitHandler: function (form, event) {
        event.preventDefault();
        let data = {};
        $.each($(form).serializeArray(), function () {
          console.log(this.name, this.value);
          data[this.name] = this.value;
        });

        console.log("valid form", data);
        RestClient.post(
          "add_newsletter.php",
          data,
          function (response) {
            console.log("Contact added", response);
            $(".alert-success").show();
          },
          function (error) {
            console.log("Error adding contact", error);
            $(".alert-danger").show();
          }
        );
      },
    });
  }
  // Home app route
  app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Home is ready!");
      RestClient.get(
        "get_recipes_by_category.php?category_id=2",
        function (data) {
          console.log("Rest client data: ", data);
          const recipesContainer = document.querySelector("#recipes");
          recipesContainer.innerHTML = "";
          data.forEach((recipe, index) => {
            console.log(index, recipe);
            const newRecipeContainer = document.createElement("div");
            newRecipeContainer.classList.add("col-md-4"); // Adjust column size as needed
            newRecipeContainer.innerHTML = `
              <div class="single-best-receipe-area mb-30">
                  <img src="${recipe.image_name}" alt="${recipe.name}" />
                  <div class="receipe-content">
                      <h5>${recipe.name}</h5>
                      <p>Ratings: ${
                        "★".repeat(recipe.stars) + "☆".repeat(5 - recipe.stars)
                      }</p>
                  </div>
              </div>
          `;
            recipesContainer.appendChild(newRecipeContainer);
          });
        }
      );

      RestClient.get("get_comments.php", function (data) {
        console.log("Rest comments data: ", data);
        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.innerHTML = "";
        data.forEach((comment) => {
          const newCommentContainer = document.createElement("div");
          newCommentContainer.classList.add("card");
          newCommentContainer.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${comment.email}</h5>
              <p class="card-text">${comment.text}</p>
            </div>
              `;
          commentsContainer.appendChild(newCommentContainer);
        });
      });

      $(".alert-danger").hide();
      $(".alert-success").hide();

      $("#add-comment-form").validate({
        rules: {
          text: "required",
          email: {
            required: true,
            email: true,
          },
        },
        invalidHandler: function (event, validator) {
          $(".alert-danger").show();
          console.log("Invalid form");
        },
        submitHandler: function (form, event) {
          event.preventDefault();
          let data = {};
          $.each($(form).serializeArray(), function () {
            console.log(this.name, this.value);
            data[this.name] = this.value;
          });

          console.log("valid form", data);
          RestClient.post(
            "add_comment.php",
            data,
            function (response) {
              console.log("Comment added", response);
              window.location.reload();
              $(".alert-success").show();
            },
            function (error) {
              console.log("Error adding comment", error);
              $(".alert-danger").show();
            }
          );
        },
      });
    },
  });

  // Recipes app route
  app.route({
    view: "receipe-post",
    load: "receipe-post.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Recipe post is ready!");
      RestClient.get("get_recipes.php", function (data) {
        console.log("Rest client data: ", data);
        renderRecipes(data, "recipes-container");
      });
    },
  });

  // Healthy recipes app route
  app.route({
    view: "healthy-recipes",
    load: "healthy-recipes.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Healthy post is ready!");
      RestClient.get(
        "get_recipes_by_category.php?category_id=2",
        function (data) {
          console.log("Rest client data: ", data);
          renderRecipes(data, "healthy-recipes-container");
        }
      );
    },
  });

  app.run();
});

function renderRecipes(data, container_id) {
  const receipePostDiv = document.getElementById(container_id);
  console.log("Recipes container", receipePostDiv);
  receipePostDiv.innerHTML = "";
  data.forEach((recipe) => {
    const recipeHtml = `
            <div class="recipe">
                <div class="row">
                    <div class="receipe-headline my-5">
                        <h2>${recipe.name}</h2>
                        <br>
                        </br>
                        <img src="${recipe.image_name}" alt="${recipe.name}">
                        <div class="receipe-duration">
                        <h6>Prep: ${recipe.preparation}</h6>
                        <h6>Cook: ${recipe.cook_time}</h6>
                        <h6>Yields: ${recipe.amount}</h6>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="receipe-ratings my-5">
                        <div class="ratings">
                            Ratings: ${
                              "★".repeat(recipe.stars) +
                              "☆".repeat(5 - recipe.stars)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="single-preparation-step d-flex">
                        <p>${recipe.description}</p>
                    </div>
                </div>

                <div class="col-12 col-lg-4">
                    <div class="ingredients">
                        <div class="custom-control custom-checkbox">
                            <label>${recipe.recipe_ingredients}</label>
                        </div>            
                    </div>
                </div>
            </div>`;
    receipePostDiv.innerHTML += recipeHtml;
  });
}
