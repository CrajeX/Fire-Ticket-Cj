'use strict';
/**
 * quotation controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quotation.quotation', ({ strapi }) => ({
  // Find a quotation by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      const entity = await strapi.db.query('api::quotation.quotation').findOne({
        where: { id },
        populate: {
          quotation_items: {
            populate: {
              service: true
            }
          },
          customer: true,
          attachments: true
        },
      });
      
      if (!entity) {
        return ctx.notFound('Quotation not found');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.body = error;
      return ctx.badRequest('An error occurred while fetching the quotation');
    }
  },
  
  // Delete a quotation by ID
  async delete(ctx) {
    const { id } = ctx.params;
    
    try {
      // Find and delete all related quotation items first
      const quotationItems = await strapi.db.query('api::quotation-item.quotation-item').findMany({
        where: { quotation: id }
      });
      
      for (const item of quotationItems) {
        await strapi.entityService.delete('api::quotation-item.quotation-item', item.id);
      }
      
      // Then delete the quotation
      const quotation = await strapi.entityService.delete('api::quotation.quotation', id);
      return ctx.send({ message: 'Quotation and all related items deleted', data: quotation });
    } catch (error) {
      return ctx.badRequest(`Error deleting quotation: ${error.message}`);
    }
  },
  
  // Update a quotation by ID
  async update(ctx) {
    const { id } = ctx.params;
    const requestBody = ctx.request.body;
    
    try {
      const existingQuotation = await strapi.db.query('api::quotation.quotation').findOne({
        where: { id: id }
      });
      
      if (!existingQuotation) {
        return ctx.notFound('Quotation not found');
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
      
      // If status is being updated to "approved", set validUntil date if not already set
      if (updateData.status === 'approved' && !updateData.validUntil) {
        const currentDate = new Date();
        const validUntil = new Date(currentDate);
        validUntil.setDate(validUntil.getDate() + 30); // Set valid for 30 days
        updateData.validUntil = validUntil;
      }
      
      const updatedQuotation = await strapi.db.query('api::quotation.quotation').update({
        where: { id: id },
        data: updateData
      });
      
      const sanitizedEntity = await this.sanitizeOutput(updatedQuotation, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Update Error:', error);
      return ctx.badRequest(`Error updating quotation: ${error.message}`);
    }
  },
  
  // Create a new quotation
  async create(ctx) {
    const requestBody = ctx.request.body;
    
    try {
      const inputData = requestBody.data || requestBody;
      const sanitizedInput = await this.sanitizeInput(inputData, ctx);
      
      // Set default values if not provided
      if (!sanitizedInput.date) {
        sanitizedInput.date = new Date();
      }
      
      if (!sanitizedInput.status) {
        sanitizedInput.status = 'draft';
      }
      
      if (!sanitizedInput.totalAmount) {
        sanitizedInput.totalAmount = 0;
      }
      
      const newQuotation = await strapi.entityService.create('api::quotation.quotation', {
        data: sanitizedInput,
      });
      
      const sanitizedEntity = await this.sanitizeOutput(newQuotation, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Create Error:', error);
      return ctx.badRequest(`Error creating quotation: ${error.message}`);
    }
  },
  
  // Calculate the total amount of a quotation based on its items
  async calculateTotal(ctx) {
    const { id } = ctx.params;
    
    try {
      const quotation = await strapi.db.query('api::quotation.quotation').findOne({
        where: { id },
        populate: {
          quotation_items: true
        }
      });
      
      if (!quotation) {
        return ctx.notFound('Quotation not found');
      }
      
      const totalAmount = quotation.quotation_items.reduce((sum, item) => sum + (item.total || 0), 0);
      
      // Update the quotation with the new total
      const updatedQuotation = await strapi.db.query('api::quotation.quotation').update({
        where: { id },
        data: { totalAmount }
      });
      
      const sanitizedEntity = await this.sanitizeOutput(updatedQuotation, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Calculate Total Error:', error);
      return ctx.badRequest(`Error calculating quotation total: ${error.message}`);
    }
  },
}));