const path = require('path');

const files = require.context('./modules', false, /\.js$/);
console.log(files);
const modules = {};
files.keys().forEach(key => {
  const name = path.basename(key, '.js');
  modules[name] = files(key).default || files(key);
});
export default modules;
