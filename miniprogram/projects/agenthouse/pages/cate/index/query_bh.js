const projectSetting = require('../../../public/project_setting.js');

const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {
		projectSetting,
		allTag: projectSetting.CATE_TAG,

		showModal: false,
		showBox: 'other',

		rentMin: 0,
		rentMax: 25000,

		area: [],
		type: [],

		cate: [],
		line: [],
		tag: [],
		_params: {}
	},

	methods: {
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: async function (options) {
			ProjectBiz.initPage(this);

			this._getSearchMenu();

			let _params = {
				query: {
					area: [],
					type: [],

					cate: [],
					line: [],
					tag: [],

					rentmin: this.data.rentMin,
					rentmax: this.data.rentMax,
				}
			}
			this.setData({ _params });

		},
		bindAreaTap: function (e) {
			let t = pageHelper.dataset(e, 'area');
			let area = this.data.area;

			this.toggleElementInArray(area, t);

			this.setData({ area });
		},

		bindLineTap: function (e) {
			let t = pageHelper.dataset(e, 'line');
			let line = this.data.line;

			this.toggleElementInArray(line, t);

			this.setData({ line });
		},

		bindCateTap: function (e) {
			let t = pageHelper.dataset(e, 'cate');
			let cate = this.data.cate;

			this.toggleElementInArray(cate, t);

			this.setData({ cate });
		},


		bindTagTap: function (e) {
			let t = pageHelper.dataset(e, 'tag');
			let tag = this.data.tag;

			this.toggleElementInArray(tag, t);

			this.setData({ tag });
		},

		bindTypeTap: function (e) {
			let t = pageHelper.dataset(e, 'type');
			let type = this.data.type;

			this.toggleElementInArray(type, t);

			this.setData({ type });
		},

		bindResetTap: function (e) {
			this.setData({
				tag: [],
				line: [],
				cate: [],

				//search: '',

				rentMin: 0,
				rentMax: 25000,
			});

			let _params = {
				query: {
					type: this.data.type,
					area: this.data.area,

					tag: this.data.tag,
					line: this.data.line,
					cate: this.data.cate,

					rentmin: this.data.rentMin,
					rentmax: this.data.rentMax,
				}
			}

			this.setData({ showModal: false, _params }, () => {
				this.selectComponent("#list").reload();
			});
		},


		toggleElementInArray: function (array, element) {
			const index = array.indexOf(element); // 查找元素在数组中的索引

			if (index !== -1) {
				// 如果元素存在，删除它
				array.splice(index, 1);
			} else {
				// 如果元素不存在，添加它
				array.push(element);
			}
		},

		onSliderChange(e) {
			const { value } = e.detail;
			let rentMin = value;
			this.setData({
				rentMin
			});
		},

		bindHideModalTap: function (e) {
			this.setData({ showModal: false });
		},

		bindOpenModalTap: function (e) {
			let showBox = pageHelper.dataset(e, 'box');
			this.setData({ showModal: true, showBox });
		},


		bindResetModalTap: function (e) {
			let showBox = this.data.showBox;
			if (showBox == 'other') {
				this.setData({
					tag: [],
					line: [],
					cate: [],
					rentMin: 0,
					rentMax: 25000,
				});
			}
			else if (showBox == 'area') {
				this.setData({
					area: [],
				});
			}
			else if (showBox == 'type') {
				this.setData({
					type: [],
				});
			}

		},

		bindQueryModalTap: function (e) {

			let _params = {
				query: {
					type: this.data.type,
					area: this.data.area,


					tag: this.data.tag,
					line: this.data.line,
					cate: this.data.cate,

					rentmin: this.data.rentMin,
					rentmax: this.data.rentMax,
				}
			}
			this.setData({ showModal: false, _params }, () => {
				this.selectComponent("#list").reload();
			});
		},

		_getSearchMenu: function () {
			this.setData({
				sortItems: [],
				sortMenus: [],
			})

		}

	}
})