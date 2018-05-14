<h1>Accessibility Toolbar Plugin</h1>

<p>
	<img src="https://raw.githubusercontent.com/mickidum/acc_toolbar/master/poster.jpg" alt="Accessibility Toolbar Plugin Poster">
</p>

<p>
Accessibility Toolbar Plugin is simple accessibility component without dependencies (clean javascript), including a variety of tools.
This component allows users with disabilities easy and convenient way to browse most websites.
</p>

<h2>How to use Accessibility Toolbar <a href="http://webworks.ga/acc_toolbar">(acc toolbox)</a></h2>

<h4>CDN</h4>

<p>Add this script to your website</p>

<pre class="highlight">
<code>
&lt;script src="https://cdn.rawgit.com/mickidum/acc_toolbar/master/acctoolbar/acctoolbar.min.js"&gt;&lt;/script&gt;
</code>
</pre>

<h4>Download</h4>

<ol>
	<li><a href="https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/acctoolbar.min.js">Download(Right click and save)</a> <strong>Accessibility Toolbar Plugin</strong></li>
	<li>Store this file in your website directory (i.e. /public_html)</li>
	<li>
		<p>Add script to website</p>
		<div class="language-js highlighter-rouge">
			<div class="highlight">
				<pre class="highlight">
					<code>
&lt;script src="path/to/script/where/stored/acctoolbar.min.js"&gt;&lt;/script&gt;

// optional init
&lt;script&gt;
  window.onload = function() {	
    window.micAccessTool = new MicAccessTool({
      link: '[link to your accesibility statement page]',
      contact: '[link to your contact page or "mailto" link]',
      buttonPosition: '[default is "left"] may be "right"',
      forceLang: '[default english] may be he-IL'
    });
  };
&lt;/script&gt;
		</code>
				</pre>
			</div>
		</div>
	</li>
	<li>That's all</li>
</ol>

<h2>For Developers</h2>

<ol>
	<li>Clone or download this <a href="{{ site.github.repository_url }}">repo</a></li>
	<li>Install <strong>gulp.js</strong> - write in terminal <em>"npm install gulp -g"</em></li>
	<li><em>cd [installed repo folder]</em></li>
	<li>Write in terminal - <em>"npm install"</em></li>
	<li>Write in terminal - <em>"gulp"</em> to run app</li>
	<li>Now you can change it.</li>
</ol>
