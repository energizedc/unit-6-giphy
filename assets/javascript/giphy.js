
var topics = [];
var i=0;
/////////////////////////////////////////////////////////////////////////////////
//   This is the function to make buttons                                 ///////
/////////////////////////////////////////////////////////////////////////////////
function makeButtons() {

        $("#got-buttons").empty();

        for (i = 0; i < topics.length; i++) {
            var b = $("<button>");
            b.addClass("show-btn");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);

            $("#got-buttons").append(b);
        };
        };

/////////////////////////////////////////////////////////////////////////////////
//   This is the function that loads the users input on Submit            ///////
/////////////////////////////////////////////////////////////////////////////////

$("#submit").on("click", function(event) {

event.preventDefault();

var character = $("#tvAnswer").val().trim();

topics.push(character);
$("#tvAnswer").val("");

makeButtons();

console.log(topics);
});




	//FUNCTION FOR GRABBING GIPHY API CONTENT

  function dataPull() {
   console.log("i am in data pull now");
    var characterName = $(this).attr("data-name");
    console.log(characterName);
    var characterStr = characterName.split(" ").join("+");
    console.log(characterStr);
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr + "&api_key=Q3fj9i97DlmW4nsSBvsyRFwxwhXxMus0&limit=10";
    console.log(giphyURL);
    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function(response) {
   
        console.log(giphyURL);
        console.log(response);

        results = response.data;

        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {
          console.log("i am in the gif's for loop now")
          var characterDiv = $("<div>");
          var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
          var characterImage = $("<img>");

          para.addClass("rating-text")
          
          characterImage.addClass("image-gifs")
          characterImage.attr("src", results[i].images.fixed_height_still.url);
          characterImage.attr("data-state", "still");
          characterImage.attr("data-position", i);

          characterDiv.append(para);
          characterDiv.append(characterImage);
          characterDiv.addClass("individual-gifs")

          $("#gifs").prepend(characterDiv);

   }; //ENDS FOR LOOP
 }); // ENDS AJAX FUNCTION

};

    // Use document on click function to apply function for elements AFTER the page has loaded

    $(document).on("click", ".show-btn", dataPull);

    // ANIMATE GIFS

function gifAnimation() {
      var state = $(this).attr("data-state");
      var position = $(this).attr("data-position"); //will return a string
      position = parseInt(position); //string to integer

      console.log(results[position].images.fixed_height.url);
      console.log(position);

      if (state === "still") {
        console.log("we're here");
        $(this).attr("src", results[position].images.fixed_height.url);
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", results[position].images.fixed_height_still.url);
        $(this).attr("data-state", "still");
      }
      };

      $(document).on("click", ".image-gifs", gifAnimation);


