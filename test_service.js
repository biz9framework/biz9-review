/*
Copyright 2016 Certified CoderZ
2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Data - Test
*/
// -- biz9 --
const {Log,Str,Response_Logic,Response_Field,Status_Type}=require("biz9-utility");
const {Data_Logic,Data_Url}=require("biz9-data-app");
const {Review_Logic,Review_Field,Review_Response_Field,Review_Url,Review_Service}=require('./');
const {Remote} = require("biz9-remote");
const {Config,Data_Config}=require('./constant');
// -- other --
const async = require('async');
var assert = require('better-assert');

/* -- DEFINE --
 * 1. ping
 * 2. post
 * 3. parent_search
 * 4. delete
*/

// -- GLOBALZ --
let USER = Review_Logic.get_test_user();
let PARENT = Review_Logic.get_test_parent();
let REVIEW = {};

//9_ping - 9_test_ping
describe('ping', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('PING-START');
    });
    it("ping", function(done){
        async.series([
            async function(call){
                // -- post-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.PING);
                const [biz_response,biz_data] = await Review_Service.ping(url);
                response = biz_response;
                Log.w('BIZ-RESPONSE-PING',response);
                Log.w('BIZ-DATA-PING',biz_data);
            },
            function(call){
                // -- assert --
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('PING-DONE');
        Log.w('PING-RESPONSE-STATUS',response.status);
        Log.w('PING-RESPONSE-MESSAGE',response.message);
    });
});
//9_post - 9_test_post
describe('post', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
  before(function(done) {
        console.log('POST-START');
        async.series([
            async function(call){
                // -- post-user --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.POST);
                const form_data = {table:USER.table,data:USER};
                const [biz_response,biz_data] = await Remote.post(url,form_data);
                response = biz_response;
                USER = biz_data;
                //Log.w('BIZ-RESPONSE-USER',response);
                Log.w('BIZ-DATA-USER',USER);
            },
            async function(call){
                // -- post-parent --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.POST);
                const form_data = {table:PARENT.table,data:PARENT};
                const [biz_response,biz_data] = await Remote.post(url,form_data);
                PARENT = biz_data;
                //Log.w('BIZ-RESPONSE-POST-PARENT',response);
                Log.w('BIZ-DATA-POST-PARENT',PARENT);
            },
        ],
            function(error, result){
                done();
            });
    });
    it("post", function(done){
        async.series([
            async function(call){
                // -- post-review --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.POST);
                REVIEW = Review_Logic.get_test(PARENT,USER);
                const [biz_response,biz_data] = await Review_Service.post(url,REVIEW);
                response = biz_response;
                REVIEW = biz_data;
                //Log.w('BIZ-RESPONSE-POST',response);
                Log.w('BIZ-DATA-POST',biz_data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(REVIEW.id) === false);
                assert(Str.check_is_null(Review_Field.REVIEW_RATING_COUNT) === false);
                assert(Str.check_is_null(Review_Field.REVIEW_COUNT) === false);
                assert(Str.check_is_null(Review_Field.RATING) === false);
                // -- review --
                assert(Str.check_is_null(REVIEW.parent.id) === false);
                assert(Review_Field.RATING in REVIEW === true);
                // -- review-parent --
                assert(Review_Field.REVIEW_RATING_COUNT in REVIEW.parent === true);
                assert(Review_Field.REVIEW_COUNT in REVIEW.parent === true);
                assert(Review_Field.REVIEW_RATING_AVG in REVIEW.parent === true);
                assert(response.message === Review_Logic.get_message_by_response_field(Response_Field.POST_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('POST-DONE');
        Log.w('POST-RESPONSE-STATUS',response.status);
        Log.w('POST-RESPONSE-MESSAGE',response.message);
    });
});
//9_parent_search - 9_test_parent_search
describe.skip('parent_search', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('PARENT-SEARCH-START');
    });
    it("parent_search", function(done){
        async.series([
            async function(call){
                // -- get-reviews --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.PARENT_SEARCH);
                const [biz_response,biz_data] = await Review_Service.parent_search(url,USER,PARENT,option);
                response = biz_response;
                data = biz_data;
                Log.w('PARENT-SEARCH-RESPONSE',response);
                Log.w('PARENT-SEARCH-DATA',data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.parent.id) === false);
                assert(data.items.length > 0);
                assert(response.message === Review_Logic.get_message_by_response_field(Review_Response_Field.PARENT_SEARCH_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('PARENT-RESPONSE-DONE');
        Log.w('PARENT-RESPONSE-STATUS',response.status);
        Log.w('PARENT-RESPONSE-MESSAGE',response.message);
        Log.w('PARENT-DATA',data);
    });
});
//9_delete - 9_test_review_delete
describe.skip('delete', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('DELETE-START');
    });
    it("delete", function(done){
        async.series([
            async function(call){
                // -- get-reviews --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.DELETE);
                const [biz_response,biz_data] = await Review_Service.delete(url,PARENT,REVIEW.id);
                response = biz_response;
                data = biz_data;
                Log.w('DELETE-RESPONSE',response);
                Log.w('DELETE-DATA',data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.id) === true);
                assert(response.message === Review_Logic.get_message_by_response_field(Response_Field.DELETE_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('DELETE-DONE');
        Log.w('DELETk-RESPONSE-STATUS',response.status);
        Log.w('DELETE-RESPONSE-MESSAGE',response.message);
        Log.w('DELETE-DATA',data);
    });
});

/*
//9_blank - 9_test_blank
describe('blank', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('BLANK-START');
    });
    it("blank", function(done){
        async.series([
            async function(call){
                // -- get-database --
                const [biz_response,biz_data] = await Database.get(Data_Config);
                database = biz_data;
            },
            async function(call){
                // -- blank-data --
                const [biz_response,biz_data] = await Data.post(database,PARENT.table,PARENT,option);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE',response);
                Log.w('BIZ-DATA',data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.id) === false);
                assert(response.message === Data_Logic.get_message_by_response_field(Response_Field.POST_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('BLANK-DONE');
        Log.w('BLANK-RESPONSE-STATUS',response.status);
        Log.w('BLANK-RESPONSE-MESSAGE',response.message);
        Log.w('BLANK-DATA',data);
    });
});
*/

