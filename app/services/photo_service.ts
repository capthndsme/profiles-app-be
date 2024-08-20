import User from "#models/user"
import env from "#start/env"
import { MultipartFile } from "@adonisjs/core/bodyparser"
import { join } from "path"
class PhotoService {
  readonly #fileDir = env.get('FILES_DIR')
  async handleCreatePhotos(userObj: User, photos: MultipartFile[]) {
    if (!photos) return;
    for (const photo of photos) {
      // 0. calculate path
      const path = join(this.#fileDir, "profiles", userObj.id)
      const name = `${Date.now()}-photo.${photo.extname}`

      // 1. move photo to final directory
      await photo.move(path, {
        name 
      })

      // 2. assoc database
      await userObj
        .related('userPhoto')
        .create({
          photoLocation: `profiles/${userObj.id}/${name}`
        })

      // finish
      
    }
  }
}

const photoService = new PhotoService()
export default photoService