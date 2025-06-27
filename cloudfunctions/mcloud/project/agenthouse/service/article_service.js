/**
 * Notes: 模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-08 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const ArticleModel = require('../model/article_model.js');
const CateModel = require('../model/cate_model.js');

class ArticleService extends BaseProjectService {

	/** 浏览资讯信息 */
	async viewArticle(id) {

		let fields = '*';

		let where = {
			_id: id,
			ARTICLE_STATUS: ArticleModel.STATUS.COMM
		}
		let article = await ArticleModel.getOne(where, fields);
		if (!article) return null;

		ArticleModel.inc(id, 'ARTICLE_VIEW_CNT', 1);

		let cate = await CateModel.getOne(article.ARTICLE_CATE_ID);
		if (cate) article.cate = cate;

		return article;
	}


	/** 取得分页列表 */
	async getArticleList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ARTICLE_ORDER': 'asc',
			'ARTICLE_ADD_TIME': 'desc'
		};
		let fields = 'ARTICLE_VIEW_CNT,ARTICLE_TITLE,ARTICLE_CATE_ID,ARTICLE_ADD_TIME,ARTICLE_ORDER,ARTICLE_STATUS,ARTICLE_CATE_NAME,ARTICLE_OBJ';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		where.and.ARTICLE_STATUS = ArticleModel.STATUS.COMM; // 状态  


		if (util.isDefined(search) && search) {
			where.or = [
				{ ARTICLE_TITLE: ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					if (sortVal) where.and.ARTICLE_CATE_ID = String(sortVal);
					break;
				}
				case 'area': {
					if (sortVal) where.and['ARTICLE_OBJ.area'] = String(sortVal);
					break;
				}
				case 'level': {
					if (sortVal) where.and['ARTICLE_OBJ.level'] = String(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ARTICLE_ADD_TIME');
					break;
				}
			}
		}

		return await ArticleModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}


}

module.exports = ArticleService;