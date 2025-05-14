'use strict';
/**
 * service router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;

// Create a custom router with default routes
const defaultRouter = createCoreRouter('api::service.service');

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
    path: '/services/:id',
    handler: 'service.findOne',
    config: {
      auth: {
        scope: ['find']
      }
    },
  },
  {
    method: 'DELETE',
    path: '/services/:id',
    handler: 'service.delete',
    config: {
      auth: {
        scope: ['delete']
      }
    },
  },
  {
    method: 'PUT',
    path: '/services/:id',
    handler: 'service.update',
    config: {
      auth: {
        scope: ['update']
      }
    },
  },
  {
    method: 'POST',
    path: '/services',
    handler: 'service.create',
    config: {
      auth: {
        scope: ['create'],
      },
    },
  }
];


// Export the customized router
module.exports = customRouter(defaultRouter, myExtraRoutes);