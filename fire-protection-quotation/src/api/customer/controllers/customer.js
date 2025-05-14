// Controller file: ./src/api/customer/controllers/customer.js
'use strict';

/**
 * customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer', ({ strapi }) => ({
  // Find a customer by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      // Fetch the customer by ID
      const entity = await strapi.db.query('api::customer.customer').findOne({
        where: { id },
        populate: {
          // Example: orders: true,
        },
      });
      
      if (!entity) {
        return ctx.notFound('Customer not found');
      }
      
      // Sanitize and return the customer data
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.body = error;
      return ctx.badRequest('An error occurred while fetching the customer');
    }
  },

  // Delete a customer by ID
  async delete(ctx) {
    const { id } = ctx.params;

    // Manually delete the entity to ensure it's gone
    const customer = await strapi.entityService.delete('api::customer.customer', id);

    return ctx.send({ message: 'Customer deleted', data: customer });
  },
async update(ctx) {
  // Get the ID from params
  const { id } = ctx.params;
  
  // Get the data from request body
  const requestBody = ctx.request.body;
  
  try {
    // Verify the customer exists
    const existingCustomer = await strapi.db.query('api::customer.customer').findOne({
      where: { id: id }
    });
    
    if (!existingCustomer) {
      return ctx.notFound('Customer not found');
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
    
    // Use the query interface for direct update instead of entityService
    const updatedCustomer = await strapi.db.query('api::customer.customer').update({
      where: { id: id },
      data: updateData
    });
    
    // Return the result
    const sanitizedEntity = await this.sanitizeOutput(updatedCustomer, ctx);
    return this.transformResponse(sanitizedEntity);
  } catch (error) {
    console.error('Update Error:', error);
    return ctx.badRequest(`Error updating customer: ${error.message}`);
  }
},
  async create(ctx) {
    const requestBody = ctx.request.body;

    try {
      const inputData = requestBody.data || requestBody;

      // Sanitize input data
      const sanitizedInput = await this.sanitizeInput(inputData, ctx);

      // Create new customer using entityService
      const newCustomer = await strapi.entityService.create('api::customer.customer', {
        data: sanitizedInput,
      });

      // Sanitize and return output
      const sanitizedEntity = await this.sanitizeOutput(newCustomer, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Create Error:', error);
      return ctx.badRequest(`Error creating customer: ${error.message}`);
    }
  },


}));
