import {server} from "../../../tools/servers";

export class usersJs{
  static findSelectAcademy(params){
    return server.connection('GET','/academy/findAcademySelect', params);
  }

  static selectAll(params){
    return server.connection('GET','/user/selectAllUser', params);
  }
}
