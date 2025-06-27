/**
 * Notes: 相册后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-05 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const ArticleBiz = require('./article_biz.js');
const projectSetting = require('../public/project_setting.js');

class AdminArticleBiz extends BaseBiz {

	static initFormData(id = '') {
		let cateIdOptions = ArticleBiz.getCateList();

		return {
			id,

			cateIdOptions,
			fields: projectSetting.ARTICLE_FIELDS,

			formTitle: '',
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,


			formForms: [],
		}

	}

	static getCateName(cateId) {
		let cateList = projectSetting.ARTICLE_CATE;

		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].id == cateId) return cateList[k].title;
		}
		return '';
	}

}

AdminArticleBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=姓名',
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号', 
	forms: 'formForms|array',
};


module.exports = AdminArticleBiz;