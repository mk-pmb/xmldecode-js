
<!--#echo json="package.json" key="name" underline="=" -->
xmldecode
=========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Decode the predefined XML entities (amp, lt, gt, apos, quot), CharRefs and
CDATA sections.
<!--/#echo -->

Definitions:
[Predefined XML entities](https://www.w3.org/TR/REC-xml/#NT-CharRef),
[CharRefs](https://www.w3.org/TR/REC-xml/#sec-predefined-ent)


API
---

This module exports one function:

### xmldecode(orig)

Returns a string with the text decoded from string `orig`.



Usage
-----

see [test.js](test.js)


<!--#toc stop="scan" -->


Related
-------

* [xmldefuse](https://npm.im/xmldefuse):
  Encode the predefined XML entities and CharRefs.
  Opt-out CharRef 39 for HTML. Bonus: Encode CDATA.
* [xmlunidefuse](https://npm.im/xmlunidefuse):
  Convert some additional, easily overlooked Unicode characters to CharRefs.



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
