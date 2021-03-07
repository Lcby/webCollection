import {server} from "../../../tools/servers";

export class feedbackJs{
  static selectAll(params){
    return server.connection('GET','/feedback/selectAllFeedback', params);
  }

  static replyFeedback(params){
    return server.connection('POST','/feedback/replyFeedback', params);
  }
}
