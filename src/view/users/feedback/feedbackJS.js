import {server} from "../../../tools/servers";

export class feedbackJS{
  static addNewFeedback(params){
    return server.connection('POST','/userFeedback/addNewFeedback', params);
  }

  static selectAll(params){
    return server.connection('GET','/user/selectAllUser', params);
  }

  static selectAlls(params){
    return server.connection('GET','/userFeedback/selectAllFeedback', params);
  }

  static deleteFeedbakc(params){
    return server.connection('GET','/feedback/deleteFeedback', params);
  }
}