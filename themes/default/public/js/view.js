/*global marked:false */
(function () {
	var $content = $('#content'),
		$articleBody = $('#article > .body'),
		$preview = $('#preview'),
		$render = $('#editor .body'),
		$title = $('#title'),
		$editor = $('#editor'),
		oldTitle, oldContent;

	// initialize
	var markdown = $content.val(),
		html = marked(markdown);
	$articleBody.html(html);

	function showMarkup() {
		$render.hide();
		$content.show();
		$preview.children('span')
			.removeClass('glyphicon-eye-close')
			.addClass('glyphicon-eye-open');
	}

	function showPreview() {
		$content.hide();

		var markdown = $content.val(),
			html = marked(markdown);

		$render.height($content.height())
			.html(html)
			.show();
		$preview.children('span')
			.removeClass('glyphicon-eye-open')
			.addClass('glyphicon-eye-close');
	}

	$editor.on('show.bs.modal', function () {
		// reset title on edit
		if (!oldTitle) {
			oldTitle = $title.val();
		}
		else {
			$title.val(oldTitle);
		}

		// reset content on edit
		if (!oldContent) {
			oldContent = $content.val();
		}
		else {
			$content.val(oldContent);
		}

		showMarkup();
	});

	// preview edited article
	$preview.click(function () {
		if ($render.is(':hidden')) {
			showPreview();
		}
		else {
			showMarkup();
		}
	});
})();
