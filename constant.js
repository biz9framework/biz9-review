const Config = {
    TITLE:'BiZ9-Review',
    APP_ID:"test-stage-may",
    PORT_ID: "1904",
    HOST:"http://localhost:1904",
}
class Project_Url {
    static PING="ping";
}
class Project_Table {
    static BLANK = 'blank_biz';
    static PRODUCT = 'product_biz';
    static USER = 'user_biz';
};
module.exports = {
    Config,
    Project_Table,
    Project_Url
}
