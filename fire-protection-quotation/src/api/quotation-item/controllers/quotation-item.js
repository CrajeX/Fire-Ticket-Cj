// 'use strict';
// /**
//  * quotation-item controller
//  */
// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::quotation-item.quotation-item', ({ strapi }) => ({
//   // Find a quotation item by ID
//   async findOne(ctx) {
//     const { id } = ctx.params;
    
//     try {
//       const entity = await strapi.db.query('api::quotation-item.quotation-item').findOne({
//         where: { id },
//         populate: {
//           quotation: true,
//           service: true,
//         },
//       });
      
//       if (!entity) {
//         return ctx.notFound('Quotation item not found');
//       }
      
//       const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
//       return this.transformResponse(sanitizedEntity);
//     } catch (error) {
//       ctx.body = error;
//       return ctx.badRequest('An error occurred while fetching the quotation item');
//     }
//   },
  
//   // Delete a quotation item by ID
//   async delete(ctx) {
//     const { id } = ctx.params;
    
//     try {
//       const quotationItem = await strapi.entityService.delete('api::quotation-item.quotation-item', id);
//       return ctx.send({ message: 'Quotation item deleted', data: quotationItem });
//     } catch (error) {
//       return ctx.badRequest(`Error deleting quotation item: ${error.message}`);
//     }
//   },
  
//   // Update a quotation item by ID
//   async update(ctx) {
//     const { id } = ctx.params;
//     const requestBody = ctx.request.body;
    
//     try {
//       const existingItem = await strapi.db.query('api::quotation-item.quotation-item').findOne({
//         where: { id: id }
//       });
      
//       if (!existingItem) {
//         return ctx.notFound('Quotation item not found');
//       }
      
//       let updateData;
//       if (requestBody.data) {
//         updateData = requestBody.data;
//       } else {
//         updateData = requestBody;
//       }
      
//       if (updateData.id) {
//         delete updateData.id;
//       }
      
//       // Calculate the total if quantity and unitPrice are provided but total is not
//       if (updateData.quantity !== undefined && updateData.unitPrice !== undefined && updateData.total === undefined) {
//         const discount = updateData.discount || 0;
//         updateData.total = (updateData.quantity * updateData.unitPrice) * (1 - discount / 100);
//       }
      
//       const updatedItem = await strapi.db.query('api::quotation-item.quotation-item').update({
//         where: { id: id },
//         data: updateData
//       });
      
//       const sanitizedEntity = await this.sanitizeOutput(updatedItem, ctx);
//       return this.transformResponse(sanitizedEntity);
//     } catch (error) {
//       console.error('Update Error:', error);
//       return ctx.badRequest(`Error updating quotation item: ${error.message}`);
//     }
//   },
  
//   // Create a new quotation item
// async create(ctx) {
//   const requestBody = ctx.request.body;
  
//   try {
//     const inputData = requestBody.data || requestBody;
    
//     // Log the input data to help with debugging
//     console.log("Input data:", JSON.stringify(inputData, null, 2));
    
//     // Validate that quotation exists if quotation ID is provided
//     if (inputData.quotation) {
//       // Handle different formats of quotation data
//       let quotationId;
      
//       if (typeof inputData.quotation === 'object' && inputData.quotation !== null) {
//         quotationId = inputData.quotation.id;
//       } else if (typeof inputData.quotation === 'number' || typeof inputData.quotation === 'string') {
//         quotationId = inputData.quotation;
//       } else {
//         return ctx.badRequest('Invalid quotation format. Expected an ID or an object with an ID.');
//       }
      
//       if (!quotationId) {
//         return ctx.badRequest('Quotation ID is required');
//       }
      
//       // Check if quotation exists before proceeding
//       const existingQuotation = await strapi.db.query('api::quotation.quotation').findOne({
//         where: { id: quotationId }
//       });
      
//       if (!existingQuotation) {
//         return ctx.badRequest(`Quotation with ID ${quotationId} does not exist`);
//       }
      
//       // Ensure the quotation is properly formatted for Strapi relations
//       inputData.quotation = quotationId;
//     } else {
//       // If no quotation is provided, return an error
//       return ctx.badRequest('A quotation must be associated with this item');
//     }
    
//     const sanitizedInput = await this.sanitizeInput(inputData, ctx);
    
