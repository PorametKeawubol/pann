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
                    ack_datetime :new Date() ,
                    seen_datetime: new Date(),
                    user : ctx.state.user.id 
        
                             
                }
                })
            ctx.body = {ConfirmView:true };
        } catch (err) {
            ctx.body = err;
        }
    },
    async seenview(ctx) {
        const entityId = ctx.params.id;
        try {
            let seenView1 = await strapi.entityService.findOne('api::entry.entry', entityId)
            seenView1 = await strapi.entityService.update('api::entry.entry', entityId, {
                data: {
                    
                    
                    
                    seen_datetime: new Date(),
                    user : ctx.state.user.id 
        
                             
                }
                })
            ctx.body = {seenView:new Date()};
        } catch (err) {
            ctx.body = err;
        }
    },
})
);
