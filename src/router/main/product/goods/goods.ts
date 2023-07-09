const department = () => import('@/views/main/product/goods/goods.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: department,
  children: []
}
