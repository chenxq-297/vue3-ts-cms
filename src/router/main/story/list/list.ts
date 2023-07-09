const department = () => import('@/views/main/story/list/list.vue')
export default {
  path: '/main/story/list',
  name: 'list',
  component: department,
  children: []
}
