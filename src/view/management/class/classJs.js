import {server} from "../../../tools/servers";

export class classJs{
  static findSelectAcademy(params){
    return server.connection('GET','/academy/findAcademySelect', params);
  }

  static findGradeSelect(params){
    return server.connection('GET','/grade/findGradeSelect', params);
  }

  static selectAll(params){
    return server.connection('GET','/class/selectAllClass', params);
  }

  static addNewClass(params){
    return server.connection('POST','/class/addNewClass', params);
  }

  static updateClass(params){
    return server.connection('POST','/class/updateClass', params);
  }

  static deleteClass(params){
    return server.connection('GET','/class/deleteClass', params);
  }
}
