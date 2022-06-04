import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const createDeadlineDoneSchema: SchemaObject | ReferenceObject = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    assigment_id: {
      type: 'integer',
    },
  },
};
