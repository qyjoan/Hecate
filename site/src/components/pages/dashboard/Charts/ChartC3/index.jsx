import NProgress from 'nprogress';

module.exports = {
  path: '/dashboard/chartc3',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
			require('nprogress').done();
      cb(null, require('./ChartC3'))
    });
  }
}