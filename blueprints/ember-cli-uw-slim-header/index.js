// use fs-extra for additional copying functionality (over regular fs module)
var fs = require('fs-extra');
var path = require('path');

module.exports = {

  description: 'Generates the uw-slim-header assets',

  beforeInstall: function(options) {
   return this.addBowerPackageToProject('uw-slim-header','~0.0.1');
  },

  afterInstall: function(options) {

    this._copyHeaderBowerFiles();

    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: '~3.1.0-beta.5' },
      { name: 'broccoli-clean-css', target: '~1.0.0' }
    ]);
  },

  // copy assets from bower path, into ember app path, for use in app
  _copyHeaderBowerFiles: function() {
    var bowerSrcDir = path.join(process.cwd(), 'bower_components', 'uw-slim-header');
    var bowerAssets = {
      styleFiles: [
        'mini50.scss',
        'structure.scss',
        '_settings.scss'
      ],

      assetsDir: path.join(bowerSrcDir, 'assets')
    };

    // new app's standard style path location (destination)
    var appStylePath = path.join(process.cwd(), 'app', 'styles');

    console.log('[uw-slim-header] About to copy styles');

    // copy scss files from bower to app/styles (destination)
    bowerAssets.styleFiles.forEach(
      function(file) {
        fs.copy(
          path.join(bowerSrcDir, file),
          path.join(appStylePath, file),
          function(err) {
            if (err) return console.error(err);
            console.log('[uw-slim-header] Done copying styles');
          }
        )
      }
    );

    // copy all assets in assets dir to public
    fs.copy(
      bowerAssets.assetsDir,
      path.join(process.cwd(), 'public', 'assets'),
      function(err) {
        if (err) return console.error(err);
        console.log('[uw-slim-header] Done coping all assets');
      }
    );

  }
};
