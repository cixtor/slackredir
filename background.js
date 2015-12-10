
var messages = document.getElementById('messages_container');
var is_slack = location.hostname.match(/^(.*\.)?slack\.com$/);

function fixTrackingAnchor() {
	sections = this.href.match(/slack-redir\.net\/link\?url=([^&]+)&/);

	if (sections.length >= 2) {
		newhref = decodeURIComponent(sections[1]);
		console.log('FIX:', this.href, '->', newhref);
		this.href = newhref;
	}
}

function addSlackRedirListener() {
	var anchor;
	var newhref;
	var sections;
	var anchors = document.links;

	if (anchors.length > 0) {
		for (var key in anchors) {
			if (typeof anchors[key] === 'object') {
				anchor = anchors[key];

				if (anchor.href !== undefined) {
					if (!anchor.href.match(/^https:\/\/(.*\.)?slack\.com\//)) {
						anchor.removeAttribute('onmousedown');
						anchor.removeAttribute('onmouseover');
						anchor.oncontextmenu = fixTrackingAnchor;
						anchor.onclick = fixTrackingAnchor;
					}
				}
			}
		}
	}
}

if (messages && is_slack) {
	messages.addEventListener('DOMSubtreeModified', function(ev){
		setTimeout(function(){
			addSlackRedirListener();
		}, 2000);
	});
}
