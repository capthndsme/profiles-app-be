import User from "#models/user";
import { type CreateUserSchema } from "#validators/CreateUserSchema";
import { MultipartFile } from "@adonisjs/core/bodyparser";
import photoService from "./photo_service.js";

class UserService {
  async createUser(createUserSchema: CreateUserSchema, photos: MultipartFile[]) {

    // safe to assume user is parsed already,
    
    // 1. create user
    const user = await User.create(createUserSchema)

    // 2. bind photos
    await photoService.handleCreatePhotos(user, photos)

    // 3. save
    await user.save()

    // 4. load photo
    await user.load('userPhoto')

    // 5. ret user object
    return user
  }

  async getUser(id:string) {
    return await User.query().preload('userPhoto').where('id', id).first()
  }

  async getUsers() {
    return await User.query().preload('userPhoto')
  }
}


/**
 * Singleton pattern
 */
const userService = new UserService()
export default userService