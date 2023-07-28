import useLoginStore from '@/stores/login/login'

import type { pageName } from '@/service/main/type'

// type tuplePermission = 'create' | 'delete' | 'update' | 'query'

// const permissionsTuple: tuplePermission[] = ['create', 'delete', 'update', 'query']

export default function usePermission(pagename: keyof pageName) {
  const permissions = new Set(useLoginStore().permissions)
  // const resultPermissions = new Set<tuplePermission>()
  // for (const permies of permissionsTuple) {
  //   if (permissions.has(`system:${pagename}:${permies}`)) {
  //     resultPermissions.add(permies)
  //   }
  // }
  const resultPermissions = {
    isCreate: permissions.has(`system:${pagename}:create`),
    isDelete: permissions.has(`system:${pagename}:delete`),
    isUpdate: permissions.has(`system:${pagename}:update`),
    isQuery: permissions.has(`system:${pagename}:query`)
  }
  return resultPermissions
}
