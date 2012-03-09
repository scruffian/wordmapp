/*global require, $*/
require({
	baseUrl: "js",
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'src/wordMapp'
], function () {
	"use strict";
	//$(document).bind("pageinit", function (event) {
		$('.wordMapp').wordMapp();
	//});
	if ($('body').hasClass('tests')) {
		require(['tests/wordMapp']);
	}
});