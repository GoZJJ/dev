//接口地址
const base = {
  login: '/api/users/login',
  totalInfo: '/api/admin/totalInfo',
  //商品接口
  selectGoodsAdmin: '/api/admin/selectGoods',
  deleteGoodsAdmin: '/api/admin/deleteGoodsById',
  updateGoodsAdmin: '/api/admin/updateGoodsById',
  addGoodsAdmin: '/api/admin/addGoods',
  //用户接口
  selectUserAdmin: '/api/admin/selectUser',
  deleteUserAdmin: '/api/admin/deleteUserById',
  updateUserAdmin: '/api/admin/updateUserById',
  addUserAdmin: '/api/admin/addUser',
  //用户详细信息
  addUserInfoAdmin: '/api/admin/addUserInfo',
  updateUserInfoAdmin: '/api/admin/updateUserInfoById',

  //商品分类
  selectGoodsCategoryAdmin: '/api/admin/selectGoodsCategory',
  updateGoodsCategoryAdmin: '/api/admin/updateGoodsCategory',
  addGoodsCategoryAdmin: '/api/admin/addGoodsCategory',
  deleteGoodsCategoryAdmin: '/api/admin/deleteGoodsCategory',
  addGoodsCategoryOneLevel: "/api/admin/addGoodsCategoryOneLevel",

  //地区管理
  selectAddressAdmin: '/api/admin/selectAddress',
  updateAddressAdmin: '/api/admin/updateAddress',
  addAddressAdmin: '/api/admin/addAddress',
  deleteAddressAdmin: '/api/admin/deleteAddress',
  addAddressOneLevel: "/api/admin/addAddressOneLevel",


  userIsOnline: "/api/users",
  addGoodsImg: "/api/upload",
}
//单一导出
export const addGoodsImgUrl = "/api/upload";
export const host = "http://localhost";
export default base