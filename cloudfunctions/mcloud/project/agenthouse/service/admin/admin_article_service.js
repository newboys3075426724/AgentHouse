/**
 * Notes: 产品后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-08 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const ArticleModel = require('../../model/article_model.js');

class AdminArticleService extends BaseProjectAdminService {

	async vouchArticle(id, vouch) {
		return ArticleModel.edit(id, { ARTICLE_VOUCH: Number(vouch) });
	}


	/**添加 */
	async insertArticle({

	}) {


		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delArticle(id) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');


	}

	/**获取信息 */
	async getArticleDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let article = await ArticleModel.getOne(where, fields);
		if (!article) return null;

		return article;
	}

	// 更新forms信息
	async updateArticleForms({
		id,
		hasImageForms
	}) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**更新数据 */
	async editArticle({

	}) {

		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得分页列表 */
	async getAdminArticleList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ARTICLE_ORDER': 'asc',
			'ARTICLE_ADD_TIME': 'desc'
		};
		let fields = 'ARTICLE_TITLE,ARTICLE_CATE_ID,ARTICLE_CATE_NAME,ARTICLE_EDIT_TIME,ARTICLE_ADD_TIME,ARTICLE_ORDER,ARTICLE_STATUS,ARTICLE_VOUCH,,ARTICLE_QR,ARTICLE_OBJ';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ARTICLE_TITLE: ['like', search] },
				{ ARTICLE_CATE_NAME: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.ARTICLE_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.ARTICLE_STATUS = Number(sortVal);
					break
				}
				case 'vouch': {
					where.and.ARTICLE_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.ARTICLE_ORDER = 0;
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

	/**修改状态 */
	async statusArticle(id, status) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶与排序设定 */
	async sortArticle(id, sort) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminArticleService;