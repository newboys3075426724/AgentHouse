const CATE_TYPE = ['单房', '1房1厅', '2房1厅', '3房1厅', '3房2厅', '4房', '5房', '别墅', '复式', '其他'];
const CATE_TAG = ['近地铁', '可养猫', '可养狗', '住外宾', '民水电', '可月付', '半年起', '可短租', '小型犬', '可停车', '重点房', '可注册', '做饭'];
const AREA = ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '顺义区', '通州区', '大兴区', '房山区', '门头沟区', '昌平区', '平谷区', '密云区', '怀柔区', '延庆区'];
const CATE_LINE = ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线'];
const CATE_CATE = ['公寓', '小区房', '商住楼', '农民房', '其他'];


module.exports = { //agenthouse
	PROJECT_COLOR: '#FF6E00',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#FF6E00',

	AREA,
	CATE_TYPE,
	CATE_TAG,
	CATE_LINE,
	CATE_CATE,

	NEWS_NAME: '内容管理',
	NEWS_CATE: [
		{ id: 1, title: '公告' },
		{ id: 2, title: '服务' },

	],
	NEWS_FIELDS: [
	],

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' }, 
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'area', title: '所在地区', type: 'area' },
	],

	PRODUCT_NAME: '房源',
	PRODUCT_CATE: [
		{ id: 1, title: '房源' }
	],
	PRODUCT_FIELDS: [
		{ mark: 'type', title: '户型', type: 'radio', must: true, selectOptions: CATE_TYPE, ext: { show: 'row' } },
		{ mark: 'price', title: '房租', type: 'int', must: true },
		{ mark: 'mianji', title: '面积(㎡)', type: 'int', must: true },
		{ mark: 'zhuangxiu', title: '装修', type: 'radio', selectOptions: ['精装', '简装', '毛坯', '其他'], ext: { show: 'row' } },
		{ mark: 'louceng', title: '楼层', type: 'text', must: true },
		{ mark: 'content', title: '简介', type: 'textarea', must: true },
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 8, must: true },
		{ mark: 'tag', title: '标签', type: 'checkbox', must: true, selectOptions: CATE_TAG, ext: { show: 'row' } },
		{
			mark: 'sheshi', title: '房内设施', type: 'rows',
			ext: {
				titleName: '设施',
				hasDetail: false,
				hasVal: false,
				maxCnt: 30,
				minCnt: 0,
				checkDetail: true,
				hasPic: false,
				checkPic: false,
				titleMode: 'input'
			},
			def: [],
			must: true
		},
	],

	ARTICLE_NAME: '中介',
	ARTICLE_CATE: [
		{ id: 1, title: '中介' },
	],
	ARTICLE_FIELDS: [
		{ mark: 'area', title: '区域', type: 'radio', must: true, selectOptions: AREA, ext: { show: 'row' } }, 
		{ mark: 'store', title: '门店', type: 'text', must: true },
		{ mark: 'tel', title: '电话', type: 'text', must: true },
		{ mark: 'wx', title: '微信', type: 'text', must: true }, 
		{
			mark: 'level', title: '星级', type: 'select',
			selectOptions: [
				{ label: '1星级', val: '1' },
				{ label: '2星级', val: '2' },
				{ label: '3星级', val: '3' },
				{ label: '4星级', val: '4' },
				{ label: '5星级', val: '5' }],
			def: '3', must: true
		},
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{
			mark: 'tag', title: '特征标签', type: 'rows',
			ext: {
				titleName: '标签',
				hasDetail: false,
				hasVal: false,
				maxCnt: 6,
				minCnt: 0,
				checkDetail: true,
				hasPic: false,
				checkPic: false,
				titleMode: 'input'
			},
			def: [],
			must: false
		},
		{ mark: 'desc', title: '简介', type: 'textarea', must: true, max: 1000 },
	],


	CATE_NAME: '小区',
	CATE_FIELDS: [
		{ mark: 'cate', title: '分类', type: 'select', selectOptions: CATE_CATE, must: true },
		{ mark: 'type', title: '户型', type: 'checkbox', must: true, selectOptions: CATE_TYPE, ext: { show: 'row' } },
		{ mark: 'rentmin', title: '租金(下限)', type: 'int', must: true },
		{ mark: 'rentmax', title: '租金(上限)', type: 'int', must: true },
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 8, must: true },
		{ mark: 'content', title: '介绍', type: 'textarea', must: true, max: 1500 },
		{ mark: 'tel', title: '电话', type: 'text', must: true },
		{ mark: 'wx', title: '微信', type: 'text', must: true },

		{ mark: 'line', title: '地铁线路', type: 'checkbox', checkBoxLimit: 0, must: false, selectOptions: CATE_LINE, ext: { show: 'row' } },
		{ mark: 'station', title: '地铁站点', type: 'text', must: false },

		{ mark: 'area', title: '区域', type: 'radio', must: true, selectOptions: AREA, ext: { show: 'row' } },

		{ mark: 'tag', title: '标签', type: 'checkbox', must: true, selectOptions: CATE_TAG, ext: { show: 'row' } },
		{
			mark: 'sheshi', title: '公共设施', type: 'rows',
			ext: {
				titleName: '设施',
				hasDetail: false,
				hasVal: false,
				maxCnt: 30,
				minCnt: 0,
				checkDetail: true,
				hasPic: false,
				checkPic: false,
				titleMode: 'input'
			},
			def: [],
			must: true
		},
	],
}