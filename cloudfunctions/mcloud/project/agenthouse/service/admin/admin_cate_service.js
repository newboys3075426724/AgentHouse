/**
 * Notes: 房源后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-23 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const util = require('../../../../framework/utils/util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const CateModel = require('../../model/cate_model.js');
const ProductModel = require('../../model/product_model.js');

class AdminCateService extends BaseProjectAdminService {


	async sortCate(id, sort) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async statusCate(id, status) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getAdminCateList({
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
			'CATE_ORDER': 'asc',
			'CATE_ADD_TIME': 'desc'
		};
		let fields = 'CATE_OBJ,CATE_VOUCH,CATE_ORDER,CATE_STATUS,CATE_TITLE,CATE_CNT,CATE_QR';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				CATE_TITLE: ['like', search]
			},];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'vouch': {
					where.and.CATE_VOUCH = 1;
					break;
				}
				case 'cate': {
					where.and['CATE_OBJ.cate'] = String(sortVal);
					break;
				}
				case 'line': {
					where.and['CATE_OBJ.line'] = String(sortVal);
					break;
				}
				case 'area': {
					where.and['CATE_OBJ.area'] = String(sortVal);
					break;
				}
				case 'type': {
					where.and['CATE_OBJ.type'] = String(sortVal);
					break;
				}
				case 'top': {
					where.and.CATE_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'CATE_ADD_TIME');
					break;
				}
				case 'status':
					// 按类型
					where.and.CATE_STATUS = Number(sortVal);
					break;
			}
		}

		return await CateModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async delCate(id) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async insertCate({

	}) {
		//是否重复
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getCateDetail(id) {
		let fields = '*';

		let cate = await CateModel.getOne(id, fields);
		if (!cate) return null;

		return cate;
	}

	/**首页设定 */
	async vouchCate(id, vouch) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async editCate({
	}) {

		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async updateCateForms({
		id,
		hasImageForms
	}) {
		this.AppError('[中介]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


}

module.exports = AdminCateService;