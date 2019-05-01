'use strict';

function MicAccessTool(init) {

	this.init = init || {
		link: '',
  	contact: '',
  	buttonPosition: 'left',
  	forceLang: '',
	};

	this.locale = @@include("language.json");
	this.currentLanguage = this.locale[this.init.forceLang] || this.locale.en;
	
	this.checkLanguageBox();

	this.buildToolBox();

	this.toolBox = document.getElementById('mic-access-tool-box');
	this.toolBoxOpenButton = document.getElementById('mic-access-tool-general-button');
	this.toolBoxCloseButton = document.getElementById('mic-access-tool-box-close-button');

	this.toolBoxOpenButton.addEventListener('click', this.openBox.bind(this));
	this.toolBoxCloseButton.addEventListener('click', this.closeBox.bind(this));
	document.addEventListener('keyup', this.openCloseBoxKeyboard.bind(this));


	// CONTRAST CHANGE BUTTONS
	this.micContrastMonochrome = document.getElementById('mic-toolbox-contrast-monochrome');
	this.micContrastSoft = document.getElementById('mic-toolbox-contrast-soft');
	this.micContrastHard = document.getElementById('mic-toolbox-contrast-hard');
	
	this.micContrastMonochrome.addEventListener('click', this.contrastChange);
	this.micContrastSoft.addEventListener('click', this.contrastChange);
	this.micContrastHard.addEventListener('click', this.contrastChange);


	// DISABLE BUTONS
	this.micDisableButtonsAnimations = document.getElementById('mic-toolbox-disable-buttons-animations');
	this.micDisableButtonsKeyboard = document.getElementById('mic-toolbox-disable-buttons-keyboard');

	this.micDisableButtonsAnimations.addEventListener('click', this.onceButtonChange);
	this.micDisableButtonsKeyboard.addEventListener('click', this.onceButtonChange);


	// FONT CHANGE BUTTONS
	this.micToolboxFontsUp = document.getElementById('mic-toolbox-fonts-up');
	this.micToolboxFontsDown = document.getElementById('mic-toolbox-fonts-down');
	this.micToolboxFontsSimple = document.getElementById('mic-toolbox-fonts-simple');

	this.micToolboxFontsUp.addEventListener('click', this.fontsChange);
	this.micToolboxFontsDown.addEventListener('click', this.fontsChange);
	this.micToolboxFontsSimple.addEventListener('click', this.onceButtonChange);

	// CONTENT MARK BUTTONS
	this.micToolboxContentLinks = document.getElementById('mic-toolbox-content-links');
	this.micToolboxContentHeaders = document.getElementById('mic-toolbox-content-headers');
	this.micToolboxContentImages = document.getElementById('mic-toolbox-content-images');

	this.micToolboxContentLinks.addEventListener('click', this.onceButtonChange);
	this.micToolboxContentHeaders.addEventListener('click', this.onceButtonChange);
	this.micToolboxContentImages.addEventListener('click', this.onceButtonChange);
	
	// CURSORS CHANGE BUTTONS
	this.micToolboxCursorWhite = document.getElementById('mic-toolbox-cursor-big-white');
	this.micToolboxCursorBlack = document.getElementById('mic-toolbox-cursor-big-black');
	this.micToolboxZoomUp = document.getElementById('mic-toolbox-zoom-up');

	this.micToolboxCursorWhite.addEventListener('click', this.cursorChange);
	this.micToolboxCursorBlack.addEventListener('click', this.cursorChange);
	this.micToolboxZoomUp.addEventListener('click', this.onceButtonChange);

	// RESET APP BUTTON
	this.micToolboxDisableButtonsAll = document.getElementById('mic-toolbox-disable-buttons-reset-all');
	this.micToolboxDisableButtonsAll.addEventListener('click', this.resetApp.bind(this));
	
	this.initialApp();
}

MicAccessTool.prototype.checkLanguageBox = function() {
	if (this.init.forceLang) {
		return;
	}
	var htmltag = document.body.parentElement;
	if (htmltag.hasAttribute('lang')) {
		var languageCode = htmltag.lang;
		this.currentLanguage = this.locale[languageCode] || this.locale.en;
	}
	else {
		this.currentLanguage = this.locale.en;
	}
	
}

MicAccessTool.prototype.buildToolBox = function() {

	var obj = this.currentLanguage || this.locale.en;
	var htmlToolBox = '@@include("../htmlmin/toolbox.html")';
	var allCss = '@@include("../css/all.min.css")';

	var styleTag = document.createElement('style');
	styleTag.textContent = allCss;
	document.head.appendChild(styleTag);

	var createToolBox = document.createElement('div');
	createToolBox.id = 'mic-init-access-tool';
	createToolBox.innerHTML = htmlToolBox;

	document.body.insertBefore(createToolBox, document.body.firstChild);

}

