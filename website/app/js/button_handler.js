$(function() {
    $("#btn-animation-network-pause").toggle()
    $("#btn-animation-wordcloud-pause").toggle()
    $("#btn-animation-age-pause").toggle()
    $("#btn-animation-genres-pause").toggle()
})

$("#btn-animation-network-play").on("click", function() {
    $("#btn-animation-network-play").toggle()
    $("#btn-animation-network-pause").toggle()
  });

$("#btn-animation-network-pause").on("click", function() {
    $("#btn-animation-network-play").toggle()
    $("#btn-animation-network-pause").toggle()
});

$("#btn-animation-wordcloud-play").on("click", function() {
    $("#btn-animation-wordcloud-play").toggle()
    $("#btn-animation-wordcloud-pause").toggle()
  });

$("#btn-animation-wordcloud-pause").on("click", function() {
    $("#btn-animation-wordcloud-play").toggle()
    $("#btn-animation-wordcloud-pause").toggle()
});

$("#btn-animation-age-play").on("click", function() {
    $("#btn-animation-age-play").toggle()
    $("#btn-animation-age-pause").toggle()
  });

$("#btn-animation-age-pause").on("click", function() {
    $("#btn-animation-age-play").toggle()
    $("#btn-animation-age-pause").toggle()
});

$("#btn-animation-genres-play").on("click", function() {
  $("#btn-animation-genres-play").toggle()
  $("#btn-animation-genres-pause").toggle()
});

$("#btn-animation-genres-pause").on("click", function() {
  $("#btn-animation-genres-play").toggle()
  $("#btn-animation-genres-pause").toggle()
});