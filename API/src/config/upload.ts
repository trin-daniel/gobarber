import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
	driver: 's3' | 'disk';
	tmpFolder: string;
	uploadsFolder: string;
	multer: {
		storage: StorageEngine;
	};
	config: {
		disk: {};
		aws: {
			bucket: string;
		};
	};
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
	driver: process.env.STORAGE_DRIVE,
	tmpFolder,
	uploadsFolder: path.resolve(tmpFolder, 'uploads'),
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('HEX');
				const filename = `${fileHash}-${file.originalname}`;
				return callback(null, filename);
			},
		}),
	},
	config: {
		disk: {},
		aws: {
			bucket: 'app-gobarber',
		},
	},
} as IUploadConfig;
