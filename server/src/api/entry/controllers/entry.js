'use strict';

const entry = require('../services/entry');

/**
 * entry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::entry.entry', ({ strapi }) => ({
    async find(ctx) {
        //only used by student
        return await super.find(ctx)
    },
    
    async confirm(ctx) {
        const entityId = ctx.params.id;
        try {
            let ConfirmView1 = await strapi.entityService.findOne('api::entry.entry', entityId)
            ConfirmView1 = await strapi.entityService.update('api::entry.entry', entityId, {
                data: {
                    
                    ConfirmView: true,
               
                    user : ctx.state.user.id //fgh;fh;h;hsppshlh,[sh,[hs,p[hs]]]
        
                             
                }
                })
            ctx.body = {ConfirmView:true };
        } catch (err) {
            ctx.body = err;
        }
    },
})
);
