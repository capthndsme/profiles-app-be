import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_photos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('user_id').references('id').inTable('users')
      table.index('user_id')

      table.string('photo_location')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}