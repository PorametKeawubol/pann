'use strict';

module.exports = {
  routes: [ //custom routes
    {
      method: 'PUT',
      path: '/entries/:id/confirm',
      handler: 'entry.confirm'
    }
  ]
}
