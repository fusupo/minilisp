var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var _ = require('underscore');
var constants = require('./constants.js');
var core = require('./core.js');

var Controller = function(env) {
  this.result = '';
  this.computed = undefined;
  this.env = env;
};

module.exports = interpreter = function(roots, env) {
  var controller = new Controller(env);
  // _.each(roots, function(node) {
  //   interpretNode(node, controller);
  // });
  // return controller.result;
  var intrp = interpretNode(roots[0], controller);
  return intrp;
};

function interpretNode(node, controller) {
  var type = node.get('type');
  var value = node.get('value');
  if (type === 'function') {
    if (value === 'defn') {
      // writeCustomFunction(node, controller);
    } else {
      return writeFunction(node, controller);
    }
  } else if (type === 'keyword') {
    if (_.has(controller.env, value)) {
      var envVal = controller.env[value];
      if (typeof envVal === 'string') {
        var tokens = tokenizer(envVal);
        var tree = parser(tokens);
        node = interpretNode(tree.roots[0], controller);
      } else if (typeof envVal === 'number') {
        node.setValue(envVal);
        node.setType('number');
      }
    }
  }

  return node;
}

function writeFunction(ast, controller) {
  var value = ast.get('value');
  var functionName = constants.functionMap[value];
  if (functionName === undefined) {
    functionName = value;
  }
  var func = core[functionName];
  console.log(func);
  // controller.result += functionName + '(';
  var rawArgs = _.map(ast.children, function(argument, idx) {
    return interpretNode(argument, controller);
  });
  ast.children = rawArgs;
  var argsAreResolvedP = _.reduce(rawArgs, function(m, o) {
    return m && (o.get('type') === 'string' || o.get('type') === 'number');
  }, true);
  if (argsAreResolvedP) {
    var finalArgs = _.map(rawArgs, function(arg) {
      return arg.get('type') === 'number' ? parseFloat(arg.get('value')) : arg.get('value');
    });
    var res = func.apply(null, finalArgs);
    ast.setValue(res);
    ast.setType(typeof res);
    ast.children = [];
  }
  return ast;
}

function writeCustomFunction(node, controller) {
  var functionName = node.children[0];
  var arguments = node.children[1];
  var functionBody = node.children[2];

  controller.result += 'var ' + functionName.get('value') + ' = function(';

  var numArgs = arguments.children.length;

  _.each(arguments.children, function(argNode, idx) {
    controller.result += argNode.get('value');
    if (numArgs > 1 && idx < numArgs - 1) {
      controller.result += ', ';
    }
  });

  controller.result += '){\n';

  var customController = new Controller();
  interpretNode(functionBody, customController);

  controller.result += 'return ' + customController.result + ';';
  controller.result += '\n}\n';
}
