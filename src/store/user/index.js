/**
 * user
 */

import {LoginApi} from '../../view/login/LoginApi';
import {Msg} from '../../tools/message';
import {Auth} from './auth';
import {store} from "../index";

const defaultUser = {userName: '', passWord: '',remember: false};

export default {
  state: {
    /** token */
    token: Auth.getToken() || null,
    /** 用户登陆角色信息 */
    userInfo: Auth.getUserInfo() || {},
    /** 用户登陆账户密码 */
    accountPwd: Auth.getAccountPwd() || defaultUser,
    /** 是否登陆 */
    isLogin: Auth.getLogin() || false,
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED(state, data) {
      const res = data.data;
      const param = data.params;
      if(res) {
        state.token = res.data.type;
        state.userInfo = res.data;
        state.isLogin = true;
        Auth.setUserInfo(state.userInfo);
        Auth.setLogin(state.isLogin);
        Auth.setToken(state.token);
      }
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      state.isLogin = false;
      Auth.removeUserInfo();
      Auth.removeLogin();
      Auth.removeToken();
    },
    handleRemember(state, data){
      const userInfo = data.params;
      if (userInfo && userInfo.remember) {
        this.state.accountPwd = userInfo; //记住用户名和密码
        Auth.setAccountPwd(this.state.accountPwd);
      }
      else{
        Auth.removeAccountPwd();
      }
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 登录 */
    accountLoginSubmit({commit}, params) {
      return new Promise((resolve, reject) => {
        LoginApi.loginManagement({account: params.account, password: params.password,type:params.type}).then((res) => {
          if(res.data.data.id!==''&&res.data.data.id!==null&&res.data.data.id!==undefined) {
            commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params});
            var {isLogin,token} = store.getters;
            resolve(res.data)
          }
          else {
            commit('ACCOUNT_LOGOUT_FAILURE');
            resolve(res.data)
          }
        }).catch(err => {
          Msg.error("用户名或密码错误，请重试");
          commit('ACCOUNT_LOGOUT_FAILURE');
        })
      })
    },
    secondLogin({commit}, params) {
      return new Promise((resolve, reject) => {
        LoginApi.loginSecond({loginType: params.loginType}).then((res) => {
          if(res.data.token) {
            commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params});
            commit('handleRemember', {...res, params});
            var {isLogin,token} = store.getters;
            resolve(res.data)
          }
          else {
            commit('ACCOUNT_LOGOUT_FAILURE');
            resolve(res.data)
          }
        }).catch(err => {
          Msg.error(err);
          commit('ACCOUNT_LOGOUT_FAILURE');
        })
      })
    },
    /** 登出 */
    accountLogoutSubmit({commit}) {
      return new Promise((resolve, reject) => {
        // LoginApi.logout().then(res => {
          commit('ACCOUNT_LOGOUT_FAILURE');
          resolve("true");
        // }).catch(err => {
        //   reject(err)
        // })
      })
    }
  }
}
