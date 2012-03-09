/*global define, $, module, test, ok */
define([
	'../lib/qunit',
	'../src/wordMapp'
], function () {
	"use strict";
	$('body').append('<div class="tests" style="position: fixed; bottom: 0; left: 0; right: 0;"><h1 id="qunit-header">jQuery Mobile Page Test Suite</h1><h2 id="qunit-banner"></h2><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol></div>');
	module("wordMapp");
	test("wordMapp widget loaded", function () {
		$('.wordMapp').find('form').find('[name=word]').val('love');
		$('.wordMapp').find('form').trigger('submit');
		ok($('.wordMappBody').hasClass('js-mindmap-active'));
		ok($('svg').length > 0);
	});
	test('wordMapp widget has a root element', function () {
		ok($('.wordMappBody').find('a'));
	});
});