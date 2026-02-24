/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Review
*/
const {Scriptz}=require("biz9-scriptz");
const {Log,Num}=require("biz9-utility");
const {Data_Logic} = require("/home/think1/www/doqbox/biz9-framework/biz9-data-logic/source");
class Review_Url {
    static DELETE = 'biz9/review/delete';
    static GET = 'biz9/review/get';
    static POST = 'biz9/review/post';
    static SEARCH = 'biz9/review/search';
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
}
class Review_Logic {
    static get = (parent_table,parent_id,user_id,title,comment,rating) =>{
        return Data_Logic.get(Review_Table.REVIEW,0,{data:{
            parent_table:parent_table,
            parent_id:parent_id,
            user_id:user_id,
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
    static get_test = () =>{
        let data = Data_Logic.get(Review_Table.REVIEW,0);
        data.parent_table = Review_Table.BLANK;
        data.user_id = 1;
        data.parent_id = 1;
        data.title = 'Review Title '+Num.get_id();
        data.rating = Num.get_id(6);
        data.comment = "My comment "+ Review_Logic.get_test_comment();
        return data;
    };
}
module.exports = {
    Review_Field,
    Review_Message,
    Review_Table,
    Review_Url,
    Review_Logic
};