//     // Calculate the total if quantity and unitPrice are provided but total is not
//     if (sanitizedInput.quantity && sanitizedInput.unitPrice && !sanitizedInput.total) {
//       const discount = sanitizedInput.discount || 0;
//       sanitizedInput.total = (sanitizedInput.quantity * sanitizedInput.unitPrice) * (1 - discount / 100);
//     }
    
//     console.log("Sanitized input before create:", JSON.stringify(sanitizedInput, null, 2));
    
//     const newItem = await strapi.entityService.create('api::quotation-item.quotation-item', {
//       data: sanitizedInput,
//       populate: ['quotation'], // Make sure the quotation relationship is populated
//     });
    
//     console.log("New item created:", JSON.stringify(newItem, null, 2));
    
//     // Update the related quotation's totalAmount
//     if (newItem && newItem.quotation) {
//       let quotationId;
      
//       // Handle different response formats from Strapi
//       if (typeof newItem.quotation === 'object' && newItem.quotation !== null) {
//         quotationId = newItem.quotation.id;
//       } else {
//         quotationId = newItem.quotation;
//       }
      
//       if (!quotationId) {
//         console.warn('Unable to determine quotation ID from the new item');
//       } else {
//         const quotationItems = await strapi.db.query('api::quotation-item.quotation-item').findMany({
//           where: { quotation: quotationId },
//         });
        
//         const totalAmount = quotationItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
        
//         await strapi.db.query('api::quotation.quotation').update({
//           where: { id: quotationId },
//           data: { totalAmount },
//         });
//       }
//     } else {
//       console.warn('No quotation found in the created item');
//     }
    
//     const sanitizedEntity = await this.sanitizeOutput(newItem, ctx);
//     return this.transformResponse(sanitizedEntity);
//   } catch (error) {
//     console.error('Create Error:', error);
//     console.error('Error stack:', error.stack);
    
//     // Provide more detailed error message for relation errors
//     if (error.message && error.message.includes('relation')) {
//       return ctx.badRequest(
//         'Invalid relation: Make sure the referenced quotation exists and the ID is correct.'
//       );
//     }
    
//     // Handle null/undefined property access errors
//     if (error.message && error.message.includes('Cannot read properties of undefined')) {
//       return ctx.badRequest(
//         'An error occurred with data processing. Please check that all required fields are provided correctly.'
//       );
//     }
    
