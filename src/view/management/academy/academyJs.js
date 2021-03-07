import {server} from "../../../tools/servers";

export class academyJs{
  static selectAll(params){
    return server.connection('GET','/academy/selectAllAcademy', params);
  }

  static addNewAcademy(params){
    return server.connection('POST','/academy/addNewAcademy', params);
  }

  static updateAcademy(params){
    return server.connection('POST','/academy/updateAcademy', params);
  }

  static deleteAcademy(params){
    return server.connection('GET','/academy/deleteAcademy', params);
  }
}
