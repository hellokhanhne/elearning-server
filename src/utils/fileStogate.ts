import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const saveFileToStorage = {
  storage: diskStorage({
    destination: './files/resource',
    filename: (req, file, cb) => {
      try {
        // console.log('req', req);
        const split = file.originalname.split('.');
        const fileNameExtension: string = '.' + split[split.length - 1];
        const fileName: string = uuidv4() + fileNameExtension;
        cb(null, fileName);
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
