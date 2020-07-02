import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import upload from '@config/upload';

@Entity('users')
class Users {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'avatar_url' })
	get avatar_url_return(): string {
		if (!this.avatar) {
			return null;
		}
		switch (upload.driver) {
			case 'disk':
				return `${process.env.APP_API_URL}/files/${this.avatar}`;
			case 's3':
				return `http://${upload.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
			default:
				return null;
		}
	}
}

export default Users;
