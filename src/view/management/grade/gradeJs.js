import {server} from "../../../tools/servers";

export class gradeJs{
  static selectAllGrade(params){
    return server.connection('GET','/grade/selectAllGrade', params);
  }

  static addNewGrade(params){
    return server.connection('POST','/grade/addNewGrade', params);
  }

  static updateGrade(params){
    return server.connection('POST','/grade/updateGrade', params);
  }

  static deleteGrade(params){
    return server.connection('GET','/grade/deleteGrade', params);
  }
}
