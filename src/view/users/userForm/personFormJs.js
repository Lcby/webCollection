import {server} from "../../../tools/servers";

export class personFormJs{

  static selectAllPersonForms(params){
    return server.connection('GET','/usersForm/selectAllUserForms', params);
  }

  static addNewFeedback(params){
    return server.connection('POST','/userAnswers/addNewAnswers', params);
  }

  static selectALLClass(params){
    return server.connection('GET','/class/findClass', params);
  }

  static selectFormDetail(params){
    return server.connection('GET','/usersForm/selectFormDetails', params);
  }

  static updateStatus(params){
    return server.connection('POST','/personForm/updatePersonFormStatus', params);
  }
      //表单答案
      static selectFormAnswer(params){
        return server.connection('GET','/usersForm/selectFormAnswer', params);
      }
}
