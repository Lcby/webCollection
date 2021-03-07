import {server} from "../../tools/servers";

export class registerJs{
  static findSelectAcademy(params){
    return server.connection('GET','/academy/findAcademySelect', params);
  }

  static findGradeSelect(params){
    return server.connection('GET','/grade/findGradeSelect', params);
  }

  static findClassSelect(params){
    return server.connection('GET','/class/findClass', params);
  }

  static addNewUser(params){
    return server.connection('POST','/user/register', params);
  }

  static loginManagement(params){
    return server.connection('GET','/login/loginManagement', params);
  }
}
