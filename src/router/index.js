import Vue from 'vue'
import Router from 'vue-router'
import {Auth} from "../store/user/auth";
import el from "element-ui/src/locale/lang/el";

//重复点击路由时拦截错误信息
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../view/login/index'),
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('../view/register/index'),
    },
    {
      path: '/management',
      name: 'management',
      component: ()=>import('../components/index'),
      children:[
        {
          path:'/',
          name:'academy',
          component: ()=>import('../view/management/academy/index'),
        },
        {
          path:'/management/grade',
          name:'grade',
          component: ()=>import('../view/management/grade/index'),
        },
        {
          path:'/management/class',
          name:'class',
          component: ()=>import('../view/management/class/index'),
        },
        {
          path:'/management/users',
          name:'users',
          component: ()=>import('../view/management/users/index'),
        },
        {
          path:'/management/feedback',
          name:'feedback',
          component: ()=>import('../view/management/feedback/index'),
        },
        {
          path:'/management/personForm',
          name:'personForm',
          component: ()=>import('../view/management/personForm/index'),
        },
        {
          path:'/management/forms',
          name:'forms',
          component: ()=>import('../view/management/forms/index'),
        },
        {
          path:'/management/personForm/addForms',
          name:'addForms',
          component: ()=>import('../view/management/personForm/addForms'),
        },
        {
          path:'/management/personForm/formDetails',
          name:'formDetails',
          component: ()=>import('../view/management/personForm/FormDetails'),
        }
      ]
    }
  ]
});

export default router

router.beforeEach((to,from,next) => {
  if (to.name=="login"||to.name=="register"||Auth.getUserInfo()){
    next();
  }else{
    next({
      path:'/'
    })
  }
  next();
});
