import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseEntity } from './ResponseEntity';

interface IResponseParttern {
  res: Response;
  success: boolean;
  type: string;
  message?: string;
  status?: HttpStatus;
  data?: Object | any;
}

interface IServerError {
  res: Response;
  message?: string;
  status?: HttpStatus;
}

const ServerError = ({
  res,
  message = 'Internal server error !',
  status = HttpStatus.INTERNAL_SERVER_ERROR,
}: IServerError) => {
  return res.status(status).json(new ResponseEntity(false, message));
};

const CreatePartterRes = ({
  res,
  status,
  type,
  message,
  success,
  data,
}: IResponseParttern) => {
  return res
    .status(
      status || (success ? HttpStatus.CREATED : HttpStatus.NOT_IMPLEMENTED),
    )
    .json(
      new ResponseEntity(
        success,
        message || `Create ${type} ${success ? 'successfully' : 'failed'}`,
        data,
      ),
    );
};

const DeletePartternRes = ({
  res,
  status,
  success,
  type,
  message,
  data,
}: IResponseParttern) => {
  return res
    .status(status || (success ? HttpStatus.OK : HttpStatus.NOT_IMPLEMENTED))
    .json(
      new ResponseEntity(
        success,
        message || `Delete ${type} ${success ? 'successfully' : 'failed'}`,
        data,
      ),
    );
};

const UpdatePartternRes = ({
  res,
  status,
  success,
  type,
  message,
  data,
}: IResponseParttern) => {
  return res
    .status(status || (success ? HttpStatus.OK : HttpStatus.NOT_IMPLEMENTED))
    .json(
      new ResponseEntity(
        success,
        message || `Update ${type} ${success ? 'successfully' : 'failed'}`,
        data,
      ),
    );
};

const GetDataPartternRes = ({
  res,
  status,
  success,
  type,
  message,
  data,
}: IResponseParttern) => {
  return res
    .status(status || (success ? HttpStatus.OK : HttpStatus.NOT_IMPLEMENTED))
    .json(
      new ResponseEntity(
        success,
        message || `Get ${type} ${success ? 'successfully' : 'failed'}`,
        data,
      ),
    );
};

export {
  ServerError,
  DeletePartternRes,
  CreatePartterRes,
  UpdatePartternRes,
  GetDataPartternRes,
};
