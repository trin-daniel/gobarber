import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;
describe('Update avatar', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeStorageProvider = new FakeStorageProvider();
		updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
	});
	it('Should be able to update avatar', async () => {
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
		await expect(
			updateUserAvatar.execute({
				avatarFilename: 'Avatar.jpg',
				user_id: 'non-existing-user',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should delete old avatar when updating new one', async () => {
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
