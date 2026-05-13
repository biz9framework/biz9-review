// -- biz9 --
const {Log,Str,Obj,Status_Type,Response_Logic} = require("biz9-utility");
const {Data_Response_Field} = require("biz9-data-app");
const {Review_Response_Field} = require("./");
const {Remote} = require("biz9-remote");
// -- other --
const {Config} = require("./constant");
const async = require('async');
class Service {
    /* - DEFINE -
     * ping
     * post / (database,review,review,option)
     * parent_search / (database,user,parent,search)
     * delete / (database,parent,review_id)
     * cacul;ate / (database,parent_table,parent_id)
     * -- HELPERZ --
     * Review_Logic.get / (parent,user,title,comment,rating)
     * * -- UrlZ --
     * DELETE
     * GET
     * POST
     * PARENT_SEARCH
     */
      // -- 9_ping
    static ping = (url) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            async.series([
                async function(call){
                    const [biz_response,biz_data] = await Remote.post(url);
                    response = biz_response;
                    call();
                },
                async function(call){
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback(response);
                });
        });
    };
        // - 9_post_review 9_review_post
    static post = (url,review,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    const form_data = {review:review,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call) {
                    // -- response-param --
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Review_Response_Field.PARAM_REVIEW,Status_Type.OK,review,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_OPTION,Status_Type.OK,option,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
    // - 9_parent_search 9_review_parent_search
    static parent_search = (url,user,parent,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    const form_data = {user:user,parent:parent,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call) {
                    // -- respopnse-param --
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Review_Response_Field.PARAM_USER,Status_Type.OK,user,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Review_Response_Field.PARAM_PARENT,Status_Type.OK,parent,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_OPTION,Status_Type.OK,option,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
    // - 9_delete
    static delete = (url,parent,review_id,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    const form_data = {parent:parent,review_id:review_id,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call){
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Review_Response_Field.PARAM_PARENT,Status_Type.OK,parent,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Review_Response_Field.PARAM_REVIEW_ID,Status_Type.OK,review_id,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
    // - 9_blank
    static blank = (url,table,id,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    const form_data = {table:table,id:id,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call){
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_TABLE,Status_Type.OK,table,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_ID,Status_Type.OK,id,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
}
module.exports = {Service};
