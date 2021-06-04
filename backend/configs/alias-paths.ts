import moduleAlias from 'module-alias';
import path from 'path';

const rootDir = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '@root': rootDir,
  '@constants': path.resolve(rootDir, 'constants'),
  '@controllers': path.resolve(rootDir, 'controllers'),
  '@database': path.resolve(rootDir, 'database'),
  '@models': path.resolve(rootDir, 'models'),

  routes: path.resolve(rootDir, 'routes'),
  '@routes': path.resolve(rootDir, 'routes'),

  api: path.resolve(rootDir, 'routes/api'),
  '@api': path.resolve(rootDir, 'routes/api'),

  '@schemas': path.resolve(rootDir, 'schemas'),
  '@utils': path.resolve(rootDir, 'utils')
});
