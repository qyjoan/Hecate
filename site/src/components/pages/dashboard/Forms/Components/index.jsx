import NProgress from 'nprogress';

module.exports = {
  path: '/dashboard/components',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
			require('nprogress').done();
      cb(null, require('./Components'))
    });
  }
}