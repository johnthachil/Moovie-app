// Initialize app and store it to myApp variable for futher access to its methods

var myApp = new Framework7({
    modalTitle: 'Framework7',
    material: true,
    pushState: true,
    precompileTemplates: true,
    pushStateSeparator:"",
});
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var globalTemplate;
var pageNumber = 1

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:

});
$$(document).on('ajaxStart', function (e) {

    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {

    myApp.hideIndicator();
});

function createTemplate(data,templateId,appendLoc) {
  console.log(data);
  console.log(templateId);
  console.log(appendLoc);

  var template = $$(templateId).html();
  var compiledTemplate = Template7.compile(template);
  $$(appendLoc).append(compiledTemplate(data));

}

function domAppend(apiUrl,templateId,appendLoc){
  $$.getJSON(apiUrl,function(jsonData){
     createTemplate(jsonData.data,templateId,appendLoc);
     $$('#show-hide-btn').show();

  });
}

myApp.onPageInit('about', function (page) {
  apiUrl = 'https://yts.ag/api/v2/list_movies.json?limit=20&page=' + pageNumber;
  templateId = '#moviesListTemplate';
  appendLoc = '#content-wrap';
  domAppend(apiUrl,templateId,appendLoc);

})
myApp.onPageAfterBack('about', function (page) {
  pageNumber = 1;
})
function loadMoreMovies(){
  pageNumber++;
  apiUrl = 'https://yts.ag/api/v2/list_movies.json?limit=20&page=' + pageNumber;
  templateId = '#moviesListTemplate';
  appendLoc = '#content-wrap';
  domAppend(apiUrl,templateId,appendLoc);
}



myApp.onPageInit('movie', function (page) {
  apiUrl = 'https://yts.ag/api/v2/movie_details.json?movie_id=' + page.query.id;
  templateId = '#movie-detail';
  appendLoc = '#movie-wrap';
  domAppend(apiUrl,templateId,appendLoc);

})
