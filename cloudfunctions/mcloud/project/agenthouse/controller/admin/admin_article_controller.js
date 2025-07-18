/**
 * Notes: 模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminArticleService = require('../../service/admin/admin_article_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');
const ArticleModel = require('../../model/article_model.js');

class AdminArticleController extends BaseProjectAdminController {

	/** 置顶与排序设定 */
	async sortArticle() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminArticleService();
		await service.sortArticle(input.id, input.sort);
	}

	/** 首页设定 */
	async vouchArticle() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminArticleService();
		await service.vouchArticle(input.id, input.vouch);
	}

	/** 状态修改 */
	async statusArticle() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminArticleService();
		await service.statusArticle(input.id, input.status);

	}

	/** 列表 */
	async getAdminArticleList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminArticleService();
		let result = await service.getAdminArticleList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].ARTICLE_ADD_TIME = timeUtil.timestamp2Time(list[k].ARTICLE_ADD_TIME, 'Y-M-D h:m:s');

			if (list[k].ARTICLE_OBJ && list[k].ARTICLE_OBJ.desc)
				delete list[k].ARTICLE_OBJ.desc;
		}
		result.list = list;

		return result;

	}


	/** 发布 */
	async insertArticle() {
		await this.isAdmin();

		// 数据校验 
		let rules = {

		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminArticleService();
		let result = await service.insertArticle(input);

		this.logOther('添加了《' + input.title + '》');

		return result;

	}


	/** 获取信息用于编辑修改 */
	async getArticleDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminArticleService();
		return await service.getArticleDetail(input.id);

	}

	/** 编辑 */
	async editArticle() {
		await this.isAdmin();

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminArticleService();
		let result = service.editArticle(input);

		this.logOther('修改了《' + input.title + '》');

		return result;
	}

	/** 删除 */
	async delArticle() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await ArticleModel.getOneField(input.id, 'ARTICLE_TITLE');

		let service = new AdminArticleService();
		await service.delArticle(input.id);

		if (title)
			this.logOther('删除了《' + title + '》');

	}

	/** 更新图片信息 */
	async updateArticleForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminArticleService();
		return await service.updateArticleForms(input);
	}

}

module.exports = AdminArticleController;