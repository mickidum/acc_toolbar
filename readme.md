<h1>Accessibility Toolbar Plugin</h1>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/optimizedhtml-start-template/master/app/img/preview.jpg" alt="Start HTML Template">
</p>

<p>Author: <a href="http://webworks.ga">mickidum</a></p>

<p>Accessibility Toolbar Plugin is simple toolbar</p>
<p>
Accessibility Toolbar Plugin is simple accessibility component, including a variety of tools.
This component allows users with disabilities easy and convenient way to browse most websites.
</p>


<h2>How to use Accessibility Toolbar</h2>

<ol>
	<li><a href="https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/acctoolbar.min.js">Download(Right click and save)</a> <strong>Accessibility Toolbar Plugin</strong></li>
	<li>Store this file in your website directory (i.e. /public_html)</li>
	<li>
		<p>Add script to website</p>
		<code>
			<script src="path/to/script/where/stored/acctoolbar.min.js"></script>
			// optional
			<script>
				window.onload = function() {	
				  window.micAccessTool = new MicAccessTool({
				  	link: '[link to your accesibility statement page]',
				  	contact: '[link to your contact page or "maitto" link]',
				  	buttonPosition: '[default is "left"] may be "right"',
				  	forceLang: '[default english] may be he-IL'
				  });
				};
			</script>
		</code>
	</li>
</ol>

<h2>Gulp tasks:</h2>

<ul>
	<li><strong>gulp</strong>: run default gulp task (sass, js, watch, browserSync) for web development;</li>
	<li><strong>build</strong>: build project to <strong>dist</strong> folder (cleanup, image optimize, removing unnecessary files);</li>
	<li><strong>deploy</strong>: project deployment on the server from <strong>dist</strong> folder via FTP;</li>
	<li><strong>clearcache</strong>: clear all gulp cache.</li>
</ul>

<h2>Rules for working with the starting HTML template</h2>

<ol>
	<li>All HTML files should have similar initial content as in <strong>app/index.html</strong>;</li>
	<li><strong>Template Basic Images Start</strong> comment in app/index.html - all your custom template basic images (og:image for social networking, favicons for a variety of devices);</li>
	<li><strong>Custom Browsers Color Start</strong> comment in app/index.html: set the color of the browser head on a variety of devices;</li>
	<li><strong>Custom HTML</strong> comment in app/index.html - all your custom HTML;</li>
	<li>For installing new jQuery library, just run the command "<strong>bower i plugin-name</strong>" in the terminal. Libraries are automatically placed in the folder <strong>app/libs</strong>. Bower must be installed in the system (npm i -g bower). Then place all jQuery libraries paths in the <strong>'libs'</strong> task (gulpfile.js);</li>
	<li>All custom JS located in <strong>app/js/common.js</strong>;</li>
	<li>All Sass vars placed in <strong>app/sass/_vars.sass</strong>;</li>
	<li>All Bootstrap media queries placed in <strong>app/sass/_media.sass</strong>;</li>
	<li>All jQuery libraries CSS styles placed in <strong>app/sass/_libs.sass</strong>;</li>
	<li>Rename <strong>ht.access</strong> to <strong>.htaccess</strong> before place it in your web server. This file contain rules for files caching on web server.</li>
</ol>
