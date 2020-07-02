import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import Users from '@modules/users/infra/typeorm/entities/Users';

@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	provider_id: string;

	@ManyToOne(() => Users)
	@JoinColumn({ name: 'provider_id' })
	provider: Users;

	@Column()
	user_id: string;

	@ManyToOne(() => Users)
	@JoinColumn({ name: 'user_id' })
	user: Users;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Appointment;
