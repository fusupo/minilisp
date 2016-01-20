var constants = require('./constants.js');
var _ = require('underscore');
var Tree = require('./tree.js');
var AstResult = require('./ast.js');
var FUNC_NAMES = constants.coreFunctions.slice();

module.exports = function Parser(tokens) {
    var ast = new AstResult();
    var parserMap = {
        operator: processOperators,
        keyword: processKeywords,
        number: processValue,
        string: processValue
    };
    _.each(tokens, function(token) {
        var func = parserMap[token.type];
        func(token, ast);
    });

    return ast;
};

function processOperators(token, ast) {
  switch (token.value) {
  case constants.openBrackets:
    var tree = new Tree();
    tree.setType('array');
    ast.newTree(tree);
    break;
  case constants.openParens:
    var tree = new Tree();
    ast.newTree(tree);
    break;
  case constants.plus:
  case constants.minus:
  case constants.times:
  case constants.divide:
    ast.pointer.setType('function');
    ast.pointer.setValue(token.value);
    break;
  case constants.closeBrackets:
  case constants.closeParens:
    ast.back();
    break;
  }
}

function processValue(token, ast) {
  // values are children of function nodes so when we reach a value
  // we just add it as a new child of the current node
  var tree = new Tree();
  if(ast.pointer === null) ast.newTree(tree);
  tree.setType(token.type);
  tree.setValue(token.value);
  ast.pointer.insert(tree);
}

function processKeywords(token, ast) {
    console.log('whatdafuck?!');
    if (ast.pointer && (ast.pointer.get('type') === 'function' &&
                        ast.pointer.get('value') === 'defn')) {
        var tree = new Tree();
        tree.setType('function_name');
        tree.setValue(token.value);
        FUNC_NAMES.push(token.value);
        ast.pointer.insert(tree);
    } else if (ast.pinter && (ast.pointer.get('value') === null &&
                              !_.contains(FUNC_NAMES, token.value))) {
        ast.pointer.setType('arguments');
        var tree = new Tree();
        tree.setType('variable');
        tree.setValue(token.value);
        ast.pointer.insert(tree);
    } else if (_.contains(FUNC_NAMES, token.value)) {
        ast.pointer.setType('function');
        ast.pointer.setValue(token.value);
    } else {
         processValue(token, ast);
        // var tree = new Tree();
        // tree.setType('keyword');
        // tree.setValue(token.value);
        // ast.pointer.insert(tree);
    }
}
