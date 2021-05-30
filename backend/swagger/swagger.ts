import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const router = Router();

const swaggerUiOpts = {
  explorer: true
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rest API',
    version: '1.0.0',
    contact: {
      name: 'Manh Tran',
      url: 'https://thevuong8000.github.io/',
      email: 'ducmanh.tran2904@gmail.com'
    }
  },

  /* Authentication */
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  security: [{ bearerAuth: [] as string[] }]
};

const swaggerDocOpts: swaggerJsdoc.Options = {
  swaggerDefinition,
  apis: ['./routes/api/*.ts', './models/*.ts']
};

const specs = swaggerJsdoc(swaggerDocOpts);
// console.log(specs);
router.use('/', serve, setup(specs, swaggerUiOpts));

export default router;
