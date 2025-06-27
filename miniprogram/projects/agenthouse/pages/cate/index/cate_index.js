
const pageHelper = require('../../../../../helper/page_helper.js');
const behavior = require('query_bh.js');
const CateBiz = require('../../../biz/cate_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		
	}, 

	behaviors: [behavior],

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },



	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

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


	onShareAppMessage: function () {

	},

	


})