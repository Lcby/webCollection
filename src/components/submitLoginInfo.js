import {server} from "../tools/servers";

export class submitLoginInfo{
  static changePasswords(params){
    return server.connection('POST','/user/changePassword', params);
  }
}
