'use strict';
/**
 * quotation router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;

// Create a custom router with default routes
const defaultRouter = createCoreRouter('api::quotation.quotation');

// Customize the router by adding or overriding routes
const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

// Define your custom routes
const myExtraRoutes = [
  {
    method: 'GET',
    path: '/quotations/:id',
    handler: 'quotation.findOne',
    config: {
      auth: {
        scope: ['find']
      }
    },
  },
  {
    method: 'DELETE',
    path: '/quotations/:id',
    handler: 'quotation.delete',
    config: {
      auth: {
        scope: ['delete']
      }
    },
  },
  {
    method: 'PUT',
    path: '/quotations/:id',
    handler: 'quotation.update',
    config: {
      auth: {
        scope: ['update']
      }
    },
  },
  {
    method: 'POST',
    path: '/quotations',
    handler: 'quotation.create',
    config: {
      auth: {
        scope: ['create'],
      },
    },
  },
  // Custom route for calculating the total amount
  {
    method: 'GET',
    path: '/quotations/:id/calculate-total',
    handler: 'quotation.calculateTotal',
    config: {
      auth: {
        scope: ['update']
      }
    },
  }
];


// Export the customized router
module.exports = customRouter(defaultRouter, myExtraRoutes);