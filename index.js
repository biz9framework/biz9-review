/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Review
*/
const {Log,Num,Response_Field}=require("biz9-utility");
const {Data_Logic} = require("biz9-data-logic");
const {Config,Data_Config,Project_Url} = require("./constant");
const {Service} = require("./service");

class Review_Service {
    static ping = async (url)  => {
        const [biz_response,biz_data] = await Service.ping(url);
        return [biz_response,biz_data];
    }
    static post = async (url,review,option) => {
        const [biz_response,biz_data] = await Service.post(url,review,option);
        return [biz_response,biz_data];
    }
    static parent_search = async (url,user,parent,search,option) => {
        const [biz_response,biz_data] = await Service.parent_search(url,user,parent,search,option);
        return [biz_response,biz_data];
    }
    static delete = async (url,parent,review_id,option) => {
        const [biz_response,biz_data] = await Service.delete(url,parent,review_id,option);
        return [biz_response,biz_data];
    }
}
class Review_Title {
    static REVIEW = 'Review';
}
class Review_Stat {
    static POST_REVIEW="post_review";
}
class Review_Url {
    static PING = 'biz9/review/ping';
    static DELETE = 'biz9/review/delete';
    static GET = 'biz9/review/get';
    static POST = 'biz9/review/post';
    static PARENT_SEARCH = 'biz9/review/parent_search';
}
class Review_Response_Field {
    static DELETE_FAIL = 'delete_fail';
    static PARENT_SEARCH_CONFIRM = 'parent_search_confirm';
    static PARENT_SEARCH_FAIL = 'parent_search_fail';

    static PARAM_REVIEW = 'param_review';
    static PARAM_REVIEW_ID = 'param_review_id';
    static PARAM_USER_TABLE = 'param_user_table';
    static PARAM_PARENT_TABLE = 'param_parent_table';
    static PARAM_PARENT_ID = 'param_parent_id';
    static PARAM_USER = 'param_user';
    static PARAM_PARENT = 'param_parent';
    static PARAM_SEARCH = 'param_search';

    static RESPONSE_REVIEW = 'response_review';
    static RESPONSE_PARENT = 'response_parent';
    static RESPONSE_PARENT_SEARCH = 'response_parent_search';
    static RESPONSE_PARENT_SEARCH_ITEM_COUNT = 'response_parent_search_item_count';
    static RESPONSE_REVIEW_DELETE = 'response_review_delete';
    static RESPONSE_CACULATE = 'response_caculate';
}
class Review_Message {
    static ADD_SUCCESS="Review Add Success.";
    static REMOVE_SUCCESS="Review Remove Success.";
    static USER_LOGIN="Please Login To Add Review.";
}
class Review_Table {
    static REVIEW = 'review_biz';
    static USER = 'user_biz';
    static BLANK = 'blank_biz';
}
class Review_Field {
    static TITLE = 'title';
    static LOCATION = 'location';
    static COMMENT = 'comment';
    static RATING = 'rating';
    static USER_ID = 'user_id';
    static PARENT_TABLE = 'parent_table';
    static PARENT_ID = 'parent_id';
    // -- review-parent --
    static REVIEW_RATING_COUNT = 'review_rating_count';
    static REVIEW_COUNT = 'review_count';
    static REVIEW_RATING_AVG = 'review_rating_avg';
}
class Review_Logic {
    static get = (parent,user,title,comment,rating)=>{
        if(!title){
            title = 'Review Title '+Num.get_id();
        }
        if(!comment){
            comment = 'Review Comment '+Num.get_id();
        }
        if(!rating){
            rating = Num.get_id(5);
        }
        return Data_Logic.get(Review_Table.REVIEW,0,{data:{
            parent_table:parent.table,
            parent_id:parent.id,
            user_id:user.id,
            user_table:user.table,
            title:title ? title : "",
            comment:comment ? comment : "",
            rating:rating ? rating : 5
        }});
    }
    static get_test_comment = () => {
        return "Review "+String(Num.get_id()) + " Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    }
    static get_user_search_filter = (parent_table,user_id) =>{
        return {
            $and: [
                { parent_table: { $regex:String(parent_table), $options: "i" } },
                { user_id: { $regex:String(user_id), $options: "i" } }
            ] };
    }
    static get_search_filter = (parent_table,parent_id) =>{
        return {
            $and: [
                { parent_table: { $regex:String(parent_table), $options: "i" } },
                { parent_id: { $regex:String(parent_id), $options: "i" } },
            ] };
    }
    static get_test = (parent,user) =>{
        let data = Data_Logic.get(Review_Table.REVIEW,0);
        if(parent){
            data.parent_table = parent.table;
            data.parent_id = parent.id;
        }else{
            data.parent_table = Review_Table.BLANK;
            data.parent_id = 1;
        }
         if(user){
            data.user_table = user.table;
            data.user_id = user.id;
        }else{
            data.user_table = Review_Table.USER;
            data.user_id = 2;
        }
        data.title = 'Review Title '+Num.get_id();
        data.rating = Num.get_id(6);
        data.comment = "My comment "+ Review_Logic.get_test_comment();
        return data;
    };
    static get_message_by_response_field = (response) =>{
        switch(response){
            case Response_Field.POST_CONFIRM:
                return "Review added successfully.";
                break;
            case Response_Field.POST_FAIL:
                return "Review not added.";
                break;
            case Response_Field.GET_CONFIRM:
                return "Review confirm.";
                break;
            case Response_Field.GET_FAIL:
                return "Review fail.";
                break;
            case Response_Field.DELETE_CONFIRM:
                return "Review delete successful.";
                break;
            case Response_Field.DELETE_FAIL:
                return "Review delete fail.";
                break;
            case Review_Response_Field.PARENT_SEARCH_CONFIRM:
                return "Review parent search successful.";
                break;
            case Review_Response_Field.PARENT_SEARCH_FAIL:
                return "Review parent search fail.";
                break;
            default:
                if(response){
                    return response;
                }else{
                    return "Error Message Not Availble";
                }
        }
    }
}
module.exports = {
    Review_Field,
    Review_Logic,
    Review_Message,
    Review_Table,
    Review_Title,
    Review_Url,
    Review_Stat,
    Review_Response_Field,
    Review_Service
};
