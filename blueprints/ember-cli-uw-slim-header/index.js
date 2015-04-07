import fs from 'fs-extra';
import path from 'path';

export default {

  description: 'Generates the uw-slim-header assets',

  beforeInstall(options) {
   return this.addBowerPackageToProject('uw-slim-header','~0.0.1');
  },

  afterInstall(options) {

    this._copyHeaderBowerFiles();

    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: '~3.1.0-beta.5' },
      { name: 'broccoli-clean-css', target: '~1.0.0' }
    ]);
  },

  // copy assets from bower path, into ember app path, for use in app
  _copyHeaderBowerFiles() {
    let headerBowerDir = path.join(process.cwd(), 'bower_components', 'uw-slim-header');
    let bowerAssets = {
      styles: [
        'mini50.scss',
        'structure.scss',
        '_settings.scss'
      ],

      assetsDir: path.join(headerBowerDir, 'assets')
    };

    // new app's standard style path location (destination)
    let appStylePath = path.join(process.cwd(), 'app', 'styles');

    // copy scss files from bower to app/styles (destination)
    bowerAssets.styles.forEach(
      (file) => fs.copy(
        path.join(process.cwd(), headerBowerDir, file),
        path.join(process.cwd(), appStylePath, file)
      )
    );

    // copy all assets in assets dir to public
    fs.copy( bowerAssets.assetsDir, path.join(process.cwd(), 'public') );
  }
}
