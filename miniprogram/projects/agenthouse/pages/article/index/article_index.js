const pageHelper = require('../../../../../helper/page_helper.js');
const ArticleBiz = require('../../../biz/article_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');

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
		ProjectBiz.initPage(this);

		//设置搜索菜单
		this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	onShareAppMessage: function (res) {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	_getSearchMenu: function () {

		let sortMenus = [
			{ label: '全部', type: '', value: 0 },
		];

		let sortItem1 = [
			{ label: '区域', type: '', value: 0 },
		];
		for (let k = 0; k < projectSetting.AREA.length; k++) {
			sortItem1.push({ label: projectSetting.AREA[k], type: 'area', value: projectSetting.AREA[k] });
		}

		let sortItem2 = [
			{ label: '星级', type: '', value: 0 },
		];
		for (let k = 1; k <= 5; k++) {
			sortItem2.push({ label: k + '星级', type: 'level', value: k });
		}

		this.setData({
			search: '',
			sortItems: [sortItem1, sortItem2],
			sortMenus,
			isLoad: true
		})
	}

})