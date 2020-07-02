import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

class DiskStorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new aws.S3({
			region: 'us-east-1',
		});
	}

	public async saveFile(file: string): Promise<string> {
		const originalPath = path.resolve(uploadConfig.tmpFolder, file);
		const ContentType = mime.getType(originalPath);
		if (!ContentType) {
			throw new Error('Not found');
		}
		const fileContent = await fs.promises.readFile(originalPath);
		await this.client
			.putObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
			})
			.promise();
		await fs.promises.unlink(originalPath);
		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		this.client.deleteObject({ Bucket: 'app-gobarber', Key: file });
	}
}

export default DiskStorageProvider;
