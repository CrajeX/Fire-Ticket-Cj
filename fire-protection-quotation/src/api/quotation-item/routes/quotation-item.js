'use strict';
/**
 * quotation-item router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;

// Create a custom router with default routes
const defaultRouter = createCoreRouter('api::quotation-item.quotation-item');

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
    path: '/quotation-items/:id',
    handler: 'quotation-item.findOne',
    config: {
      auth: {
        scope: ['find']
      }
    },
  },
  {
    method: 'DELETE',
    path: '/quotation-items/:id',
    handler: 'quotation-item.delete',
    config: {
      auth: {
        scope: ['delete']
      }
    },
  },
  {
    method: 'PUT',
    path: '/quotation-items/:id',
    handler: 'quotation-item.update',
    config: {
      auth: {
        scope: ['update']
      }
    },
  },
  {
    method: 'POST',
    path: '/quotation-items',
    handler: 'quotation-item.create',
    config: {
      auth: {
        scope: ['create'],
      },
    },
  }
];


// Export the customized router
module.exports = customRouter(defaultRouter, myExtraRoutes);