define('forum/compose', ['hooks'], function (hooks) {
	const Compose = {};

	Compose.init = function () {
		const container = $('.composer');

		if (container.length) {
			hooks.fire('action:composer.enhance', {
				container: container,
			});
		}

		handleAnonymousPost();
	};

	return Compose;
});

function handleAnonymousPost() {
	console.log('handleAnonymousPost function called');
	const $checkbox = $('[component="composer"] .form-check-input');

	require(['socket.io'], function (socket) {
		$checkbox.on('click', function () {
			const isChecked = $checkbox.is(':checked');
			const pid = ajaxify.data.pid;

			socket.emit('plugins.anonymousPosts.updateAnonymousStatus', { pid, anonymous: isChecked }, function (err, result) {
				if (err) {
					console.error('Error updating anonymous post status:', err);
				} else if (result && result.success) {
					console.log('Anonymous post status updated successfully.');
				} else {
					console.error('Failed to update anonymous post status.');
				}
			});
		});
	});
}

