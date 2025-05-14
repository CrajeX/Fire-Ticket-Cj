'use strict';
/**
 * service controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service.service', ({ strapi }) => ({
  // Find a service by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      const entity = await strapi.db.query('api::service.service').findOne({
        where: { id },
        populate: {
          quotation_items: true,
        },
      });
      
      if (!entity) {
        return ctx.notFound('Service not found');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.body = error;
      return ctx.badRequest('An error occurred while fetching the service');
    }
  },
  
  // Delete a service by ID
  async delete(ctx) {
    const { id } = ctx.params;
    
    try {
      const service = await strapi.entityService.delete('api::service.service', id);
      return ctx.send({ message: 'Service deleted', data: service });
    } catch (error) {
      return ctx.badRequest(`Error deleting service: ${error.message}`);
    }
  },
  
  // Update a service by ID
  async update(ctx) {
    const { id } = ctx.params;
    const requestBody = ctx.request.body;
    
    try {
      const existingService = await strapi.db.query('api::service.service').findOne({
        where: { id: id }
      });
      
      if (!existingService) {
        return ctx.notFound('Service not found');
      }
      
      let updateData;
      if (requestBody.data) {
        updateData = requestBody.data;
      } else {
        updateData = requestBody;
      }
      
      if (updateData.id) {
        delete updateData.id;
      }
      
      const updatedService = await strapi.db.query('api::service.service').update({
        where: { id: id },
        data: updateData
      });
      
      const sanitizedEntity = await this.sanitizeOutput(updatedService, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Update Error:', error);
      return ctx.badRequest(`Error updating service: ${error.message}`);
    }
  },
  
  // Create a new service
  async create(ctx) {
    const requestBody = ctx.request.body;
    
    try {
      const inputData = requestBody.data || requestBody;
      const sanitizedInput = await this.sanitizeInput(inputData, ctx);
      
      const newService = await strapi.entityService.create('api::service.service', {
        data: sanitizedInput,
      });
      
      const sanitizedEntity = await this.sanitizeOutput(newService, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Create Error:', error);
      return ctx.badRequest(`Error creating service: ${error.message}`);
    }
  },
}));