/**
 * Notes: 产品模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-08 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const ProductModel = require('../model/product_model.js');
const CateModel = require('../model/cate_model.js');

class ProductService extends BaseProjectService {

	/** 浏览资讯信息 */
	async viewProduct(id) {

		let fields = '*';

		let where = {
			_id: id,
			PRODUCT_STATUS: ProductModel.STATUS.COMM
		}
		let product = await ProductModel.getOne(where, fields);
		if (!product) return null;

		ProductModel.inc(id, 'PRODUCT_VIEW_CNT', 1);

		let cate = await CateModel.getOne(product.PRODUCT_CATE_ID);
		if (cate) product.cate = cate;

		return product;
	}


	/** 取得分页列表 */
	async getProductList({
		query,
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
			'PRODUCT_ORDER': 'asc',
			'PRODUCT_ADD_TIME': 'desc'
		};
		let fields = 'PRODUCT_VIEW_CNT,PRODUCT_TITLE,PRODUCT_CATE_ID,PRODUCT_ADD_TIME,PRODUCT_ORDER,PRODUCT_STATUS,PRODUCT_CATE_NAME,PRODUCT_OBJ,cate.CATE_OBJ';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		where.and.PRODUCT_STATUS = ProductModel.STATUS.COMM; // 状态  

		if (query && query.line && query.line.length > 0) {
			where.and['cate.CATE_OBJ.line'] = ['in', query.line];
		}

		if (query && query.tag && query.tag.length > 0) {
			where.and['PRODUCT_OBJ.tag'] = ['in', query.tag];
		}

		if (query && query.type && query.type.length > 0) {
			where.and['PRODUCT_OBJ.type'] = ['in', query.type];
		}

		if (query && query.area && query.area.length > 0) {
			where.and['cate.CATE_OBJ.area'] = ['in', query.area];
		}

		if (query && query.cate && query.cate.length > 0) {
			where.and['cate.CATE_OBJ.cate'] = ['in', query.cate];
		}

		where.and['PRODUCT_OBJ.price'] = ['between', Number(query.rentmin), Number(query.rentmax)]; 

		if (util.isDefined(search) && search) {
			where.or = [
				{ PRODUCT_TITLE: ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					if (sortVal) where.and.PRODUCT_CATE_ID = String(sortVal);
					break;
				}
				case 'area': {
					if (sortVal) where.and['PRODUCT_OBJ.area'] = String(sortVal);
					break;
				}
				case 'type': {
					if (sortVal) where.and['PRODUCT_OBJ.type'] = String(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'PRODUCT_ADD_TIME');
					break;
				}
			}
		}

		let CateModel = require('../model/cate_model.js');
		let joinParams = {
			from: CateModel.CL,
			localField: 'PRODUCT_CATE_ID',
			foreignField: '_id',
			as: 'cate',
		};

		return await ProductModel.getListJoin(joinParams,where, fields, orderBy, page, size, isTotal, oldTotal);
	}


}

module.exports = ProductService;