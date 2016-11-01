var boundary_city = require('../../view/boundary_city');
var VariableStore = require('../../lib/VariableStore');

function getBaseVariableStore(toExclude) {
  var vs = new VariableStore();
  vs.var('boundary:city', 'boundary_city');
  vs.var('admin:city_a:analyzer', 'city_a_analyzer');
  vs.var('admin:city_a:field', 'city_a_field');

  if (toExclude) {
    vs.unset(toExclude);
  }

  return vs;
}

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface: contructor', function(t) {
    t.equal(typeof boundary_city, 'function', 'valid function');
    t.equal(boundary_city.length, 1, 'takes 1 arg');
    t.end();
  });

};

module.exports.tests.missing_variable_conditions = function(test, common) {
  var variables = Object.keys(getBaseVariableStore().export());

  variables.forEach(function(missing_variable) {
    test('missing required variable ' + missing_variable + ' should return null', function(t) {
      var vs = getBaseVariableStore(missing_variable);

      t.equal(boundary_city(vs), null, 'should have returned null for unset ' + missing_variable);
      t.end();

    });
  });

};

module.exports.tests.no_exceptions_conditions = function(test, common) {
  test('no boundary:city should return null', function(t) {
    var vs = getBaseVariableStore();

    var actual = boundary_city(vs);

    var expected = {
      match: {
        city_a_field: {
          analyzer: {
            $: 'city_a_analyzer'
          },
          query: {
            $: 'boundary_city'
          }
        }
      }
    };

    t.deepEquals(actual, expected, 'should have returned object');
    t.end();

  });

};

module.exports.all = function (tape, common) {
  function test(name, testFunction) {
    return tape('boundary_city ' + name, testFunction);
  }
  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
