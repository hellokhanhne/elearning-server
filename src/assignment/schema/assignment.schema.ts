import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const createAssignmentSchema: SchemaObject | ReferenceObject = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    desc: {
      type: 'string',
    },
    deadline: {
      type: 'date',
    },
    content: {
      type: 'string',
    },
    subject_class_id: {
      type: 'integer',
    },
  },
};
