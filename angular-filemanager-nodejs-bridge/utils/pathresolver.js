/*jslint node: true */

module.exports.baseDir = function(req) {
  return process.env.DATA_DIR;
};

module.exports.pathGuard = function(path) {
  path = path? path : "/"; // give the default path to /)
  console.log(path);
  return path.replace(/\.\.\//g,'');
};
