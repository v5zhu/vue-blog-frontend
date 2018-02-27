<template>
    <div>

        <Form ref="articleForm" :rules="articleRule" :model="article" :label-width="80" label-position="left">
            <Row>
                <Col span="24">
                <Form-item prop="title" label="文章标题">
                    <Input v-model="article.title" size="large" placeholder="请输入文章标题"/>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <Form-item prop="categoriesArray" label="分类">
                    <Select v-model="article.categoriesArray" multiple filterable>
                        <Option v-for="item in categories" :value="item.name" :key="item.name">{{ item.name }}
                        </Option>
                    </Select>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <Form-item prop="tagsArray" label="标签">
                    <Select v-model="article.tagsArray" multiple filterable>
                        <Option v-for="item in tags" :value="item.value" :key="item.name">{{ item.name }}
                        </Option>
                    </Select>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <Form-item prop="path" label="访问路径">
                    <Input v-model="article.path" size="default" placeholder="请输入文章访问路径"/>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <Form-item prop="content">
                    <mavon-editor style="margin-top: 20px;position: static;" v-model="article.content"/>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="5" style="margin-left: 80px;">
                <Form-item prop="allowComment" label="开启评论">
                    <iSwitch v-model="article.allowComment" size="large">
                        <span slot="open">允许</span>
                        <span slot="close">禁止</span>
                    </iSwitch>
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item prop="allowPing" label="允许Ping">
                    <iSwitch v-model="article.allowPing" size="large">
                        <span slot="open">允许</span>
                        <span slot="close">禁止</span>
                    </iSwitch>
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item prop="allowFeed" label="允许订阅">
                    <iSwitch v-model="article.allowFeed" size="large">
                        <span slot="open">允许</span>
                        <span slot="close">禁止</span>
                    </iSwitch>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <Form-item>
                    <Button type="ghost" @click="goBack()">《 返回</Button>
                    <Button type="default" @click="clearAll('articleForm')">全部清空</Button>
                    <Button type="warning" v-if="article.status!='audit'" @click="handleSubmit('draft','articleForm')"
                            style="margin-left: 15px">
                        保存为草稿
                    </Button>
                    <Button type="primary" v-if="article.status!='audit'" @click="handleSubmit('audit','articleForm')"
                            style="margin-left: 15px">
                        提交审核
                    </Button>
                </Form-item>
                </Col>
            </Row>
        </Form>
    </div>

</template>
<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import {mavonEditor} from 'mavon-editor';
    import Cookies from 'js-cookie';
    import 'mavon-editor/dist/css/index.css';

    export default {
        data() {
            return {
                article: {
                    id: '',
                    title: '',
                    cover: '',
                    path: '',
                    type: '',
                    status: '',
                    authorId: '',
                    tags: '',
                    tagsArray: [],
                    categories: '',
                    categoriesArray: [],
                    hits: '',
                    commentsNum: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                },
                categories: [],
                tags: [],
                articleRule: {
                    title: [
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    categoriesArray: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个分类', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个分类', trigger: 'change'}
                    ],
                    tagsArray: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个标签', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入文章正文', trigger: 'blur'},
                        {type: 'string', min: 5, message: '正文不能少于5字', trigger: 'blur'}
                    ]
                }
            }
        },//data
        components: {
            mavonEditor
        },
        mounted() {
            const vue = this;
            var id = this.$route.params.id;
            this.articlePreview(id);
            this.categoryList();
            this.tagList();
        },
        methods: {
            articlePreview(id) {
                var self = this;
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    console.log(res.data)
                    var article = res.data;
                    var tags = article.tags.split(",");
                    var categories = article.categories.split(",");
                    article.tagsArray = tags;
                    article.categoriesArray = categories;
                    console.log(article);
                    this.article = article;
//                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//                        next({ ...to }) // hack方法 确保addRoutes已完成
//                    })

                }).catch(() => {
                    console.log("请求文章列表失败");
                })
            },
            categoryList() {
                store.dispatch('CategoryList', {token: null}).then(res => { // 拉取user_info
                    var cates = res.data;
                    this.categories = cates;

                }).catch(() => {
                    console.log("请求分类列表失败");
                })
            },
            tagList() {
                store.dispatch('TagList', {token: null}).then(res => { // 拉取user_info
                    var tags = res.data;
                    this.tags = tags;

                }).catch(() => {
                    console.log("请求标签列表失败");
                })
            },
            goBack() {
                var pageNum = this.$route.query.pageNum;
                var pageSize = this.$route.query.pageSize;
                this.$router.push({
                    path: '/blog/article/manage',
                    query: {pageNum: pageNum, pageSize: pageSize}
                });
            },
            handleSubmit(status, refName) {
                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        var userId = Cookies.get("USER-ID");

                        this.article.status = status;
                        this.article.categories = this.article.categoriesArray.join(",");
                        this.article.tags = this.article.tagsArray.join(",");
                        this.article.authorId = userId;

                        var msg = status == 'audit' ? '提交审核' : '保存草稿';
                        if (!this.article.id) {
                            this.article.id = null;

                            store.dispatch('ArticlePublish', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success(msg + '成功!');
                                    this.$router.push({path: '/blog/article/manage'});
                                } else {
                                    this.$Message.error(msg + '失败!');
                                }
                            }).catch(() => {
                                this.$Message.success('提交失败!');
                            })
                        } else {
                            store.dispatch('ArticleEdit', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success(msg + '成功!');
                                    this.$router.push({path: '/blog/article/manage'});
                                } else {
                                    this.$Message.error(msg + '失败!');
                                }
                            }).catch(() => {
                                this.$Message.success('提交失败!');
                            })
                        }
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();
            },
            handleAdd() {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove(index) {
                this.formDynamic.items.splice(index, 1);
            },
        }

    }
</script>
<style scoped>

</style>


