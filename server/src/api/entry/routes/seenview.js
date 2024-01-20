'use strict';

module.exports = {
  routes: [ //custom routes
    {
      method: 'PUT',
      path: '/entries/:id/seenview',
      handler: 'entry.seenview'
    }
  ]
}
