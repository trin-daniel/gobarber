import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update avatar', () => {
	it('Should be able to update avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		const createuser = await fakeUsersRepository.create({
			name: 'john wick',
			email: 'jhon@gmail.com',
			password: '123456',
		});

		await updateUserAvatar.execute({
			avatarFilename: 'Avatar.jpg',
			user_id: createuser.id,
		});
		expect(createuser.avatar).toBe('Avatar.jpg');
	});
	it('Should not be able to update avatar from existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
		await expect(
			updateUserAvatar.execute({
				avatarFilename: 'Avatar.jpg',
				user_id: 'non-existing-user',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should delete old avatar when updating new one', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
		const createuser = await fakeUsersRepository.create({
			name: 'john wick',
			email: 'jhon@gmail.com',
			password: '123456',
		});

		await updateUserAvatar.execute({
			avatarFilename: 'Avatar.jpg',
			user_id: createuser.id,
		});
		await updateUserAvatar.execute({
			avatarFilename: 'Avatar2.jpg',
			user_id: createuser.id,
		});
		expect(deleteFile).toHaveBeenCalledWith('Avatar.jpg');
		expect(createuser.avatar).toBe('Avatar2.jpg');
	});
});
