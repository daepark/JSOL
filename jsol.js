/** @license
 The MIT License

 Copyright (c) 2010 Daniel Park

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 **/
;(function(self) {
  /**
   * JSOL stands for JavaScript Object Literal which is the syntax for representing an object in JavaScript.
   *
   * For example:
   *
   * {foo:"bar"} is equivalent to {"foo":"bar"} in JavaScript.
   *
   * Notice that {"foo":"bar"} is proper JSON[2] therefore you can use one of the many JSON parsers out there like json2.js[1]
   * or even the native browser's JSON parser, if available.
   *
   * However, {foo:"bar"} is NOT proper JSON but valid JavaScript syntax for representing an object with key, "foo" and value, "bar".
   * Using a JSON parser is not an option since this is NOT proper JSON.
   *
   * You can use JSOL.parse to safely parse any string that reprsents a JavaScript Object Literal.
   * JSOL.parse will throw an Invalid JSOL exception on function calls, function declarations and variable references.
   *
   * Examples:
   *
   * JSOL.parse('{foo:"bar"}');  // valid
   *
   * JSOL.parse('{evil:(function(){alert("I\'m evil");})()}');  // invalid function calls
   *
   * JSOL.parse('{fn:function() { }}'); // invalid function declarations
   *
   * var bar = "bar";
   * JSOL.parse('{foo:bar}');  // invalid variable references
   *
   * [1] http://www.json.org
   * [2] http://www.json.org/json2.js
   */
  if (!self.JSOL) {
    self.JSOL = {};
  }
  // Used for trimming whitespace
  var trim =  /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
  if (typeof self.JSOL.parse !== "function") {
    self.JSOL.parse = function(text) {
      // make sure text is a "string"
      if (typeof text !== "string" || !text) {
        return null;
      }
      // Make sure leading/trailing whitespace is removed
      text = text.replace(trim, "");
      // Make sure the incoming text is actual JSOL (or Javascript Object Literal)
      // Logic borrowed from http://json.org/json2.js
      if ( /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
           .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
           .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
           /** everything up to this point is json2.js **/
           /** this is the 5th stage where it accepts unquoted keys **/
           .replace(/[A-Za-z_]\w*\s*\:/g, ":")) ) {
        return (new Function("return " + text))();
      }
      else {
        throw("Invalid JSOL: " + text);
      }
    };
  }
})(window);
