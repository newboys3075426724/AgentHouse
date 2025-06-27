/**
 * Notes:  产品实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-08 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ArticleModel extends BaseProjectModel {

}

// 集合名
ArticleModel.CL = BaseProjectModel.C('article');

ArticleModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ARTICLE_ID: 'string|true',

	ARTICLE_TITLE: 'string|true|comment=标题',
	ARTICLE_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	ARTICLE_CATE_ID: 'string|true|default=0|comment=分类',
	ARTICLE_CATE_NAME: 'string|false|comment=分类冗余',

	ARTICLE_ORDER: 'int|true|default=9999',
	ARTICLE_VOUCH: 'int|true|default=0', 

	ARTICLE_FORMS: 'array|true|default=[]',
	ARTICLE_OBJ: 'object|true|default={}',

	ARTICLE_QR: 'string|false',
	ARTICLE_VIEW_CNT: 'int|true|default=0',

	ARTICLE_ADD_TIME: 'int|true',
	ARTICLE_EDIT_TIME: 'int|true',
	ARTICLE_ADD_IP: 'string|false',
	ARTICLE_EDIT_IP: 'string|false',
};

// 字段前缀
ArticleModel.FIELD_PREFIX = "ARTICLE_";

/**
 * 状态 0=未启用,1=使用中 
 */
ArticleModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = ArticleModel;