'use strict';

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    
    // Ensure total is calculated
    if (data.unitPrice && data.quantity) {
      data.total = data.unitPrice * data.quantity * (1 - (data.discount || 0) / 100);
    }
  },
  
  beforeUpdate(event) {
    const { data } = event.params;
    
    // Recalculate total if quantity, unitPrice, or discount changes
    if ((data.unitPrice !== undefined || data.quantity !== undefined || data.discount !== undefined) && 
        event.params.where && event.params.where.id) {
      
      // This will be called with the full entity during the update operation
      const updateTotal = async (item) => {
        const unitPrice = data.unitPrice !== undefined ? data.unitPrice : item.unitPrice;
        const quantity = data.quantity !== undefined ? data.quantity : item.quantity;
        const discount = data.discount !== undefined ? data.discount : (item.discount || 0);
        
        data.total = unitPrice * quantity * (1 - discount / 100);
      };
      
      event.model.lifecycles.updateTotal = updateTotal;
    }
  },
  
  async afterCreate(event) {
    const { result } = event;
    
    // Safely handle the quotation relation
    if (result && result.quotation) {
      // If quotation is an object with an id
      if (typeof result.quotation === 'object' && result.quotation !== null) {
        await updateQuotationTotal(strapi, result.quotation.id);
      } 
      // If quotation is just the ID
      else if (typeof result.quotation === 'number' || typeof result.quotation === 'string') {
        await updateQuotationTotal(strapi, result.quotation);
      }
    } else if (result && result.id) {
      // If the quotation relation isn't populated, fetch the full item with relations
      try {
        const fullItem = await strapi.entityService.findOne('api::quotation-item.quotation-item', result.id, {
          populate: ['quotation']
        });
        
        if (fullItem && fullItem.quotation) {
          const quotationId = typeof fullItem.quotation === 'object' ? 
            fullItem.quotation.id : fullItem.quotation;
            
          if (quotationId) {
            await updateQuotationTotal(strapi, quotationId);
          }
        }
      } catch (error) {
        console.error('Error fetching quotation item details:', error);
      }
    }
  },
  
  async afterUpdate(event) {
    const { result } = event;
    
    // Update quotation total
    if (result && result.quotation) {
      // Handle both object and primitive formats
      const quotationId = typeof result.quotation === 'object' && result.quotation !== null ? 
        result.quotation.id : result.quotation;
        
      if (quotationId) {
        await updateQuotationTotal(strapi, quotationId);
      }
    } else if (result && result.id) {
      // If the quotation relation isn't populated, fetch the full item
      try {
        const fullItem = await strapi.entityService.findOne('api::quotation-item.quotation-item', result.id, {
          populate: ['quotation']
        });
        
        if (fullItem && fullItem.quotation) {
          const quotationId = typeof fullItem.quotation === 'object' ? 
            fullItem.quotation.id : fullItem.quotation;
            
          if (quotationId) {
            await updateQuotationTotal(strapi, quotationId);
          }
        }
      } catch (error) {
        console.error('Error fetching quotation item details:', error);
      }
    }
  },
  
  async afterDelete(event) {
    const { result } = event;
    
    // Update quotation total
    if (result && result.quotation) {
      // Handle both object and primitive formats
      const quotationId = typeof result.quotation === 'object' && result.quotation !== null ? 
        result.quotation.id : result.quotation;
        
      if (quotationId) {
        await updateQuotationTotal(strapi, quotationId);
      }
    }
  }
};

// Helper function to update quotation total
async function updateQuotationTotal(strapi, quotationId) {
  if (!quotationId) {
    console.warn('No quotation ID provided to updateQuotationTotal');
    return;
  }

  try {
    // Get all items for this quotation
    const items = await strapi.entityService.findMany('api::quotation-item.quotation-item', {
      filters: { quotation: quotationId }
    });
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    
    // Update quotation
    await strapi.entityService.update('api::quotation.quotation', quotationId, {
      data: { totalAmount }
    });
  } catch (error) {
    console.error(`Error updating quotation total for ID ${quotationId}:`, error);
  }
}