export enum Role {
  'customer' = '客户',
  'operator' = '工作人员',
  'admin' = '管理员',
}
export const roleMap = new Map<string, string>([
  ['customer', '客户'],
  ['operator', '工作人员'],
  ['admin', '管理员'],
])
