const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const dataHelper = require('../../../../../../helper/data_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminArticleBiz = require('../../../../biz/admin_article_biz.js');
const ArticleBiz = require('../../../../biz/article_biz.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ARTICLE_NAME + '-修改',
		});

		this._loadDetail();
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail(); 
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminArticleBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let article = await cloudHelper.callCloudData('admin/article_detail', params, opt);
		if (!article) {
			this.setData({
				isLoad: null
			})
			return;
		};

		this.setData({
			isLoad: true,

			formTitle: article.ARTICLE_TITLE,
			formCateId: article.ARTICLE_CATE_ID,
			formCateName: article.ARTICLE_CATE_NAME,
			formOrder: article.ARTICLE_ORDER,


			formForms: article.ARTICLE_FORMS,
		});
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;
		data = validate.check(data, AdminArticleBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = AdminArticleBiz.getCateName(data.cateId);

		try {
			let articleId = this.data.id;
			data.id = articleId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/article_edit', data);

			await cloudHelper.transFormsTempPics(forms, 'article/', articleId, 'admin/article_update_forms');

			let callback = () => {
				// 更新列表页面数据
				let node = {
					'ARTICLE_TITLE': data.title,
					'ARTICLE_CATE_NAME': data.cateName,
					'ARTICLE_ORDER': data.order,
					'ARTICLE_OBJ': {
					 
					}
				}
				pageHelper.modifyPrevPageListNodeObject(articleId, node);

				wx.navigateBack();

			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},

	bindAddressTap: function (e) {
		AdminArticleBiz.selectLocationCallback(this);
	},

	url: function (e) {
		pageHelper.url(e, this);
	}

})