import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary();

      table.timestamp('created_at')
      table.timestamp('updated_at')


      /**
       * User informatioin
       */
      table.string('first_name', 128)
      table.string('last_name', 128)
      table.string('middle_name', 128).nullable()
      table.string('email', 128)
      table.string('phone_number', 128)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}