/*global define, $*/
define([
	'order!../lib/jquery-1.6.4.min',
	'order!../lib/ios-orientationchange-fix.min',
	'order!../lib/jquery.mobile-1.0.1.min',
	'order!../lib/jquery-ui.min',
	'order!../lib/raphael',
	'order!../lib/js-mindmap'
], function () {
	"use strict";
	$.widget("scruffian.wordMapp", {
		_create: function () {
			var self = this,
				$this = this.element,
				wordMappMarkup = $('<form/>');
			wordMappMarkup.append('<div/>').attr('data-role', 'fieldcontain').addClass('ui-hide-label').append('<label/>');
			wordMappMarkup.find('div').append('<input type="text" />');
			wordMappMarkup.find('label').attr('for', 'word');
			wordMappMarkup.find('input').attr({
				'name': 'word',
				'id': 'word',
				'value': '',
				'placeholder': 'Word'
			});
			$this.append(wordMappMarkup);
			$this.append('<div class="wordMappBody"/>');
			$this.closest('.ui-page').trigger('create');
			$this.find('form').submit(function (event) {
				event.preventDefault();
				event.stopPropagation();
				var word = $('[name=word]').val(),
					url = $this.attr('data-url').replace(/{word}/gi, word);
				$('.wordMappBody').html('Loading tree for ' + word);
				$('svg').remove('');
				self.createTree(word, url);
			});
		},
		createTree: function (word, url) {
			var self = this;
			this.mindMap = $('.wordMappBody').mindmap();
			this.nodes = {};

			// add the data to the mindmap
			this.nodes[word] = this.mindMap.addRootNode(word, {});
			$.ajax({
				url: url,
				dataType: 'json',
				success: function (data) {
					if (typeof (self.options.level) !== 'undefined') {
						data = data.level;
					}
					self.buildTree(word, data);
				}
			});
		},
		buildTree: function (root, data) {
			var self = this;
			$.each(data, function (parent, children) {
				if (typeof (parent) === "number") {
					self.addLeaf(root, children);
				} else {
					self.addLeaf(root, parent);
				}
				if (typeof (children) === 'object') {// && children is not array) {
					self.buildTree(parent, children);
				}
			});
		},
		addLeaf: function (parent, word) {
			var self = this;
			self.nodes[word] = self.mindMap.addNode(self.nodes[parent], word, {
				'className': word,
				'id': word
			});
			self.mindMap.addLine(self.nodes[word], self.nodes[parent]);
		}
	});
});