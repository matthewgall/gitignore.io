var app = require("../app");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'gitignore.io' });
};

exports.dropdown = function(req, res){
  res.send(app.gitIgnoreDropdownList);
}
/*
 * GET Command Line Instructions page.
 */

exports.cli = function(req, res){
  res.render('cli', { title: 'gitignore.io' });
};

exports.help =  function(req, res){
  res.send('gitignore.io help:\n  list    - lists the operating systems, programming languages and IDE input types\n  :types: - generates .gitignore files for types of operating systems, programming languages or IDEs\n');
};
/*
 * GET API page.
 */

exports.apiIgnore = function(req, res){
//  console.log(req.params.ignore);
  var ignoreFileList = req.params.ignore.split(",");
  var output = generateFile(ignoreFileList);
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Expires', '0');
  res.send(output);
};
/*
 * POST API File
 */
exports.apiFile = function(req, res){
  var ignoreFileList = req.params.ignore.split(",");
  var output = generateFile(ignoreFileList);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename=".gitignore"');
  res.setHeader('Expires', '0');
  res.send(output);
};

/*
 * GET List of all ignore types
 */
exports.apiListTypes = function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.send(app.gitIgnoreJSONString);
};
/*
 * Helper for generating concatenated gitignore templates
 */
function generateFile(list){
  var output = "# Generated by http://gitignore.io\n";
  for (var file in list){
    if (app.gitIgnoreJSONObject[list[file]] == undefined){
      output += "\n#!! ERROR: " + list[file] + " is undefined. Use list command to see defined gitignore types !!#\n"
    } else {
      output += "\n### " + app.gitIgnoreJSONObject[list[file]].name + " ###\n"
      output += app.gitIgnoreJSONObject[list[file]].contents+"\n";
    }
  }
  return output;
}
