import NProgress from 'nprogress';

module.exports = {
  path: '/dashboard/collapse',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
			require('nprogress').done();
      cb(null, require('./Collapse'))
    });
  }
}