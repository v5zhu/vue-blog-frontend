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

                    <Form ref="articleQueryForm" :model="queryParam" :label-width="60" label-position="right">
                        <Row>
                            <Col span="6" style="margin-right: 20px">
                                <Form-item prop="title" label="文章标题">
                                    <Input v-model="queryParam.title" size="large" placeholder="请输入文章标题"/>
                                </Form-item>
                            </Col>
                            <Col span="6" style="margin-right: 20px">
                                <Form-item prop="categories" label="分类">
                                    <Select v-model="queryParam.categories" filterable clearable>
                                        <Option v-for="item in categories" :value="item.id" :key="item.id">{{ item.name
                                            }}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </Col>
                            <Col span="6">
                                <Form-item prop="tags" label="标签">
                                    <Select v-model="queryParam.tags" filterable clearable>
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

    import {formatTime} from 'utils/index';

    import store from 'store/';
    import Cookies from 'js-cookie';

    export default {
        components: {expandRow},

        name: 'buttons',
        data() {
            return {
                loginUser: {},
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
                queryParam: {
                    status: '',
                    title: '',
                    tags: '',
                    categories: ''
                },
                tags: [],
                categories: [],
                sortParam: [],
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
                        key: 'commentsNum',
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
                            var categories=[];
                            const categoryList = params.row.categoryList;
                            categoryList.forEach(function (e) {
                                categories.push(e.name)
                            })
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        content: categories
                                    }
                                }, categories),
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
        methods: {
            remove(param) {
                this.$Modal.confirm({
                    title: '删除文章',
                    content: '<p>点击确定1秒后将删除此文章</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            var articleId = param.row.id;
                            store.dispatch('ArticleDelete', {id: articleId}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.loadArticles();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(() => {
                                console.log("删除文章请求失败");
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
            qiniu_upload() {
                uploader.start();
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
                this.pageInfo.pageNum = page;
                this.loadArticles();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.loadArticles();
            },
            filterChange(col) {
                var status = col._filterChecked[0];
                this.queryParam.status = status;
                this.loadArticles();

            },
            sortChange(params) {
                var key = params.key;
                var order = params.order;

                var asc = key + ' asc';
                var desc = key + ' desc';

                var ascIndex = this.sortParam.indexOf(asc);
                var descIndex = this.sortParam.indexOf(desc);

                if (order == 'normal') {
                    if (ascIndex != -1) {
                        this.sortParam.splice(ascIndex, 1);
                    }
                    if (descIndex != -1) {
                        this.sortParam.splice(descIndex, 1);
                    }
                } else if (order == 'asc') {
                    if (ascIndex == -1) {
                        this.sortParam.push(asc);
                    }
                    if (descIndex != -1) {
                        this.sortParam.splice(descIndex, 1);
                    }
                } else if (order == 'desc') {
                    if (descIndex == -1) {
                        this.sortParam.push(desc);
                    }
                    if (ascIndex != -1) {
                        this.sortParam.splice(ascIndex, 1);
                    }
                }
                this.loadArticles();
            },
            loadArticles() {
                store.dispatch('ArticleList', {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize,
                    queryParam: this.queryParam,
                    sort: this.sortParam.join(',')
                }).then(res => { // 拉取user_info
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
            categoryList() {
                store.dispatch('CategoryList', {token: this.loginUser.token}).then(res => { // 拉取user_info
                    var cates = res.data.payload;
                    this.categories = cates;

                }).catch(res => {
                    console.log(res);
                })
            },
            tagList() {
                store.dispatch('FilterTagList', {}).then(res => { // 拉取user_info
                    var tags = res.data.payload;
                    this.tags = tags;

                }).catch(res => {
                    console.log(res);
                })
            },
            clearAll(refName) {

                this.queryParam = {
                    status: '',
                    title: '',
                    tagsList: '',
                    categoriesList: ''
                };
                this.$refs[refName].resetFields();

            },
        },
        mounted() {
            const vue = this;

            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000)
            // qiniuInit(vue);//初始化七牛数据


            var jsonString = Cookies.get('USER-INFO');
            if (jsonString) {
                this.loginUser = JSON.parse(jsonString);
            }
            this.categoryList();
            this.tagList();

            this.loadArticles();
        },
    }
    var vue;
    var uploader;

    function getVideoName(video_name) {
        var video_name = '';
        var img_ext_list = [".jpg", ".png", ".jpeg"];
        img_ext_list.forEach(function (e) {
            if (video_name.indexOf(e) !== -1) {
                let point_index = video_name.indexOf(e);
                let leaf_index = video_name.lastIndexOf('/', point_index);
                let line_index = video_name.lastIndexOf('_', point_index);
                video_name = video_name.substring(line_index + 1);
                return video_name;

            }
        });


        var video_ext_list = [".mp4"];
        video_ext_list.forEach(function (e) {
            if (video_name.indexOf(e) !== -1) {
                let point_index = video_name.indexOf(e);
                let leaf_index = video_name.lastIndexOf('/', point_index);
                let line_index = video_name.lastIndexOf('_', point_index);
                video_name = video_name.substring(line_index + 1);
                return video_name;
            }
        });
        return video_name;

    };

    function getVideoDuration(video_duration_before) {
        let video_duration = parseInt(video_duration_before);
        if (video_duration <= 60) {
            if (video_duration < 10)
                video_duration = "00:00:0" + video_duration;
            else
                video_duration = "00:00:" + video_duration;

        }
        else if (video_duration > 60 && video_duration <= 60 * 60) {
            const minute = Math.floor(video_duration / 60);
            const s = Math.floor(video_duration % 60);
            if (minute < 10)
                video_duration = "00:0" + minute;
            else
                video_duration = "00:" + minute;


            if (s < 10)
                video_duration = video_duration + ":0" + s;

            else
                video_duration = video_duration + ":" + s;

        }
        else if (video_duration > 60 * 60 && video_duration < 60 * 60 * 60) {
            const hour = Math.floor(video_duration / 3600);

            const minute = Math.floor((video_duration % 3600) / 60);
            const s = Math.floor((video_duration % 3600) % 60);
            if (hour < 10)
                video_duration = "0" + hour;
            else
                video_duration = hour + '';

            if (minute < 10)
                video_duration = video_duration + ":0" + minute;
            else
                video_duration = video_duration + ":" + minute;

            if (s < 10)
                video_duration = video_duration + ":0" + s;
            else
                video_duration = video_duration + ":" + s;


        }

        return video_duration;
    }

    function getVideoSize(video_size) {
        if (video_size < 1024)
            video_size = Math.round(video_size * 100) / 100 + " B";
        else if (video_size >= 1024 && video_size < 1024 * 1024)
            video_size = Math.round(video_size / 1024 * 100) / 100 + " Kb";
        else if (video_size >= 1024 * 1024 && video_size < 1024 * 1024 * 1024)
            video_size = Math.round(video_size / (1024 * 1024) * 100) / 100 + " Mb";

        return video_size;
    }

    function qiniuInit(vue) {

        uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式，依次退化
            browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
            uptoken_func: function () {    // 在需要获取uptoken时，该方法会被调用
                // return "123";
            },
            get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
            // downtoken_url: '/downtoken',
            // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
            unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
            save_key: false,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
            domain: 'http://qiniu-plupload.qiniudn.com/',     // bucket域名，下载资源时用到，必需
            container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
            max_file_size: '1024mb',             // 最大文件体积限制
            flash_swf_url: 'static/bower_components/plupload/js/Moxie.swf',  //引入flash，相对路径
            max_retries: 0,                     // 上传失败最大重试次数
            dragdrop: true,                     // 开启可拖曳上传
            drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '10mb',                  // 分块上传时，每块的体积
            auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
            multi_selection: true,
            filters: {
                max_file_size: '1000mb',
                prevent_duplicates: false,
                // Specify what files to browse for
                mime_types: [
                    {title: "Video files", extensions: "mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                    {title: "Image files", extensions: "jpg,png,jpeg"}, // 限定jpg,gif,png后缀上传
                ]
            },
            init: {
                'FilesAdded': function (up, files) {

                    plupload.each(files, function (file) {
                        vue.progresshow = true;
                    });
                },
                'BeforeUpload': function (up, file) {

                    vue.progresscount = 10;
                    vue.progresstatus = "active";


                    vue.progressspeed = "1.5 Mb/s";

                    var interval = setInterval(function () {
                        if (vue.progresscount === 40) {
                            clearInterval(interval)

                            vue.$Notice.success({title: '上传成功'});

                            setTimeout(function () {
                                vue.progressspeed = 0;
                                vue.progresstatus = "wrong";

                                vue.$Message.error('上传失败');
                                setTimeout(function () {
                                    vue.progresscount = 0;

                                    vue.progresshow = false;


                                    var obj = {
                                        task_status: 0,
                                        timestamp: "2017-08-10 17:03:54",
                                        video_duration: "11.121667",
                                        video_size: 1732410,
                                        video_name: "http://otl6ypoog.bkt.clouddn.com/Objectstoarge/videos/2017-08-10/33337_p.mp4",
                                    };

                                    vue.video_list.push(obj);
                                    vue.setInitPage(1);
                                }, 4000)
                            }, 1000);
                        } else {
                            vue.progresscount += 2;

                        }
                    }, 100);

                },
                'UploadProgress': function (up, file) {
                },
                'FileUploaded': function (up, file, info) {
                },
                'Error': function (up, err, errTip) {
                    //上传出错时，处理相关的事情


                },
                'UploadComplete': function () {
                    //队列文件处理完毕后，处理相关的事情
                },
                'Key': function (up, file) {
                    // return key
                }
            }
        });
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



