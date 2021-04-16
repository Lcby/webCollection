import {server} from "../../../tools/servers";

export class feedbackJS{
  static addNewFeedback(params){
    return server.connection('POST','/userFeedback/addNewFeedback', params);
  }

  static selectAll(params){
    return server.connection('GET','/user/selectAllUser', params);
  }
}