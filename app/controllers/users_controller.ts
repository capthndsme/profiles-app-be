import CreateUserSchema from '#validators/CreateUserSchema'
import type { HttpContext } from '@adonisjs/core/http'
import { BasicResponseBuilder } from '../response/basic_response.js'
import userService from '#services/user_service';
import User from '#models/user';
import GetUserSchema from '#validators/GetUserSchema';

export default class UsersController {
  async createUser({ request }: HttpContext) {
    try {
      const data = await CreateUserSchema.parseAsync(request.body())
      const photos = request.files('photos')
      return new BasicResponseBuilder<User>()
        .withData(
          await userService.createUser(data, photos)
        )
        .withStatus("OKAY")
        .withError(false)
        .withMessage("User created successfully")
        .build();
    } catch (e) {
      console.error("ERROR", e)
      return new BasicResponseBuilder<null>()
        .withError(true)
        .withData(null)
        .withMessage(e?.message)
        .withStatus("FORM_VALIDATION_FAILURE")
        .build();
    }
  }

  async getUsers() {
    try {
    
      return new BasicResponseBuilder<User[]>()
        .withData(
          await userService.getUsers()
        )
        .withStatus("OKAY")
        .withError(false)
        .withMessage("List Users successfully")
        .build();
    } catch (e) {
      console.error("ERROR", e)
      return new BasicResponseBuilder<null>()
        .withError(true)
        .withData(null)
        .withMessage(e?.message)
        .withStatus("APP_ERROR")
        .build();
    }
  }

  async getUser({ request }: HttpContext) {
    try {
      const {userId} = await GetUserSchema.parseAsync(request.params())
      return new BasicResponseBuilder<User|null>()
        .withData(
          await userService.getUser(userId)
        )
        .withStatus("OKAY")
        .withError(false)
        .withMessage("User get successfully")
        .build();
    } catch (e) {
      console.error("ERROR", e)
      return new BasicResponseBuilder<null>()
        .withError(true)
        .withData(null)
        .withMessage(e?.message)
        .withStatus("NOT_FOUND")
        .build();
    }
  }



}