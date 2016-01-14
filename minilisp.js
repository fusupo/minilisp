var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var generator = require('./generator.js');

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

module.exports = {
  reduceExpr: function(expr, env){
    var tokens = tokenizer(expr);
    var tree = parser(tokens);
    var output = generator(tree.roots, env);
    console.log(output.toStr());
    return output.toStr();
  }
}
