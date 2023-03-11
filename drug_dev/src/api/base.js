//接口地址
const base = {
  login: '/api/users/login',
  totalInfo: '/api/admin/totalInfo',
  selectGoodsAdmin: '/api/admin/selectGoods',
  selectUserAdmin: '/api/admin/selectUser',
  deleteGoodsAdmin: '/api/admin/deleteGoodsById',
  deleteUserAdmin: '/api/admin/deleteUserById',
  updateGoodsAdmin: '/api/admin/updateGoodsById',
  updateUserInfoAdmin: '/api/admin/updateUserInfoById',
  updateUserAdmin: '/api/admin/updateUserById',
  addGoodsAdmin: '/api/admin/addGoods',
  addUserAdmin: '/api/admin/addUser',
  addUserInfoAdmin: '/api/admin/addUserInfo',

  addGoodsImg: "/api/upload",
}
//单一导出
export const addGoodsImgUrl = "/api/upload";
export const host = "http://localhost";
export default base