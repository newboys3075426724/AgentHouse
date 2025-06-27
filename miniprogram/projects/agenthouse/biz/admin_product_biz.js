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
			fields: projectSetting.PRODUCT_FIELDS,

			formTitle: '',
			formCateId: '',
			formOrder: 9999,


			formForms: [],
		}

	}

	static async selectLocationCallback(that) {
		let callback = function (res) {
			if (!res || !res.name || !res.address || !res.latitude || !res.longitude)
				return;

			let formAddressDetail = res.name + ' ' + res.address;

			let formAddress = {};
			formAddress.name = res.name;
			formAddress.address = res.address;
			formAddress.latitude = res.latitude;
			formAddress.longitude = res.longitude;
			that.setData({
				formAddressDetail,
				formAddress
			});
		}
		if (that.data.formAddress && that.data.formAddress.latitude > 0) {
			wx.chooseLocation({
				latitude: that.data.formAddress.latitude,
				longitude: that.data.formAddress.longitude,
				success: function (res) {
					callback(res);
				}
			})
		} else {
			wx.chooseLocation({
				success: function (res) {
					callback(res);
				},
				fail: function (err) {
					console.log(err)
					//pageHelper.showNoneToast('需要开启 “位置消息” 才能使用此功能');
				}
			})
		}
	}

}

AdminArticleBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=标题',
	cateId: 'formCateId|must|id|name=所属小区',
	cateName: 'formCateName|string|name=所属小区',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',

	forms: 'formForms|array',
};


module.exports = AdminArticleBiz;