(function () {
	var $content = $('#content');
	var $articleBody = $('#article > .body');
	var $preview = $('#preview');
	var $render = $('#editor .body');
	var $title = $('#title');
	var $editor = $('#editor');

	// initialize
	var markdown = $content.val();
	var html = marked(markdown);
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
		var markdown = $content.val();
		var html = marked(markdown);
		$render.height($content.height())
			.html(html)
			.show();
		$preview.children('span')
			.removeClass('glyphicon-eye-open')
			.addClass('glyphicon-eye-close');
	}


	var oldTitle, oldContent;
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
