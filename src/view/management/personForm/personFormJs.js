import {server} from "../../../tools/servers";

export class personFormJs{

  static selectAllPersonForms(params){
    return server.connection('GET','/personForm/selectAllPersonForms', params);
  }

  static addNewForm(params){
    return server.connection('POST','/personForm/addNewForm', params);
  }

  static selectALLClass(params){
    return server.connection('GET','/class/findClass', params);
  }

  static selectFormDetail(params){
    return server.connection('GET','/personForm/selectFormDetails', params);
  }

  static updateStatus(params){
    return server.connection('POST','/personForm/updatePersonFormStatus', params);
  }
}
