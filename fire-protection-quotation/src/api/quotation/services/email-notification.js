'use strict';

/**
 * Email notification service
 */

module.exports = ({ strapi }) => ({
  async sendQuotationEmail(quotationId, recipientEmail) {
    // Fetch quotation with related data
    const quotation = await strapi.entityService.findOne('api::quotation::quotation', quotationId, {
      populate: ['customer', 'quotationItems', 'quotationItems.service'],
    });
    
    if (!quotation) {
      throw new Error('Quotation not found');
    }
    
    // Format email content
    const itemsList = quotation.quotationItems.map(item => 
      `- ${item.quantity}x ${item.service.name}: $${item.total.toFixed(2)}`
    ).join('\n');
    
    const emailContent = `
Dear ${quotation.customer.name},

Your quotation #${quotation.reference} is ready for review.

Quotation Details:
- Reference: ${quotation.reference}
- Date: ${new Date(quotation.date).toLocaleDateString()}
- Valid Until: ${quotation.validUntil ? new Date(quotation.validUntil).toLocaleDateString() : 'N/A'}
- Total Amount: $${quotation.totalAmount.toFixed(2)}

Items:
${itemsList}

Notes:
${quotation.notes || 'No additional notes.'}

Thank you for choosing our services.

Best regards,
Fire Protection Services Team
    `;
    
    // Send email
    try {
      await strapi.plugins['email'].services.email.send({
        to: recipientEmail || quotation.customer.email,
        subject: `Fire Protection Quotation #${quotation.reference}`,
        text: emailContent,
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
});