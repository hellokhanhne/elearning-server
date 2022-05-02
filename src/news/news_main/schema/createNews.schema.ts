import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const createNewsSchema: SchemaObject | ReferenceObject = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
      format: 'binary',
    },
    news_title: {
      type: 'string',
    },
    news_desc: {
      type: 'string',
    },
    news_content: {
      type: 'string',
    },
    news_category_id: {
      type: 'integer',
    },
  },
};
