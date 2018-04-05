import React, { Component } from 'react';
export default class Highlighter {
  makeHighlightedSpan(text) {
    return <span style = {{backgroundColor: 'yellow'}}>{text}</span>;
  }

  makeRegularSpan(text) {
    return <span>{text}</span>;
  }
  getHighlightedTerms(name, searchTerms) {
    var bitmap = [];
    for (let ch in name) bitmap.push(false);

    // console.log("search terms in restaurant card: " + searchTerms);
    for (let term of searchTerms) {
      let foundIdx = name.toLowerCase().indexOf(term.toLowerCase());
      if (foundIdx != -1) {
        for (var i = foundIdx; i < foundIdx + term.length; ++i) {
          bitmap[i] = true;
        }
      }

    }
    var spans = [];
    var startIdx = 0;
    for (var i = 0; i < bitmap.length; ++i) {
      if (bitmap[startIdx] != bitmap[i]) {
        // we have a group, add it to the hgihlighted terms
        if (bitmap[startIdx]) {
          // we need to highlight this term
          spans.push(this.makeHighlightedSpan(name.substring(startIdx, i)));
        } else {
          // this term is not going to be highlighted
          spans.push(this.makeRegularSpan(name.substring(startIdx, i)));
        }
        startIdx = i;
      }
    }
    // add the last element
    if (bitmap[startIdx]) {
      // highlight this last one
        spans.push(this.makeHighlightedSpan(name.substring(startIdx, i)));
    } else {
        // this term is not going to be highlighted
        spans.push(this.makeRegularSpan(name.substring(startIdx, i)));
    }
    return spans;
  }

}