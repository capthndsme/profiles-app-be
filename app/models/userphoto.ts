import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import env from '#start/env'

export default class UserPhoto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({
    consume: val => `${env.get('FILE_SERVER_DOMAIN')}/${val}`
  })
  declare photoLocation: string

  @column()
  declare userId: string

}

