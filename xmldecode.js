/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var predEnt = { lt: '<', gt: '>', apos: "'", quot: '"', amp: '&' }, rgx = {};

rgx.chunkSplit = /(&#?|<!\[CDATA\[|\]{2}>)/;
rgx.charRef = /^x([0-9a-fA-F]+);?|^([0-9]+);?/;
rgx.NameStartChar_simplified = [
  //  not faithfully honoring https://www.w3.org/TR/REC-xml/#d0e804
  //  because combining surrogate pairs to check [#x10000-#xEFFFF]
  //  would go beyond the scope of this module.
  ":A-Z_a-z",
  "\\u00C0-\\u00D6",
  "\\u00D8-\\u00F6",
  "\\u00F8-\\u02FF",
  "\\u0370-\\u037D",
  "\\u037F-\\u1FFF",
  "\\u200C-\\u200D",
  "\\u2070-\\u218F",
  "\\u2C00-\\u2FEF",
  "\\u3001-\\uFFFF",
  ''].join('');
rgx.NameChar = [
  rgx.NameStartChar_simplified,
  "\\-\\.0-9",
  "\\u00B7",
  "\\u0300-\\u036F",
  "\\u203F-\\u2040",
  ''].join('');
rgx.boostPredEnt = Object.keys(predEnt).join('|') + '|';
rgx.entityName = new RegExp(['^(',
  rgx.boostPredEnt,
  '[', rgx.NameStartChar_simplified, ']',
  '[', rgx.NameStartChar_simplified, rgx.NameChar, ']*',
  ');?'].join(''), '');


function xmldecode(charData, customEnts) {
  var text = '', part, ent, val;
  customEnts = (customEnts ? Object.assign({}, predEnt, customEnts) : predEnt);
  charData = String(charData).split(rgx.chunkSplit);
  while (charData.length) {
    part = charData.shift();
    switch (part) {
    case '&':
      if (!charData.length) { break; }
      part = charData.shift();
      ent = part.match(rgx.entityName);
      if (!ent) {
        text += '&' + part;
        break;
      }
      val = customEnts[ent[1]];
      if ((!val) && (val !== '')) {
        val = customEnts[''];
        if (val === String) {
          // aka, leave unknown entities as they are
          text += '&' + part;
          break;
        }
        switch (val && typeof val) {
        case '':
        case false:
          val = '';
          break;
        case 'string':
          val = ent.fallback;
          break;
        case 'function':
          val = ent.fallback(ent);
          break;
        default:
          throw new Error('No definition for names entity &' + ent[0]);
        }
      }
      text += val + part.slice(ent[0].length);
      break;
    case '&#':
      if (!charData.length) { break; }
      part = charData.shift();
      ent = part.match(rgx.charRef);
      text += (ent
        ? String.fromCodePoint(parseInt(ent[1] || ent[2],
            (ent[1] ? 16 : 10))) + part.slice(ent[0].length)
        : part);
      break;
    case '<![CDATA[':
      part = '';
      while ((part !== ']]>') && (part !== undefined)) {
        text += part;
        part = charData.shift();
      }
      break;
    default:
      text += part;
    }
  }
  return text;
}














module.exports = xmldecode;
