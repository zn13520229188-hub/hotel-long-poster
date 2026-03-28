module.exports = function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const baseUrl = `${proto}://${host}`;

  const schema = {
    openapi: '3.1.0',
    info: {
      title: 'Hotel Long Poster API',
      version: '1.0.0',
      description: 'Minimal starter API for GPT Actions. Returns a demo long-poster result.'
    },
    servers: [{ url: baseUrl }],
    paths: {
      '/api/generate_long_poster': {
        post: {
          operationId: 'generateLongPoster',
          summary: 'Generate a demo hotel long poster result',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hotel_name: { type: 'string', description: 'Hotel name' },
                    city: { type: 'string', description: 'City name' },
                    style: { type: 'string', description: 'Poster style' },
                    selling_points: {
                      type: 'array',
                      items: { type: 'string' },
                      description: 'Key selling points'
                    }
                  },
                  required: ['hotel_name']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Generation result',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      poster_url: { type: 'string', format: 'uri' },
                      preview_url: { type: 'string', format: 'uri' },
                      sections: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            section_no: { type: 'integer' },
                            title: { type: 'string' },
                            short_copy: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(schema);
};
