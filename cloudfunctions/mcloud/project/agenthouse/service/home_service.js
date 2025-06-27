/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2025-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {
		const CateModel = require('../model/cate_model.js');
		const ArticleModel = require('../model/article_model.js');
		const ProdcutModel = require('../model/product_model.js');

		let fields = 'CATE_STATUS,CATE_TITLE,CATE_OBJ.cover';
		let where = {
			CATE_STATUS: 1,
			CATE_VOUCH: 1
		}
		let cateList = await CateModel.getAll(where, fields, { 'CATE_ADD_TIME': 'desc' }, 10);

		let joinParams = {
			from: CateModel.CL,
			localField: 'PRODUCT_CATE_ID',
			foreignField: '_id',
			as: 'cate',
		};
		fields = 'PRODUCT_STATUS,PRODUCT_VOUCH,PRODUCT_TITLE,PRODUCT_CATE_ID,PRODUCT_CATE_NAME,PRODUCT_OBJ.cover,PRODUCT_OBJ.type,PRODUCT_OBJ.price,cate.CATE_OBJ.area';
		where = {
			PRODUCT_STATUS: 1,
			PRODUCT_VOUCH: 1
		}
		let productList = await ProdcutModel.getListJoin(joinParams, where, fields, { 'PRODUCT_ADD_TIME': 'desc' }); 
		productList = productList.list;

		fields = 'ARTICLE_OBJ.cover,ARTICLE_TITLE';
		where = {
			ARTICLE_STATUS: 1,
			ARTICLE_VOUCH: 1
		}
		let articleList = await ArticleModel.getAll(where, fields, { 'ARTICLE_ADD_TIME': 'desc' }, 10);

		return { cateList, articleList, productList }
	}
}

module.exports = HomeService;