$(document).ready(function () {
  console.log("Script loaded!");
  console.log("Constants", Constants.get_api_base_url());

  const currentUser = window.localStorage.getItem("user");
  if (currentUser) {
    console.log("Current user", currentUser);
    $("#login-link").addClass("d-none");
    $("#logout-link").removeClass("d-none");
    $("#account-link").removeClass("d-none");
  }

  // Get categories for navbar
  RestClient.get("categories", function (data) {
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
        href = `#categories?${category.name}`;
      }
      newCategory.innerHTML = `<a href="${href}" class="dropdown-item">${category.name}</a>`;
      categoriesContainer.appendChild(newCategory);
    });
    $(".navbar-nav>li>a")
      .not(".dropdown-toggle")
      .on("click", function () {
        $(".navbar-collapse").collapse("hide");
      });
  });
  var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/",
    pageNotFound: "home",
  });
  //Contact app route
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
          "newsletters",
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
      RestClient.get("recipes?category_id=2", function (data) {
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
      });
      //Comments
      RestClient.get("comments", function (data) {
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
            "comments",
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
      RestClient.get("recipes?category_id=2", function (data) {
        console.log("Rest client data: ", data);
        renderRecipes(data, "healthy-recipes-container");
      });
    },
  });
  //Login app route
  app.route({
    view: "login",
    load: "login.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Signin is ready!");
      $("#signin-form").validate({
        rules: {
          password: "required",
          email: {
            required: true,
            email: true,
          },
        },
        invalidHandler: function (event, validator) {
          $(".alert-danger").show();
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
            "login",
            data,
            function (response) {
              console.log("User logged in", response);
              window.localStorage.setItem("token", response.token);
              window.localStorage.setItem("user", response.email);
              window.location.hash = "#home";
              window.location.reload();
            },
            function (error) {
              console.log("error", error);

              $(".alert-danger").show();
            }
          );
        },
      });
    },
  });
  //Signup app route
  app.route({
    view: "signup",
    load: "signup.html",
    onCreate: function () {},
    onReady: function () {
      $(".alert-danger").hide();
      $("#signup-form").validate({
        rules: {
          password: "required",
          password_confirmation: "required",
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
            "users",
            data,
            function (response) {
              console.log("Comment added", response);
              window.location.hash = "#signin";
            },
            function (error) {
              $(".alert-danger").show();
            }
          );
        },
      });
    },
  });
  //Logout app route
  app.route({
    view: "logout",
    load: "logout.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Logout is ready!");
      window.localStorage.clear();
      window.location.hash = "#home";
      window.location.reload();
    },
  });

  app.route({
    view: "account",
    load: "account.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Account is ready!");
      RestClient.get("users/current", function (data) {
        console.log("Current user: ", data);
        $("#email").val(data.email);
        $("#name").val(data.name);
        $("#dob").val(data.dob);
        $("#phone").val(data.phone);
        $("#bio").val(data.bio);

        $("#account-form").validate({
          rules: {
            password: "required",
            password_confirmation: "required",
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
              "users/me",
              data,
              function (response) {
                console.log("Account updated", response);
              },
              function (error) {
                $(".alert-danger").show();
              }
            );
          },
        });
      });
      deleteAccount();
    },
  });
  app.run();
});

function deleteAccount() {
  $("#delete-button").on("click", function () {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      RestClient.delete(
        "users/current",
        {},
        function (response) {
          console.log("Account deleted", response);
          window.localStorage.clear();
          alert("Account deleted successfully!");
          window.location.hash = "#home";
          window.location.reload();
        },
        function (error) {
          console.log("Error deleting account", error);
          alert("Error deleting account");
        }
      );
    }
  });
}

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
function postComment() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  console.log("Form submitted with the following data:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);
}