//     return ctx.badRequest(`Error creating quotation item: ${error.message}`);
//   }
// }
// }));
'use strict';
/**
 * quotation-item controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::quotation-item.quotation-item', ({ strapi }) => ({
  // Find a quotation item by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      const entity = await strapi.db.query('api::quotation-item.quotation-item').findOne({
        where: { id },
        populate: {
          quotation: true,
          service: true,
        },
      });
      
      if (!entity) {
        return ctx.notFound('Quotation item not found');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.body = error;
      return ctx.badRequest('An error occurred while fetching the quotation item');
    }
  },
  
  // Delete a quotation item by ID
  async delete(ctx) {
    const { id } = ctx.params;
    
    try {
      // Get the quotation ID before deletion for later update
      const itemToDelete = await strapi.db.query('api::quotation-item.quotation-item').findOne({
        where: { id },
        populate: { quotation: true }
      });
      
      const quotationId = itemToDelete?.quotation?.id || null;
      
      const quotationItem = await strapi.entityService.delete('api::quotation-item.quotation-item', id);
      
      // Update the quotation total after deletion
      if (quotationId) {
        await updateQuotationTotal(quotationId);
      }
      
      return ctx.send({ message: 'Quotation item deleted', data: quotationItem });
    } catch (error) {
      return ctx.badRequest(`Error deleting quotation item: ${error.message}`);
    }
  },
  
  // Update a quotation item by ID
  async update(ctx) {
    const { id } = ctx.params;
    const requestBody = ctx.request.body;
    
    try {
      const existingItem = await strapi.db.query('api::quotation-item.quotation-item').findOne({
        where: { id: id },
        populate: { quotation: true }
      });
      
      if (!existingItem) {
        return ctx.notFound('Quotation item not found');
      }
      
      // Store quotation ID for later use
      const quotationId = existingItem?.quotation?.id || null;
      
      // Process update data
      let updateData;
      if (requestBody.data) {
        updateData = { ...requestBody.data };
      } else {
        updateData = { ...requestBody };
      }
      
      // Remove ID fields to prevent incrementation
      if (updateData.id) {
        delete updateData.id;
      }
      
      // Ensure quotation relationship isn't modified unexpectedly
      if (updateData.quotation) {
        if (typeof updateData.quotation === 'object' && updateData.quotation !== null) {
          // Use only the ID, not the full object
          updateData.quotation = updateData.quotation.id;
        }
        // Else it's already an ID format, no change needed
      }
      
      // Calculate the total if quantity and unitPrice are provided but total is not
      if (updateData.quantity !== undefined && updateData.unitPrice !== undefined && updateData.total === undefined) {
        const discount = updateData.discount || 0;
        updateData.total = (updateData.quantity * updateData.unitPrice) * (1 - discount / 100);
      }
      
      const updatedItem = await strapi.db.query('api::quotation-item.quotation-item').update({
        where: { id: id },
        data: updateData
      });
      
      // Update the quotation total
      if (quotationId) {
        await updateQuotationTotal(quotationId);
      }
      
      const sanitizedEntity = await this.sanitizeOutput(updatedItem, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Update Error:', error);
      return ctx.badRequest(`Error updating quotation item: ${error.message}`);
    }
  },
  
  // Create a new quotation item
  async create(ctx) {
    const requestBody = ctx.request.body;
    
    try {
      // Process input data
      let inputData;
      if (requestBody.data) {
        inputData = { ...requestBody.data };
      } else {
        inputData = { ...requestBody };
      }
      
      // Remove ID to prevent incrementation
      if (inputData.id) {
        delete inputData.id;
      }
      
      // Validate quotation relation
      if (inputData.quotation) {
        // Extract quotation ID from different formats
        let quotationId;
        
        if (typeof inputData.quotation === 'object' && inputData.quotation !== null) {
          quotationId = inputData.quotation.id;
        } else if (typeof inputData.quotation === 'number' || typeof inputData.quotation === 'string') {
          quotationId = inputData.quotation;
        } else {
          return ctx.badRequest('Invalid quotation format. Expected an ID or an object with an ID.');
        }
        
        if (!quotationId) {
          return ctx.badRequest('Quotation ID is required');
        }
        
        // Check if quotation exists
        const existingQuotation = await strapi.db.query('api::quotation.quotation').findOne({
          where: { id: quotationId }
        });
        
        if (!existingQuotation) {
          return ctx.badRequest(`Quotation with ID ${quotationId} does not exist`);
        }
        
        // Use just the ID for the relation
        inputData.quotation = quotationId;
      } else {
        return ctx.badRequest('A quotation must be associated with this item');
      }
      
      // Calculate total if needed
      if (inputData.quantity && inputData.unitPrice && !inputData.total) {
        const discount = inputData.discount || 0;
        inputData.total = (inputData.quantity * inputData.unitPrice) * (1 - discount / 100);
      }
      
      // Create the new item
      const sanitizedInput = await this.sanitizeInput(inputData, ctx);
      const newItem = await strapi.entityService.create('api::quotation-item.quotation-item', {
        data: sanitizedInput
      });
      
      // Get the quotation ID for updating total
      const quotationId = inputData.quotation;
      
      // Update the quotation total
      if (quotationId) {
        await updateQuotationTotal(quotationId);
      }
      
      const sanitizedEntity = await this.sanitizeOutput(newItem, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Create Error:', error);
      console.error('Error stack:', error.stack);
      
      if (error.message && error.message.includes('relation')) {
        return ctx.badRequest(
          'Invalid relation: Make sure the referenced quotation exists and the ID is correct.'
        );
      }
      
      if (error.message && error.message.includes('Cannot read properties')) {
        return ctx.badRequest(
          'An error occurred with data processing. Please check that all required fields are provided correctly.'
        );
      }
      
      return ctx.badRequest(`Error creating quotation item: ${error.message}`);
    }
  }
}));

// Helper function to update quotation total
async function updateQuotationTotal(quotationId) {
  if (!quotationId) {
    console.warn('No quotation ID provided to updateQuotationTotal');
    return;
  }

  try {
    // Get all items for this quotation
    const items = await strapi.db.query('api::quotation-item.quotation-item').findMany({
      where: { quotation: quotationId }
    });
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    
    // Update quotation with just the total amount, not modifying any other fields
    await strapi.db.query('api::quotation.quotation').update({
      where: { id: quotationId },
      data: { totalAmount }
    });
  } catch (error) {
    console.error(`Error updating quotation total for ID ${quotationId}:`, error);
  }
}