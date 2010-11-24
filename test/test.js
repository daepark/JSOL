test("valid JSON", 1, function() {
  var json = '{"hello":"world", "foo":2, "bar":false}';
  deepEqual(JSOL.parse(json), {hello:"world", foo:2, bar:false});
});

test("valid JSOL", 1, function() {
  var jsol = '{hello:"world", foo:2, bar:false}';
  deepEqual(JSOL.parse(jsol), {hello:"world", foo:2, bar:false});
});

test("valid mixed", 1, function() {
  var jsol = '{hello:"world", "foo":2, bar:false}';
  deepEqual(JSOL.parse(jsol), {hello:"world", foo:2, bar:false});
});

test("valid key value array", 1, function() {
  var jsol = '{hello:[{world:"hello"}]}';
  deepEqual(JSOL.parse(jsol), {hello:[{world:"hello"}]});
});

test("invalid function call", 1, function() {
  try {
    function callme() {alert("hello?");};
    JSOL.parse('{"invalid": callme()}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});

test("invalid anonymous function call", 1, function() {
  try {
    JSOL.parse('{"invalid": (function() {alert("evil");})()}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});

test("invalid new Function call", 1, function() {
  try {
    JSOL.parse('{"invalid": (new Function("return 0;"))()}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});

test("invalid function declaration", 1, function() {
  try {
    JSOL.parse('{"invalid": function() {}}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});

test("invalid function declaration 2", 1, function() {
  try {
    JSOL.parse('{"invalid": function(arg) {return arg;}}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});

test("invalid variable reference", 1, function() {
  try {
    var callme = "hello?";
    JSOL.parse('{"invalid": callme}');
    ok(false, "Expected invalid JSOL exception");
  }
  catch(ex) {
    ok(true, ex);
  }
});
