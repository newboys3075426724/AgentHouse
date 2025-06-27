/**
 * Notes: 模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-08 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ArticleService = require('../service/article_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class ArticleController extends BaseProjectController {

	/** 列表 */
	async getArticleList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ArticleService();
		let result = await service.getArticleList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].ARTICLE_OBJ.level = Number(list[k].ARTICLE_OBJ.level);
			list[k].ARTICLE_ADD_TIME = timeUtil.timestamp2Time(list[k].ARTICLE_ADD_TIME, 'Y-M-D');
		}

		return result;

	}


	/** 浏览详细 */
	async viewArticle() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ArticleService();
		let article = await service.viewArticle(input.id);

		if (article) {
			// 显示转换 
			article.ARTICLE_ADD_TIME = timeUtil.timestamp2Time(article.ARTICLE_ADD_TIME, 'Y-M-D');
		}

		return article;
	}

}

module.exports = ArticleController;