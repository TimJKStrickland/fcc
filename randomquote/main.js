var quoteText,
				quoteAuthor;
$(document).ready(function(){
		var newQuote = function(){
			$.ajax({
				url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
				type: "POST",
				dataType: 'json',
				success: function(json){
					quoteText = json.quote;
					quoteAuthor = json.author;
					$('.quoted').html(json.quote);
					$('#author').html("\n – " + json.author);
					$('.jso').html(JSON.stringify(json));
					console.log(quoteAuthor);
				},
				error: function(err) { alert(err) },
				beforeSend: function(xhr){
					xhr.setRequestHeader("X-Mashape-Authorization", "f80MT6ik3xmshknZbmxZr5OnDPvNp1ohNMcjsnuc0iNjlfrXaj");
				}
			});
		};
	$("#newQuote").on("click", function(){
		newQuote();
	});
	$('#tweet').on("click", function(){
		var url = "https://twitter.com/intent/tweet?text=";
		var compUrl = url + quoteText + "%20 --" + quoteAuthor;
		var newTweet = $(this);
		newTweet.attr('href', compUrl);
	})
	
});