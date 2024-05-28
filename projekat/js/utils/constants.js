var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/Web-project/WebProgramming/projekat/backend/";
    } else {
      return "https://clownfish-app-d3b48.ondigitalocean.app/backend/";
    }
  },
};
