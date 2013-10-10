(function () {
	var $preview = $('#preview'),
		$edit = $('#edit'),
		$tabs = $('#tabs'),
		$title = $('#title'),
		$content = $('#content'),
		$pTitle = $('#preview-title'),
		$pContent = $('#preview-content'),
		$save = $('#save');

	// check save button on change
	function checkSave() {
		function id(title) {
			var id = title.trim().toLowerCase();
			id = id.replace(/\s+/g, '-');
			id = id.replace(/[^a-zA-Z0-9\-]/g, '');
			return id;
		};

		$save.prop('disabled', id($title.val()) === '');
	}
	$title.on({
		keyup: checkSave,
		change: checkSave
	});

	// render markdown
	function render() {
		var markdown = $content.val(),
			title = $title.val(),
			html = marked(markdown);

		$pTitle.text(title);
		$pContent.html(html);
	}
	render();

	// tabs
	$tabs.on('click', 'li', function (ev) {
		ev.preventDefault();

		$tabs.children('li.active').removeClass('active');
		var tab = $(this).addClass('active').data('tab');

		switch(tab) {
			case 'edit':
				$preview.removeClass('active');
				$edit.addClass('active');
			break;
			default:
				render();
				$edit.removeClass('active');
				$preview.addClass('active');
		}
	});
})();
