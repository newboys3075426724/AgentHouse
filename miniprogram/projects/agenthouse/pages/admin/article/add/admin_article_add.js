const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminArticleBiz = require('../../../../biz/admin_article_biz.js');
const ArticleBiz = require('../../../../biz/article_biz.js'); 
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ARTICLE_NAME + '-添加',
		});

		this.setData(AdminArticleBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	bindAddressTap:function(e) {
		AdminArticleBiz.selectLocationCallback(this);
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminArticleBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = AdminArticleBiz.getCateName(data.cateId);
 

		try {

			// 创建
			let result = await cloudHelper.callCloudSumbit('admin/article_insert', data);
			let articleId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'article/', articleId, 'admin/article_update_forms');


			let callback = async function () {
				PublicBiz.removeCacheList('admin-article-list');
				PublicBiz.removeCacheList('article-list');
				wx.navigateBack();

			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},

})