/**
 * 用户角色
 */
export class UserRole {
  // 用户 user
  public static readonly USER = 'user'
  // 管理员 admin
  public static readonly ADMIN = 'admin'
  // 任何人 any
  public static readonly GUEST = 'guest'
}

/**
 * 用户登录参数
 */
export class UserValid {
  // 合法 1
  public static readonly VALID = 1
  // 非法 0
  public static readonly INVALID = 0
}
