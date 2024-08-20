/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { sep, normalize, join } from 'node:path'
import env from './env.js'
import UsersController from '#controllers/users_controller'
const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/
router.get('/', async () => {
  return {
    hello: 'world',
  }
})



router.post('/users/create', [UsersController, 'createUser'])
router.get('/users', [UsersController, 'getUsers'])
router.get('/users/:userId', [UsersController, 'getUser'])




router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)
  
  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = join(env.get("FILES_DIR"), normalizedPath)
  return response.attachment(absolutePath)
})
