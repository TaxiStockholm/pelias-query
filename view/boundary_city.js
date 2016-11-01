module.exports = function( vs ){

  // validate required params
  if( !vs.isset('boundary:city') ||
      !vs.isset('admin:city_a:analyzer') ||
      !vs.isset('admin:city_a:field') ){
    return null;
  }

  // base view
  var view = { 'match': {} };

  // match query
  view.match[ vs.var('admin:city_a:field') ] = {
    analyzer: vs.var('admin:city_a:analyzer'),
    query: vs.var('boundary:city')
  };

  return view;
};
