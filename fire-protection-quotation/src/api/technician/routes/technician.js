'use strict';
/**
 * technician router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;

// Create a custom router with default routes
const defaultRouter = createCoreRouter('api::technician.technician');

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
    path: '/technicians/:id',
    handler: 'technician.findOne',
    config: {
      auth: {
        scope: ['find']
      }
    },
  },
  {
    method: 'DELETE',
    path: '/technicians/:id',
    handler: 'technician.delete',
    config: {
      auth: {
        scope: ['delete']
      }
    },
  },
  {
    method: 'PUT',
    path: '/technicians/:id',
    handler: 'technician.update',
    config: {
      auth: {
        scope: ['update']
      }
    },
  },
  {
    method: 'POST',
    path: '/technicians',
    handler: 'technician.create',
    config: {
      auth: {
        scope: ['create'],
      },
    },
  }
];

// Export the customized router
module.exports = customRouter(defaultRouter, myExtraRoutes);