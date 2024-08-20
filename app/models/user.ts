import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import UserPhoto from './userphoto.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {

  @column({ isPrimary: true})
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare middleName: string | null

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  /**
   * Relationships
   */

  @hasMany(() => UserPhoto, {
    localKey: 'id',
    foreignKey: 'userId'
  })
  declare userPhoto: HasMany<typeof UserPhoto>

  /**
   * Statics
   */

  @beforeCreate()
  static async createId(user: User) {
    user.id = randomUUID()

  }
}