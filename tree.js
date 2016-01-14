var _ = require('underscore');
module.exports = Tree = function() {
  this.data = {
    type: null,
    value: null
  };
  this.children = [];
};

Tree.prototype.setType = function(val) {
  this.data.type = val;
};

Tree.prototype.setValue = function(val) {
  this.data.value = val;
};

Tree.prototype.get = function(attr) {
  return this.data[attr];
};

Tree.prototype.insert = function(tree) {
  this.children.push(tree);
};

Tree.prototype.toStr = function(){
  var val = this.get('value');
  switch(this.get('type')){
  case 'number':
  case 'string':
  case 'keyword':
    return val;
    break;
  case 'function':
    var args = _.map(this.children, function(child){
      return child.toStr();
    });
    return '('+ val + ' ' + args.join(' ') + ')'; 
    break;
  }
}
