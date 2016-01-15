var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var generator = require('./generator.js');
var _ = require('underscore');
//var example = '(defn avg (x y) ( / (+ x y ) 2)) (defn addOne (x) (+ x 1)) (print (avg (addOne 10) (addOne 20)))';
// var example = '(+ 2 x)';
// var tokens = tokenizer(example);
// var tree = parser(tokens);
// var output = generator(tree.roots);
// //output = 'var core = require("./core.js");\n' + output;
// //fs.writeFileSync('out.js', output);
// console.log(output.toStr());

// var example = '(+ 2 5)';
// var tokens = tokenizer(example);
// var tree = parser(tokens);
// var output = generator(tree.roots);
// console.log(output.toStr());

// var example = '(+ 2 x)';
// var tokens = tokenizer(example);
// var tree = parser(tokens);
// var output = generator(tree.roots, {
//   x: 16
// });
// console.log(output.toStr());

// var example = '(+ 2 x y)';
// var tokens = tokenizer(example);
// var tree = parser(tokens);
// var output = generator(tree.roots, {
//   x: 16
// });
// console.log(output.toStr());

module.exports = minilisp = {
  reduceExpr: function(expr, env) {
    var tokens = tokenizer(expr);
    var balancedP = balancedParens(tokens);
    // _.reduce(tokens, function(m, o) {
    //   if (o.type === 'operator' && (o.value === '(')) {
    //     m++;
    //   } else if (o.type === 'operator' && o.value === ')') {
    //     m--;
    //   }
    //   return m;
    // }, 0);
    if (balancedP) {
      var tree = parser(tokens);
      var output = generator(tree.roots, env);
      console.log(output.toStr());
      return output.toStr();
    }
    return 0;
  }
};

var balancedParens = function(input) {
  var s = [];
  for (var i = 0; i < input.length; i++) {
    var c = input[i];
    switch (c.value) {
    case '(':
    case '{':
    case '[':
      s.push(c.value);
      break;
    case ')':
      var matchp = s.pop();
      if (matchp !== '(') return false;
      break;
    case '}':
      var matchp = s.pop();
      if (matchp !== '{') return false;
      break;
    case ']':
      var matchp = s.pop();
      if (matchp !== '[') return false;
      break;
    }
  }

  if (s.length > 0) {
    return false;
  } else {
    return true;
  };
};
