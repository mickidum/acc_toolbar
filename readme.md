<h1>Accessibility Toolbar Plugin</h1>

<p>
	<img src="https://raw.githubusercontent.com/mickidum/acc_toolbar/master/poster.jpg" alt="Accessibility Toolbar Plugin Poster">
</p>

<p>
Accessibility Toolbar Plugin is a simple accessibility component without dependencies (clean javascript), including a variety of tools. This component allows users with disabilities easy and convenient way to browse most websites.
</p>

<h2>Language Support</h2>
<p>
	Accessibility Toolbar Plugin may work with as many languages as you need. For now, it supports out of the box English by default, Hebrew, Russian, and French. The plugin tries to detect current language in page by schema like "ru-RU", "he-IL", "fr_FR" (Wordpress like CMS locales). If your website uses these locale schemas you need do nothing, otherwise, you probably can force locale by adding property "forcelang" to additional init (see below). You always can edit app/js/language.json file for adding or change language strings(see "For Developers" section below).
</p>

<h2>How to use Accessibility Toolbar <a href="https://mickidum.github.io/acc_toolbar/">(acc toolbox)</a></h2>

<h4>CDN</h4>

<p>Add this script to your website</p>

<pre class="highlight">
<code>
&lt;script src=&quot;https://cdn.jsdelivr.net/gh/mickidum/acc_toolbar/acctoolbar/acctoolbar.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
// optional init
  window.onload = function() {
    window.micAccessTool = new MicAccessTool({
      link: 'http://your-awesome-website.com/your-accessibility-declaration.pdf',
      contact: 'mailto:your-mail@your-awesome-website.com',
      buttonPosition: 'right', // default is 'left'
      forceLang: 'ru-RU' // default is 'en' may be 'he-IL', 'ru-RU', or 'fr_FR'
    });
  }
&lt;/script&gt;
</code>
</pre>

<h4>Download</h4>

<ol>
	<li><a href="https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/acctoolbar.min.js">Download(Right click and save)</a> <strong>Accessibility Toolbar Plugin</strong></li>
	<li>Store this file in your website directory (i.e. /public_html)</li>
	<li>
		<p>Add script to website</p>
<pre class="highlight">
<code>
&lt;script src=&quot;path/to/script/where/stored/acctoolbar.min.js&quot;&gt;&lt;/script&gt;
// optional init
&lt;script&gt;
  window.onload = function() {
    window.micAccessTool = new MicAccessTool({
      link: 'http://your-awesome-website.com/your-accessibility-declaration.pdf',
      contact: 'mailto:your-mail@your-awesome-website.com',
      buttonPosition: 'right', // default is 'left'
      forceLang: 'ru-RU' // default is 'en' may be 'he-IL', 'ru-RU', or 'fr_FR'
    });
  }
&lt;/script&gt;
</code>
</pre>
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
