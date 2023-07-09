export function mapPathToBreadcrumbs(menus: any, path: any) {
  const breadcrumbs = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
