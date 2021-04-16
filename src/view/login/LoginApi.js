import {server} from "../../tools/servers";

export class LoginApi{

  static loginManagement(params){
    return server.connection('GET','/login/loginManagement', params);
  }

  static loginUser(params){
    return server.connection('GET','/login/loginManagement', params);
  }

}
