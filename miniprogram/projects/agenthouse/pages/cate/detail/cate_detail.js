const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		allTag: projectSetting.CATE_TAG,
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
	 
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let cate = await cloudHelper.callCloudData('cate/view', params, opt);
		if (!cate) {
			this.setData({
				isLoad: null
			})
			return;
		}

		let markers = []
		markers.push({
			id: 1, //标记点 id
			width: 30,
			height: 30,
			longitude: cate.CATE_ADDRESS.longitude,
			latitude: cate.CATE_ADDRESS.latitude,
			label: {
				content: '',
				color: '#f00',
				fontSize: 20
			},
			/*
			callout: {
				content: '', //cate.CATE_TITLE,
				color: "#f00",
				fontSize: 14,
				padding: 5,
				borderRadius: 2,
				display: 'ALWAYS'
			},*/
			iconPath: '../../../images/location.png'
		})

		this.setData({
			isLoad: true,
			cate,
			markers
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

	bindMapTap:function(e) {
		let cate = this.data.cate;
		wx.openLocation({
			latitude: cate.CATE_ADDRESS.latitude,
			longitude: cate.CATE_ADDRESS.longitude,
			address:cate.CATE_ADDRESS_DETAIL,
			scale: 18
		})
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () { },

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	onShareAppMessage: function (res) {
		return {
			title: this.data.cate.CATE_TITLE,
			imageUrl: this.data.cate.CATE_OBJ.cover[0]
		}
	}
})