// CONTRAST FUNCTION
MicAccessTool.prototype.contrastChange = function(event) {
	event.preventDefault();

	if (document.body.classList.contains(this.id)) {
		this.classList.remove('vi-enabled');
		document.body.classList.remove(this.id);

		delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
	}
	else {
		var buttons = document.querySelectorAll('.mic-contrast-block button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove('vi-enabled');
			document.body.classList.remove(buttons[i].id);

			delete window.MICTOOLBOXAPPSTATE.bodyClassList[buttons[i].id];
		}
		this.classList.add('vi-enabled');
		document.body.classList.add(this.id);

		window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
	}
	MicAccessTool.prototype.updateState();
}

// CURSOR CHANGE
MicAccessTool.prototype.cursorChange = function(event) {
	event.preventDefault();

	if (document.body.classList.contains(this.id)) {
		this.classList.remove('vi-enabled');
		document.body.classList.remove(this.id);
		delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
	}
	else {
		var buttons = document.querySelectorAll('#mic-toolbox-cursor-big-black,#mic-toolbox-cursor-big-white');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove('vi-enabled');
			document.body.classList.remove(buttons[i].id);

			delete window.MICTOOLBOXAPPSTATE.bodyClassList[buttons[i].id];
		}
		this.classList.add('vi-enabled');
		document.body.classList.add(this.id);

		window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
	}
	MicAccessTool.prototype.updateState();
}

MicAccessTool.prototype.onceButtonChange = function(event) {
	event.preventDefault();

	if (this.id === 'mic-toolbox-disable-buttons-keyboard') {
		window.MICTOOLBOXAPPSTATE.keyboardRoot = !window.MICTOOLBOXAPPSTATE.keyboardRoot;
		MicAccessTool.prototype.keyboardRootEnable();
	}

	if (this.id === 'mic-toolbox-content-images') {
		MicAccessTool.prototype.imagesChange();
	}

	if (document.body.classList.contains(this.id)) {
		this.classList.remove('vi-enabled');
		document.body.classList.remove(this.id);

		delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
	}
	else {
		this.classList.add('vi-enabled');
		document.body.classList.add(this.id);

		window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
	}
	MicAccessTool.prototype.updateState();
}

MicAccessTool.prototype.keyboardRootEnable = function() {
	if (window.MICTOOLBOXAPPSTATE.keyboardRoot) {
		var headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,input,select,textarea');
		for (var i = 0; i < headers.length; i++) {
			var item = headers[i];
			item.tabIndex = i + 1
		}
	}
	else {
		window.location.reload();
	}
}

// FONTS CHANGE
MicAccessTool.prototype.fontsChange = function(event) {
	event.preventDefault();

	// var mainBody = Number(document.body.style.fontSize.split('px')[0]);
	
	var counter = window.MICTOOLBOXAPPSTATE.fontSize;

	if (this.id === 'mic-toolbox-fonts-up') {
			if (counter >= 1.6) {return}
			var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
			for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
			var fontSize = Number(font[0]);
			item.style.fontSize = (fontSize * 1.1).toFixed() + 'px';
		}
		counter = (counter * 1.1).toFixed(2);
	}
	if (this.id === 'mic-toolbox-fonts-down') {
			if (counter <= 1) {
				window.MICTOOLBOXAPPSTATE.fontSize = 1;
				MicAccessTool.prototype.updateState();
				return;
			}
			var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
			for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
			var fontSize = Number(font[0]);
			item.style.fontSize = (fontSize / 1.1).toFixed() + 'px';
		}
		counter = (counter / 1.1).toFixed(2);
	}

	window.MICTOOLBOXAPPSTATE.fontSize = counter;
	MicAccessTool.prototype.getFontsChanges(counter);
	MicAccessTool.prototype.updateState();
	
}

// INITIAL FONT SIZE
MicAccessTool.prototype.initFontsChange = function() {
		var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
		var initFontSize = window.MICTOOLBOXAPPSTATE.fontSize;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size');
			item.style.fontSize = font;
			var fs = item.style.fontSize.split('px');
		}
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
			var fs = Number(font[0]);
			item.style.fontSize = (fs * initFontSize).toFixed() + 'px';
		}
		if (initFontSize) {
			this.getFontsChanges(initFontSize);
		}
}

MicAccessTool.prototype.initFontsChangeFirst = function() {
		var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size');
			item.style.fontSize = font;
			var fs = item.style.fontSize.split('px');
		}
}

MicAccessTool.prototype.getFontsChanges = function(initFontSize) {
	if (initFontSize > 1) {
		document.getElementById('mic-toolbox-fonts-up').classList.add('vi-font-enabled');
		var initPerc = (Number(initFontSize) * 100 - 100).toFixed();
		var perc = '+' + initPerc + '%';
		document.getElementById('mic-toolbox-fonts-up-enabled').textContent = perc;
	}
	else {
		document.getElementById('mic-toolbox-fonts-up').classList.remove('vi-font-enabled');
		document.getElementById('mic-toolbox-fonts-up-enabled').textContent = '';
	}
}

