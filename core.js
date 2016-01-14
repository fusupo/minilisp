var _ = require('underscore');
module.exports = {
  add: function() {
    return _.reduce(_.rest(arguments), function(m, a){
      return m + a;
    }, _.first(arguments));
  },
  subtract: function() {
    return _.reduce(_.rest(arguments), function(m, a){
      return m - a;
    }, _.first(arguments));
  },
  multiply: function() {
    return _.reduce(_.rest(arguments), function(m, a){
      return m * a;
    }, _.first(arguments));
  },
  divide: function() {
    return _.reduce(_.rest(arguments), function(m, a){
      return m / a;
    }, _.first(arguments));
  },
  print: function(x) {
    console.log(x);
  }
};
