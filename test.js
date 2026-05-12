/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Data - Test
*/
// -- biz9
const {Data_Url,Data_Logic,Data_Response_Field} = require("/home/think1/www/doqbox/biz9-framework/biz9-data-app/source");
const {Log,Num,Str,Obj,Status_Type,Response_Field,Response_Logic} = require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
const {Config,Data_Config,Project_Url,Project_Table} = require("./constant");
const {Remote} = require("/home/think1/www/doqbox/biz9-framework/biz9-remote/source");
const {Review_Url,Review_Logic,Review_Service} = require("./");
// -- other
const async = require('async');
/*
 * - DEFINE -
 * delete
 * post
 * parent_search
*/
// -- GLOBALZ
let USER = Data_Logic.get(Project_Table.USER,'69f420b6dac3a81879848037');
let PARENT = Data_Logic.get(Project_Table.PRODUCT,'69fb40ebeb547dbd2b56a6fb');
//let REVIEW = Data_Logic.get(Review_Table.REVIEW,'0');
let REVIEW = Review_Logic.get_test(PARENT,USER);
//REVIEW.id = '69f8cd9ea0ab061e6eb6e925';
REVIEW.id = '69fd18e29677bee3f922f0cd';

//9_ping - 9_test_ping
describe('ping', function(){ this.timeout(25000);
    it("_ping", function(done){
        console.log('PING-START');
        async.series([
            async function(call){
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.PING);
                const [biz_response,biz_data] = await Review_Service.ping(url);
                Log.w('99_biz_response',biz_response);
                Log.w('99_biz_data',biz_data);
            },
            async function(call){
                console.log('PING-SUCCESS');
            },
        ],
            function(error, result){
                console.log('PING-DONE');
                done();
            });
    });
});
//9_post - 9_test_post
describe('post', function(){ this.timeout(25000);
    it("_post", function(done){
        console.log('POST-START');
        async.series([
            async function(call){
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.POST);
                const [biz_response,biz_data] = await Review_Service.post(url,REVIEW);
                Log.w('99_biz_response',biz_response);
                Log.w('99_biz_data',biz_data);
            },
            async function(call){
                console.log('POST-SUCCESS');
            },
        ],
            function(error, result){
                console.log('POST-DONE');
                done();
            });
    });
});
//9_delete - 9_test_delete
describe('delete', function(){ this.timeout(25000);
    it("_delete", function(done){
        console.log('DELETE-START');
        async.series([
            async function(call){
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.DELETE);
                const [biz_response,biz_data] = await Review_Service.delete(url,PARENT,REVIEW.id);
                Log.w('99_biz_response',biz_response);
                Log.w('99_biz_data',biz_data);
            },
            async function(call){
                console.log('DELETE-SUCCESS');
            },
        ],
            function(error, result){
                console.log('DELETE-DONE');
                done();
            });
    });
});
//9_parent_search - 9_test_parent_search
describe('parent_search', function(){ this.timeout(25000);
    it("_parent_search", function(done){
        console.log('PARENT-SEARCH-START');
        async.series([
            async function(call){
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Review_Url.PARENT_SEARCH);
                const search = Data_Logic.get_search(PARENT.table,{},{},1,0);
                const [biz_response,biz_data] = await Review_Service.parent_search(url,USER,PARENT,search);
                Log.w('99_biz_response',biz_response);
                Log.w('99_biz_data',biz_data);
            },
            async function(call){
                console.log('DELETE-SUCCESS');
            },
        ],
            function(error, result){
                console.log('DELETE-DONE');
                done();
            });
    });
});
//9_connect - 9_test_connect
describe('connect', function(){ this.timeout(25000);
    it("_connect", function(done){
        console.log('CONNECT-START');
        let response={};
        let database = {};
        let data = {};
        let option = {};
        async.series([
            async function(call){
                // -- POST-START --
                //post_data = Store_Logic.get_test_parent({title:'Product '+Str.get_id()});
                post_data.cool = 'bean_' + Num.get_id();
                const [biz_response,biz_data] = await Data.post(database,post_data.table,post_data,option);
                Log.w('biz_response',biz_response);
                Log.w('biz_data',biz_data);
                // -- POST-END --
            },
            async function(call){
                console.log('CONNECT-SUCCESS');
            },
        ],
            function(error, result){
                console.log('CONNECT-DONE');
                done();
            });
    });
});
