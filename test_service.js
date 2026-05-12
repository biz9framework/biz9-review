/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Data - Test
*/
// -- biz9 --
const {Log,Str,Obj,Response_Logic,Response_Field,Status_Type,Num}=require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
const {Data_Logic,Data_Url,Data_Field,Data_Response_Field}=require("/home/think1/www/doqbox/biz9-framework/biz9-data-app/source");
const {Config,Data_Config,Table}=require('./constant');
const {Service}=require('./service');
const {Review_Logic,Review_Table,Review_Field,Review_Response_Field,Review_Url}=require('./');
const {Remote} = require("/home/think1/www/doqbox/biz9-framework/biz9-remote/source");

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
describe.skip('ping', function() {
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
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.PING);
                const [biz_response,biz_data] = await Service.post(url);
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
                Log.w('BIZ-RESPONSE-USER',response);
                Log.w('BIZ-DATA-USER_22',USER);
            },
            async function(call){
                // -- post-parent --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.POST);
                const form_data = {table:test_parent.table,data:PARENT};
                const [biz_response,biz_data] = await Remote.post(url,form_data);
                PARENT = biz_data;
                Log.w('BIZ-RESPONSE-POST-PARENT',response);
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
                Log.w('sssss',REVIEW);
                [biz_response,biz_data] = await Service.post(url,REVIEW);
                //response = biz_response;
                //REVIEW = biz_data;
                Log.w('BIZ-RESPONSE-POST',response);
                Log.w('BIZ-DATA-POST',biz_data);
            },
            /*
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
            */
        ],
            function(error, result){
                //done();
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
                console.log('aaaaaaaaaa');
                console.log('aaaaaaaaaa');
                console.log('aaaaaaaaaa');
                Log.w('url',url);
                Log.w('11_USER',USER);
                Log.w('33_parent',PARENT);
                //const [biz_response,biz_data] = await Service.parent_search(url,USER,PARENT,option);
                //response = biz_response;
                //data = biz_data;
                //Log.w('PARENT-SEARCH-RESPONSE',response);
                //Log.w('PARENT-SEARCH-DATA',data);
            },
            /*
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.parent.id) === false);
                assert(data.items.length > 0);
                assert(response.message === Review_Logic.get_message_by_response_field(Review_Response_Field.PARENT_SEARCH_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
            */
        ],
            function(error, result){
                //done();
            });
    });
    after(function() {
        /*
        // -- response --
        console.log('BLANK-DONE');
        Log.w('PARENT-RESPONSE-STATUS',response.status);
        Log.w('PARENT-RESPONSE-MESSAGE',response.message);
        Log.w('PARENT-DATA',data);
        */
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
                // -- get-database --
                const [biz_response,biz_data] = await Database.get(Data_Config);
                database = biz_data;
            },
            async function(call){
                // -- get-reviews --
                const [biz_response,biz_data] = await Review_Data.delete(database,PARENT,REVIEW.id);
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
        console.log('BLANK-DONE');
        Log.w('DELETk-RESPONSE-STATUS',response.status);
        Log.w('DELETE-RESPONSE-MESSAGE',response.message);
        Log.w('DELETE-DATA',data);
    });
});



