'use strict';
/**
 * technician controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::technician.technician', ({ strapi }) => ({
  // Find a technician by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      // Fetch the technician by ID
      const entity = await strapi.db.query('api::technician.technician').findOne({
        where: { id },
        populate: {
          // Add any fields to populate here if needed
          // Example: assignments: true,
        },
      });
      
      if (!entity) {
        return ctx.notFound('Technician not found');
      }
      
      // Sanitize and return the technician data
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.body = error;
      return ctx.badRequest('An error occurred while fetching the technician');
    }
  },

  // Delete a technician by ID
  async delete(ctx) {
    const { id } = ctx.params;
    
    try {
      // Manually delete the entity to ensure it's gone
      const technician = await strapi.entityService.delete('api::technician.technician', id);
      return ctx.send({ message: 'Technician deleted', data: technician });
    } catch (error) {
      return ctx.badRequest(`Error deleting technician: ${error.message}`);
    }
  },

  // Update a technician by ID
  async update(ctx) {
    // Get the ID from params
    const { id } = ctx.params;
    
    // Get the data from request body
    const requestBody = ctx.request.body;
    
    try {
      // Verify the technician exists
      const existingTechnician = await strapi.db.query('api::technician.technician').findOne({
        where: { id: id }
      });
      
      if (!existingTechnician) {
        return ctx.notFound('Technician not found');
      }
      
      // Extract data properly - handle both formats that might be sent
      let updateData;
      if (requestBody.data) {
        updateData = requestBody.data;
      } else {
        updateData = requestBody;
      }
      
      // Remove id from update data if present
      if (updateData.id) {
        delete updateData.id;
      }
      
      // Use the query interface for direct update
      const updatedTechnician = await strapi.db.query('api::technician.technician').update({
        where: { id: id },
        data: updateData
      });
      
      // Return the result
      const sanitizedEntity = await this.sanitizeOutput(updatedTechnician, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Update Error:', error);
      return ctx.badRequest(`Error updating technician: ${error.message}`);
    }
  },

  // Create a new technician
  async create(ctx) {
    const requestBody = ctx.request.body;
    
    try {
      const inputData = requestBody.data || requestBody;
      
      // Sanitize input data
      const sanitizedInput = await this.sanitizeInput(inputData, ctx);
      
      // Create new technician using entityService
      const newTechnician = await strapi.entityService.create('api::technician.technician', {
        data: sanitizedInput,
      });
      
      // Sanitize and return output
      const sanitizedEntity = await this.sanitizeOutput(newTechnician, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Create Error:', error);
      return ctx.badRequest(`Error creating technician: ${error.message}`);
    }
  },
}));