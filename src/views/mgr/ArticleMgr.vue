<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Row>
            <Col :md="22">
                <div>
                    <div id="container" style="margin-bottom:10px;">
                        <Button type="primary" size="large" icon="edit"
                                @click="editArticle(null,pageInfo.pageNum, pageInfo.pageSize)"
                                style="padding-bottom:5px;">发表文章
                        </Button>
                    </div>

                    <Form ref="articleQueryForm" :model="pageQuery" :label-width="60" label-position="right">
                        <Row>
                            <Col span="6" style="margin-right: 20px">
                                <Form-item prop="title" label="文章标题">
                                    <Input v-model="pageQuery.filterMap.title" size="large" placeholder="请输入文章标题"/>
                                </Form-item>
                            </Col>
                            <Col span="6" style="margin-right: 20px">
                                <Form-item prop="categories" label="分类">
                                    <Cascader v-model="selectedCategory" :data="categoryTree"
                                              change-on-select></Cascader>
                                </Form-item>
                            </Col>
                            <Col span="6">
                                <Form-item prop="tags" label="标签">
                                    <Select v-model="pageQuery.filterMap.tag" filterable clearable>
                                        <Option v-for="item in tags" :value="item.id" :key="item.id">{{ item.name }}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </Col>
                            <Col span="4" style="margin-right: 20px">
                                <Form-item>
                                    <Button type="primary" @click="loadArticles">查询</Button>
                                    <Button type="warning" @click="clearAll('articleQueryForm')">重置</Button>
                                </Form-item>
                            </Col>
                        </Row>

                    </Form>

                    <div style="position:relative;">
                        <Table :columns="tableDataList" :data="article_list" ref="table" @on-sort-change="sortChange"
                               @on-filter-change="filterChange">

                        </Table>
                        <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                            <Spin size="large"></Spin>
                            <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                        </div>
                    </div>
                    <Page :total="this.pageInfo.total" placement="top"
                          :page-size-opts="pageSizeOpts"
                          show-elevator show-sizer show-total
                          @on-change="changePage"
                          @on-page-size-change="changePageSize"
                          style="text-align:left;margin:50px 0"></Page>
                    <Button type="primary" size="large" @click="exportData(1)">
                        <Icon type="ios-download-outline"></Icon>
                        导出文章数据
                    </Button>
                </div>
                <div style="" class="doc-content">
                    <h5>表格综合实例</h5>
                    <p>轻松完成业务需求，再也不用被产品催了</p>
                </div>
            </Col>
            <Col :md="12">
            </Col>
        </Row>
    </div>
</template>

