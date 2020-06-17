'use strict';

/** {Array<String>} The URLs for section partials */
var SECTION_NAMES = [
	'',
	'about-us',
	'deli',
	'catering',
	'menu',
	'contact'
];

/** {HTMLElement} The container for section contents. */
var sectionContainer;

/** {Object<String,Promise<String>>} Map of section names to their HTML fetch parsing */
var sectionContents = {};

/**
 * Initialize the page and preload sections.
 */
function init() {
	sectionContainer = document.getElementById('main');
	
	SECTION_NAMES.forEach((sectionName) => {
		sectionContents[sectionName] =
			fetch('partials/' + (sectionName || 'home') + '.html')
				.then((resp) => resp.text());
	});
	
	window.addEventListener('hashchange', switchSection);
	switchSection();
}

/**
 * Switch to the subsection specified by the URL hash fragment.
 */
async function switchSection() {
	var path = location.hash.replace('#!', '');
	
	// On an invalid path, go to the home page.
	if (SECTION_NAMES.indexOf(path) === -1) {
		location.hash = '#!';
		return;
	}
	
	// Highlight the appropriate nav bar link.
	Array.from(document.querySelectorAll('nav > a.active')).forEach((activeNavLink) => {
		activeNavLink.classList.remove('active');
	});
	document.querySelector('nav > a[href=\"#!' + path + '\"]').classList.add('active');
	
	// Load the section contents.
	sectionContainer.innerHTML = '&#x231b;';
	sectionContainer.innerHTML = await sectionContents[path];
}

window.addEventListener('load', init);