/*
//9_get - 9_test_get
describe('get', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('GET-START');
    });
    it("get", function(done){
        async.series([
            async function(call){
                // -- get-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.GET);
                [biz_response,biz_data] = await Service.get(url,PARENT.table,PARENT.id,option);
                data = biz_data;
                response = biz_response;
                Log.w('BIZ-RESPONSE-GET',biz_response);
                Log.w('BIZ-DATA-GET',biz_data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(PARENT[Data_Field.ID]) === false);
                assert(data.title === PARENT.title);
                assert(data.age === PARENT.age);
                assert(data.location === PARENT.location);
                assert(response.message === Data_Logic.get_message_by_response_field(Response_Field.GET_CONFIRM));
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
        console.log('GET-DONE');
        Log.w('GET-RESPONSE-STATUS',response.status);
        Log.w('GET-RESPONSE-MESSAGE',response.message);
    });
});
//9_copy - 9_test_copy
describe('copy', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
      before(function() {
        console.log('COPY-START');
    });
    it("copy", function(done){
        async.series([
            async function(call){
                // -- copy-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.COPY);
                const [biz_response,biz_data] = await Service.copy(url,PARENT.table,PARENT.id,option);
                response = biz_response;
                data = biz_data;

                Log.w('BIZ-RESPONSE-COPY',biz_response);
                Log.w('BIZ-DATA-COPY',biz_data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data[Data_Field.ID]) === false);
                assert(data.title === Str.get_title(Data_Field.COPY)+" "+PARENT.title);
                assert(data.age === PARENT.age);
                assert(data.location === PARENT.location);
                assert(response.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEM_COPY_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
        after(function() {
            // -- response --
            console.log('COPY-DONE');
            Log.w('COPY-RESPONSE-STATUS',response.status);
            Log.w('COPY-RESPONSE-MESSAGE',response.message);
        });
    });
});
describe('delete', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('DELETE-START');
    });
    //9_delete - 9_test_delete
    it("delete", function(done){
        async.series([
            async function(call){
                // -- delete-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.DELETE);
                const [biz_response,biz_data] = await Service.delete(url,PARENT.table,PARENT.id);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE-DELETE',biz_response);
                Log.w('BIZ-DATA-DELETE',biz_data);
            },
            async function(call){
                // -- get-delete-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.GET);
                const [biz_response,biz_data] = await Service.get(url,PARENT.table,PARENT.id,option);
                response_get = biz_response;
                data_get = biz_data;
                Log.w('BIZ-RESPONSE-GET-DELETE',biz_response);
                Log.w('BIZ-DATA-GET-DELETE',biz_data);
            },
            function(call){
                // -- assert --
                // -- delete-cache-parent-id
                assert(Str.check_is_null(PARENT[Data_Field.ID]) === false);
                // -- delete-data --
                assert(response.message === Data_Logic.get_message_by_response_field(Response_Field.DELETE_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                assert(Str.check_is_null(data[Data_Field.ID]) === false);
                // -- get-delete-data --
                assert(response_get.message === Data_Logic.get_message_by_response_field(Response_Field.GET_FAIL));
                assert(response_get.status === Status_Type.FAIL);
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
        Log.w('DELETE-RESPONSE-STATUS',response.status);
        Log.w('DELETE-RESPONSE-MESSAGE',response.message);
        Log.w('DELETE-DATA',data);
    });
});
describe('post_items', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('POST-ITEMS-START');
        for(let a = 0;a<PARENTS_COUNT;a++){
            PARENTS.push(Data_Logic.get(Table.BlANK,'0',{data:{title:'Title '+Str.get_id(),age:'Age '+Str.get_id(),age:'Location '+Str.get_id()}}))
        }
    });
    //9_post_items - 9_test_post_items
    it("post_items", function(done){
        async.series([
            async function(call){
                // -- post-items-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.POST_ITEMS);
                const [biz_response,biz_data] = await Service.post_items(url,PARENTS);
                response = biz_response;
                PARENTS = biz_data;
                Log.w('BIZ-RESPONSE',biz_response);
                Log.w('BIZ-DATA',biz_data);

            },
            function(call){
                // -- assert --
                // -- post-items-data
                assert(PARENTS.length === PARENTS_COUNT);
                assert(response.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEMS_POST_CONFIRM));
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
        Log.w('POST-ITEMS-RESPONSE-STATUS',response.status);
        Log.w('POST-ITEMS-RESPONSE-MESSAGE',response.message);
        Log.w('POST-ITEMS-DATA',PARENTS);
    });
});
//9_search - 9_test_search
describe('search', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        // -- get-search-query --
        console.log('SEARCH-START');
        for(const parent of PARENTS){
            let query_field = {};
            query_field[Data_Field.ID] = parent.id;
            PARENTS_QUERY.$or.push(query_field);
        }
    });
    it("search", function(done){
        async.series([
            async function(call){
                // -- search --
                let search = Data_Logic.get_search(PARENT.table,PARENTS_QUERY);
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.SEARCH);
                const [biz_response,biz_data] = await Service.search(url,search);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE',biz_response);
                Log.w('BIZ=DATA',biz_data);
            },
            function(call){
                // -- assert --
                // -- post-items-data
                assert(data.items.length === PARENTS_COUNT);
                assert(data.items.length === PARENTS.length);
                assert(response.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEMS_SEARCH_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
        after(function() {
            // -- response --
            console.log('POST-DONE');
            Log.w('SEARCH-RESPONSE-STATUS',response.status);
            Log.w('SEARCH-RESPONSE-MESSAGE',response.message);
            Log.w('SEARCH-DATA',data);
        });
    });
});
//9_count - 9_test_count
describe('count', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
  before(function() {
        // -- get-search-query --
        console.log('COUNT-START');
    });
    it("count", function(done){
        async.series([
            async function(call){
                // -- get-database --
                const [biz_response,biz_data] = await Database.get(Data_Config);
                database = biz_data;
            },
            async function(call){
                // -- count-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.COUNT);
                let search = Data_Logic.get_search(PARENT.table,PARENTS_QUERY);
                const [biz_response,biz_data] = await Service.count(url,search);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE-COUNT',biz_response);
                Log.w('BIZ=DATA-COUNT',biz_data);
            },
            function(call){
                // -- assert --
                // -- count-data
                assert(data === PARENTS_COUNT);
                assert(data === PARENTS.length);
                assert(response.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEMS_COUNT_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
        after(function() {
            // -- response --
            console.log('COUNT-DONE');
            Log.w('COUNT-RESPONSE-STATUS',response.status);
            Log.w('COUNT-RESPONSE-MESSAGE',response.message);
            Log.w('COUNT-DATA',data);
        });
    });
});
//9_delete_search - 9_test_delete_search
describe('delete_search', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
    let response_get_search = Response_Logic.get();
    let data_get_search = {};
    before(function() {
        // -- get-search-query --
        console.log('DELETE-SEARCH-START');
    });
    it("delete_search", function(done){
        async.series([
            async function(call){
                // -- delete --
                let search = Data_Logic.get_search(PARENT.table,PARENTS_QUERY);
                Log.w('cool_apple',PARENT);
                Log.w('cool_bean',search);
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.DELETE_SEARCH);
                const [biz_response,biz_data] = await Service.delete_search(url,search);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE-DELETE-SEARCH',biz_response);
                Log.w('BIZ-DATA-DELETE-SEARCH',biz_data);
            },
            async function(call){
                // -- get-delete-search --
                let search = Data_Logic.get_search(PARENT.table,PARENTS_QUERY);
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.DELETE_SEARCH);
                const [biz_response,biz_data] = await Data.search(url,search);
                response_get_search = biz_response;
                data_get_search = biz_data;
                Log.w('BIZ-RESPONSE-DELETE-SEARCH-GET-SEARCH',biz_response);
                Log.w('BIZ-DATA-DELETE-SEARCH-GET-SEARCH',biz_data);
            },
            function(call){
                // -- assert --
                // -- delete-search
                assert(response.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEMS_DELETE_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                // -- delete-search
                assert(response_get_search.message === Data_Logic.get_message_by_response_field(Data_Response_Field.ITEMS_SEARCH_CONFIRM));
                assert(response_get_search.status === Status_Type.SUCCESS);
                assert(data_get_search.items.length === 0);
                call();
            },
        ],
            function(error, result){
                done();
            });
        after(function() {
            // -- response --
            console.log('COUNT-DONE');
            Log.w('DELETE-SEARCH-RESPONSE-STATUS',response.status);
            Log.w('DELETE-SEARCH-RESPONSE-MESSAGE',response.message);
            Log.w('DELETE-SEARCH-DATA',data);
        });
    });
});
*/
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