<script>
    import expandRow from './article-table-expand.vue';

    import {formatCategories, formatTime} from 'utils/index';
    import LocalStorage from 'utils/LocalStorage';
    import {mapGetters} from 'vuex';

    import store from 'store/';

    export default {
        components: {expandRow},

        name: 'buttons',
        data() {
            return {
                loginUser: null,
                pageInfo: {
                    isFirstPage: undefined,
                    isLastPage: undefined,
                    pageNum: 1,
                    pageSize: 10,
                    pages: undefined,
                    total: undefined,
                    list: [],
                    prePage: undefined,
                    nextPage: undefined
                },
                selectedCategory: [],
                categoryTree: [],
                pageQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterMap: {
                        userId: null,
                        status: null,
                        title: null,
                        tag: null,
                        category: null
                    },
                    sortMap: {}
                },
                tags: [],
                categories: [],
                article_list: [],
                pageSizeOpts: [10, 20, 50, 100],
                progresshow: false,
                progresscount: 0,
                progresstatus: 'active',
                progressspeed: 0,
                pageindex: 1,
                lodding: false,
                list_loadding: false,
                tableDataList: [
                    {
                        type: 'expand',
                        width: "30",
                        ellipsis: 'true',

                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                        ellipsis: 'true',
                        render: (h, params) => {
                            const title = params.row.title;
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        content: title
                                    }
                                }, title),
                            ]);
                        }
                    },
                    {
                        title: '发布时间',
                        width: 120,
                        key: 'gmt_create',
                        ellipsis: 'true',
                        sortable: 'custom',
                        render: (h, params) => {
                            const time = params.row.gmtCreate;
                            var datetime = formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        content: datetime
                                    }
                                }, datetime),
                            ]);
                        }

                    },
                    {
                        title: '浏览',
                        width: 90,
                        key: 'hits',
                        ellipsis: 'true',
                        sortable: 'custom'
                    },
                    {
                        title: '评论',
                        width: 90,
                        key: 'comments',
                        ellipsis: 'true',
                        sortable: 'custom'
                    },
                    {
                        title: '支持',
                        width: 90,
                        key: 'likes',
                        ellipsis: 'true',
                        sortable: 'custom'
                    },
                    {
                        title: '反对',
                        width: 90,
                        key: 'dislikes',
                        ellipsis: 'true',
                        sortable: 'custom'
                    },
                    {
                        title: '分类',
                        width: 100,
                        key: 'categories',
                        ellipsis: 'true',
                        render: (h, params) => {
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        content: formatCategories(params.row.categoryList)
                                    }
                                }, formatCategories(params.row.categoryList)),
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        ellipsis: 'true',
                        width: 100,
                        filters: [
                            {
                                label: '发布',
                                value: 'publish'
                            }, {
                                label: '待审',
                                value: 'audit'
                            }, {
                                label: '草稿',
                                value: 'draft'
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.status == value;
                        },

                        render: (h, params) => {
                            const task_status = params.row.status;
                            if (task_status === 'draft') {
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "yellow"
                                        },
                                    }, "草稿"),
                                ]);
                            }
                            else if (task_status === 'audit') {
                                return h('div', [

                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "red"
                                        }
                                    }, "待审"),
                                ]);
                            } else if (task_status === 'publish') {
                                return h('div', [

                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "blue"
                                        }
                                    }, "发布"),
                                ]);
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: '200',
                        key: 'action',
                        align: 'center',
                        ellipsis: 'true',

                        render: (h, params) => {
                            const task_status = params.row.status;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        loading: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editArticle(params.row.id, this.pageInfo.pageNum, this.pageInfo.pageSize);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    },
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            window.open('/admin/mgr/article/preview/' + params.row.id);
                                        }
                                    }
                                }, '预览')
                            ]);

                        }//render
                    },//{
                ],//cloumn
            }//return
        },//data
        computed: {
            ...mapGetters([
                'loginUser'
            ])
        },
        watch: {
            loginUser: function () {
                //loginUser发生变化时会执行该函数

            }
        },
        mounted() {
            const vue = this;

            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
            this.filterCategoryTree();
            this.tagList();

            this.loadArticles();
        },
        methods: {
            remove(param) {
                this.$Modal.confirm({
                    title: '删除文章',
                    content: '<p>点击确定1秒后将删除此文章</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            var articleId = param.row.id;
                            store.dispatch('ArticleDelete', {articleId: articleId}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.loadArticles();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(err => {
                                this.$Message.error({
                                    content: err.data.error,
                                    duration: 5,
                                    closable: true
                                })
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            editArticle(id, pageNum, pageSize) {
                if (id == null) {
                    //发表新文章
                    window.open('/admin/mgr/blog/article/publish')
                } else {
                    //编辑文章
                    window.open('/admin/mgr/blog/article/edit/' + id)
                }
            },
            exportData(type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据',
                        columns: this.columns7,
                        data: this.video_list
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                }
            },
            changePage(page) {
                this.pageQuery.pageNum = page;
                this.loadArticles();
            },
            changePageSize(pageSize) {
                this.pageQuery.pageSize = pageSize;
                this.loadArticles();
            },
            filterChange(col) {
                var status = col._filterChecked[0];
                this.pageQuery.filterMap.status = status;
                this.loadArticles();

            },
            sortChange(params) {
                var key = params.key;
                var order = params.order;

                if (order != 'normal') {
                    this.pageQuery.sortMap[key] = order;
                } else {
                    delete this.pageQuery.sortMap[key];
                }
                this.loadArticles();
            },
            loadArticles() {
                var category = this.selectedCategory;
                if (category && category.length > 0) {
                    this.pageQuery.filterMap.category = category[category.length - 1];
                }

                this.pageQuery.filterMap.userId = this.loginUser.id;
                store.dispatch('ArticleList', this.pageQuery).then(res => { // 拉取user_info
                    this.article_list = res.data.payload.list;
                    this.pageInfo = res.data.payload;
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5 * 1000,
                        closable: true
                    });
                })
            },
            filterCategoryTree() {
                store.dispatch('FilterCategoryTree', {userId: this.loginUser.id}).then(res => {
                    var data = res.data;
                    this.categoryTree = data.payload;
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            tagList() {
                store.dispatch('FilterTagList', {userId: this.loginUser.id}).then(res => { // 拉取user_info
                    var tags = res.data.payload;
                    this.tags = tags;

                }).catch(res => {
                    console.log(res);
                })
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();

            },
        },
        filters: {
            formatCategory(list) {
                return formatCategories(list);
            }
        }
    }
</script>


<style type="text/css" scoped>
    .ivu-tag-dot {
        border: none !important;
    }

    tr.ivu-table-row-hover td .ivu-tag-dot {
        background-color: #ebf7ff !important;
    }

    .demo-i-circle-custom h1 {
        color: #3f414d;
        font-size: 10px;
        font-weight: normal;
    }

    .demo-i-circle-custom p {
        color: #657180;
        font-size: 8px;
        margin: 5px 0 2px;
    }

    .demo-i-circle-custom span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 10px;
    }

    .demo-i-circle-custom span :before {
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -20px;
    }

    ;
    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }

    /*wz-btn wz-btn-primary wz-btn-small wz-btn-loading*/

    .ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading ) {
        padding: 2px 10px !important;
    }

    td.ivu-table-expanded-cell {
        background-color: white !important;

    }
</style>



