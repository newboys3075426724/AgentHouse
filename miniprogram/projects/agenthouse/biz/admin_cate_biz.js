/**
 * Notes: 小区后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');

class AdminCateBiz extends BaseBiz {

	/** 表单初始化相关数据 */
	static async initCateFormData(id = '') {
		return {
			id,

			fields: projectSetting.CATE_FIELDS,

			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formForms: [],

			// 地点
			formAddress: {
				latitude: 0,
				longitude: 0
			},
			formAddressDetail: '',
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



/** 表单校验  本地 */
AdminCateBiz.CATE_CHECK_FORM = {
	title: 'formTitle|must|string|name=名称',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	address: 'formAddress|object|name=地址',
	addressDetail: 'formAddressDetail|must|min:2|max:500|name=地址',
	forms: 'formForms|array',
};



module.exports = AdminCateBiz;