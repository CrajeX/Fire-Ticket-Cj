'use strict';
/**
 * customer router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;

// Create a custom router with default routes
const defaultRouter = createCoreRouter('api::customer.customer');

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
      path: '/customers/:id',
      handler: 'customer.findOne',
      config: {
        auth: {
          scope: ['find']
        }
      },
    },
    {
      method: 'DELETE',
      path: '/customers/:id',
      handler: 'customer.delete',
      config: {
        auth: {
          scope: ['delete']
        }
      },
    },
    {
      method: 'PUT',
      path: '/customers/:id',
      handler: 'customer.update',
      config: {
        auth: {
          scope: ['update']
        }
      },
    },
   {
  method: 'POST',
  path: '/customers',
  handler: 'customer.create',
  config: {
    auth: {
      scope: ['create'],
    },
  },
}

];


// Export the customized router
module.exports = customRouter(defaultRouter, myExtraRoutes);