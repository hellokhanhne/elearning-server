import { fromFile } from 'file-type';
import fs from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

type validateTypeExtension = 'png' | 'ipg' | 'jpeg';
type valiMineFile = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validateTypeExtension[] = ['ipg', 'jpeg', 'png'];
const valiMineFiles: valiMineFile[] = ['image/jpeg', 'image/jpg', 'image/png'];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './files/images',
    filename: (req, file, cb) => {
      console.log(file);
      const split = file.originalname.split('.');
      const fileNameExtension: string = '.' + split[split.length - 1];
      const fileName: string = uuidv4() + fileNameExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: valiMineFile[] = valiMineFiles;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};

export const isFileExtensionSafe = async (
  fullFilePath: string,
): Promise<boolean> => {
  const fileExtensionAndMimeType: any = await fromFile(fullFilePath);
  if (!fileExtensionAndMimeType) return false;

  const isFileTypeLegit = validFileExtensions.includes(
    fileExtensionAndMimeType.ext,
  );
  const isFileTypeMini = valiMineFiles.includes(fileExtensionAndMimeType.mime);

  return isFileTypeLegit && isFileTypeMini;
};

export const removeFile = (fullpath: string) => {
  try {
    fs.unlinkSync(fullpath);
  } catch (error) {
    throw new Error(error);
  }
};
