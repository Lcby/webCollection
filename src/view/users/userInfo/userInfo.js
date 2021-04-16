import {server} from "../../../tools/servers";

export class userInfoJs{
  static changeNickname(params){
    return server.connection('POST','/users/changeNickname', params);
  }

  static selectAll(params){
    return server.connection('GET','/user/selectAllUser', params);
  }
}