
xmldecode
=========
Decode the [predefined XML entities][xml-predent] (amp, lt, gt, apos, quot),
[CharRefs][xml-charref] and CDATA sections.

Usage
-----
From [test.js](test.js):

```javascript
var xmldecode = require('xmldecode'), eq = require("assert").strictEqual;

eq(xmldecode("X &amp;amp &lt;lt &gt;gt &#39;#39; &quot;quot; Y"),
  "X &amp <lt >gt '#39; \"quot; Y");

eq(xmldecode("X &amp;amp &lt;lt &gt;gt &apos;apos; &quot;quot; Y"),
  "X &amp <lt >gt 'apos; \"quot; Y");

eq(xmldecode("<&amp;><![CDATA[<>&amp;<![CDATA[<&amp;&lt;]]>&apos;]]>&amp;"),
  "<&><>&amp;<![CDATA[<&amp;&lt;']]>&");

eq(xmldecode("]]&gt; in CDATA: <![CDATA[1]]2]]>&&;<![CDATA[>3]]>"),
  "]]> in CDATA: 1]]2&&;>3");

eq(xmldecode("untermin&#97;ted <![CDATA[ is b&#97;d for"),
  "unterminated  is b&#97;d for");
```


Related
-------
  * [xmldefuse](https://www.npmjs.com/package/xmldefuse):
    Encode the predefined XML entities and CharRefs.
    Opt-out [CharRef][xml-charref] 39 for HTML. Bonus: Encode CDATA.
  * [xmlunidefuse](https://www.npmjs.com/package/xmlunidefuse):
    Convert some additional, easily overlooked Unicode characters to CharRefs.


  [xml-charref]: https://www.w3.org/TR/REC-xml/#NT-CharRef
  [xml-predent]: https://www.w3.org/TR/REC-xml/#sec-predefined-ent


License
-------
ISC