// IMAGES CHANGE
MicAccessTool.prototype.imagesChange = function() {

	if (document.body.classList.contains('mic-toolbox-content-images')) {
		
		var titles = document.querySelectorAll('.mic-toolbox-images-titles');
		for (var i = 0; i < titles.length; i++) {
			var parent = titles[i].parentElement;
			parent.removeChild(titles[i]);
		}
		window.MICTOOLBOXAPPSTATE.imagesTitle = false;
	}

	else {
		this.imagesAddTitles();
		window.MICTOOLBOXAPPSTATE.imagesTitle = true;
	}

}

MicAccessTool.prototype.imagesAddTitles = function() {

	var images = document.images;
	for (var i = 0; i < images.length; i++) {
		var img = images[i];
		if (img.alt) {
			var title = document.createElement('span');
			title.className = 'mic-toolbox-images-titles';
			title.textContent = img.alt;
			img.parentNode.insertBefore(title, img);
		}
		else {
			var title = document.createElement('span');
			title.className = 'mic-toolbox-images-titles';
			title.textContent = 'image without text';
			img.parentNode.insertBefore(title, img);
		}
	}

}


MicAccessTool.prototype.updateState = function() {
	var jsonSting = JSON.stringify(window.MICTOOLBOXAPPSTATE);
	if (typeof(Storage) !== "undefined") {
	    localStorage.setItem('MICTOOLBOXAPPSTATE', jsonSting);
	} else {
	    console.log('No Storage Found');
	}
}


MicAccessTool.prototype.openBox = function(event) {
	this.toolBox.classList.add('opened-mic-access-tool');
	if (!window.MICTOOLBOXAPPSTATE.initFontSize || window.MICTOOLBOXAPPSTATE.fontSize <= 1) {
		this.initFontsChangeFirst();
		window.MICTOOLBOXAPPSTATE.initFontSize = true;
	}
	this.toolBoxCloseButton.focus();
}

MicAccessTool.prototype.closeBox = function(event) {
	this.toolBox.classList.remove('opened-mic-access-tool');
}

MicAccessTool.prototype.openCloseBoxKeyboard = function(event) {
	if (event.keyCode == 27) {
		this.closeBox();
	}
	if (event.ctrlKey && event.keyCode == 113) {
		this.openBox();
	}
}

MicAccessTool.prototype.resetApp = function(event) {
	localStorage.removeItem('MICTOOLBOXAPPSTATE');
	window.location.reload();
}

MicAccessTool.prototype.initialApp = function() {
	window.MICTOOLBOXAPPSTATE = JSON.parse(localStorage.getItem('MICTOOLBOXAPPSTATE')) || {
		bodyClassList: {},
		fontSize: 1,
		imagesTitle: false,
		keyboardRoot: false,
		initFontSize: false
	};


	// INIT ADDING CLASSES TO BODY
	if (window.MICTOOLBOXAPPSTATE.bodyClassList) {
		for (var bodyClass in window.MICTOOLBOXAPPSTATE.bodyClassList) {
			var initBodyClassList = window.MICTOOLBOXAPPSTATE.bodyClassList[bodyClass];
			var enabledButton = document.getElementById(initBodyClassList);
			if (enabledButton) {
				enabledButton.classList.add('vi-enabled');
			}
			document.body.classList.add(initBodyClassList);
		}
	}

	// FONT SIZE INIT
	if (window.MICTOOLBOXAPPSTATE.fontSize > 1) {
		this.initFontsChange();
	}

	// SET IMAGES TITLES
	if (window.MICTOOLBOXAPPSTATE.imagesTitle) {
		this.imagesAddTitles();
	}

	// SET KEBOARD ROOTING
	if (window.MICTOOLBOXAPPSTATE.keyboardRoot) {
		this.keyboardRootEnable();
	}

	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIE11) {
		var contrastBlock = document.getElementById('mic-toolbox-contrast-block');
		contrastBlock.style.display = 'none';
	}
	if (this.init.link) {
		var initLink = document.getElementById('mic-toolbox-link-nagishut') || {};
		initLink.classList.remove('atb-hide-if-empty');
		initLink.href = this.init.link;
	}
	if (this.init.contact) {
		var initContact = document.getElementById('mic-toolbox-link-contact') || {};
		initContact.classList.remove('atb-hide-if-empty');
		initContact.href = this.init.contact;
	}
	if (this.init.buttonPosition === 'right') {
		document.getElementById('mic-access-tool-general-button').classList.add('mic-access-tool-general-button-right');
		document.getElementById('mic-access-tool-box').classList.add('mic-access-tool-box-right');
	}
}

// INITIALIZATION APP
window.onload = function() {	
  window.micAccessTool = new MicAccessTool();
};
