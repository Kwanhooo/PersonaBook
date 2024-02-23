import adminRoutes from './admin'
import userRoutes from './user'
import commonRoutes from './common'
import exceptionRoutes from '@/router/routes/exception'

export default [
  ...commonRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...exceptionRoutes
]
