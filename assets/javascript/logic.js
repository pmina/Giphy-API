//I used the auto format and i hope it didn't make it harder to read
//could not get the animation to work :(
var showTitle = [
  "how i met your mother",
  "new girl",
  "orphan black",
  "riverdale",
  "the walking dead",
  "game of thrones",
  "the office",
  "friends",
  "atypical"
];

function createButtons() {
  $("#TVButtons").empty();
  for (var i = 0; i < showTitle.length; i++) {
    var showBtn = $("<button>")
      .text(showTitle[i])
      .addClass("showBtn")
      .attr({ "data-name": showTitle[i] });
    $("#TVButtons").append(showBtn);
  }

  $(".showBtn").on("click", function() {
    $(".display").empty();

    var thisShow = $(this).data("name");
    var giphyURL =
      "https://api.giphy.com/v1/gifs/search?q=tv+show+" +
      thisShow +
      "&limit=10&api_key=mpjh0hKenTMy31oI1My2Whw3K6AI7b6z";
    $.ajax({ url: giphyURL, method: "GET" }).done(function(giphy) {
      var currentGif = giphy.data;
      $.each(currentGif, function(index, value) {
        var animatedGif = value.images.original.url;
        var pausedGif = value.images.original_still.url;
        var thisRating = value.rating;
        var rating = $("<h5>")
          .html("Rated: " + thisRating)
          .addClass("ratingStyle");
        var stillGif = $("<img>")
          .attr("data-animated", animatedGif)
          .attr("data-paused", pausedGif)
          .attr("src", pausedGif)
          .addClass("playOnHover");
        var fullGifDisplay = $("<button>").append(rating, stillGif);
        $(".display").append(fullGifDisplay);
      });
    });
  });
}

$(document).on("click", function() {
  $(this).attr("src", $(this).attr("data-animated"));
});
$(document).on("click", function() {
  $(this).attr("src", $(this).attr("data-paused"));
});

$("#addShow").on("click", function() {
  var newShow = $("#newShowInput")
    .val()
    .trim();
  showTitle.push(newShow);
  createButtons();
  return false;
});

createButtons();
