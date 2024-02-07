import { NextApiRequest } from 'next';
import { ParsedFile } from 'multer';

declare module 'next' {
  export interface NextApiRequest {
    files?: ParsedFile[];
  }
}
