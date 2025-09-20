// import { copyToClipboard } from './content-script';

console.log('WebExtension initialised.');

browser.pageAction.onClicked.addListener((tab) => {
	console.clear();
	console.log('tab information:', tab);
	handleAsync(tab);
});

/**
 * @param {browser.tabs.Tab} tab
 */
async function handleAsync(tab) {
	try {
		if (tab.title === null || tab.url === null) {
			console.log(`no url info provided by tab`);
		}
		console.log(`tab address: [${tab.title}: ${tab.url}]`);
		await writeToClipboard(tab.title, tab.url).then((r) =>
			console.log('copyToClipboard response:', r)
		);
	} catch (ex) {
		console.error('run error:', ex);
	}
}

/**
 * Copy current tab url as a hyperlink to the clipboard
 * @param {string} title
 * @param {string} url
 * @returns {HTMLAnchorElement} anchorElement
 */
async function writeToClipboard(title, url) {
	try {
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.title = title;
		anchor.text = title;

		let items = [
			new ClipboardItem({
				['text/html']: new Blob([anchor.outerHTML]),
				['text/plain']: new Blob([anchor.title]),
			}),
		];
		await navigator.clipboard.write(items);
		return anchor;
	} catch (ex) {
		console.error('ratclip exception:', ex.name, ex.message);
	}
}
