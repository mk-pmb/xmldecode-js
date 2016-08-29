/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

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
