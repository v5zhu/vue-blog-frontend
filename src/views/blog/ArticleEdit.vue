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
                <Col span="12" style="margin-right: 10px;">
                <Form-item prop="categoriesList" label="分类">
                    <Select v-model="article.categoriesList" multiple filterable>
                        <Option v-for="item in categories" :value="item.name" :key="item.name">{{ item.name }}
                        </Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="2">
                <Button type="ghost" shape="circle" icon="plus-circled" @click="categoryModel=true">添加分类</Button>
                </Col>

            </Row>
            <Row>
                <Col span="12" style="margin-right: 10px;">
                <Form-item prop="tagsList" label="标签">
                    <Select v-model="article.tagsList" multiple filterable>
                        <Option v-for="item in tags" :value="item.value" :key="item.name">{{ item.name }}
                        </Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="2">
                <Button type="ghost" shape="circle" icon="plus-circled" @click="tagModel=true">添加标签</Button>
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

        <Modal v-model="categoryModel"
               title="添加分类"
               :loading="true"
               @on-ok="addCategory">
            <Form ref="categoryForm" :model="category" :label-width="60" label-position="right">
                <Row style="padding-left: 50px;">
                    <Col span="16">
                    <Form-item prop="name" label="名称">
                        <Input v-model="category.name" size="default" placeholder="请输入分类名称(必填)"/>
                    </Form-item>
                    </Col>
                </Row>
                <Row style="padding-left: 50px;">
                    <Col span="16">
                    <Form-item prop="description" label="描述">
                        <Input v-model="category.description" type="textarea" :autosize="true"
                               placeholder="请输入分类描述(可不填)"/>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal v-model="tagModel"
               title="添加标签"
               :loading="true"
               @on-ok="addTag">
            <Form ref="tagForm" :model="tag" :label-width="60" label-position="right">
                <Row style="padding-left: 50px;">
                    <Col span="16">
                    <Form-item prop="name" label="名称">
                        <Input v-model="tag.name" size="default" placeholder="请输入标签名称(必填)"/>
                    </Form-item>
                    </Col>
                </Row>
                <Row style="padding-left: 50px;">
                    <Col span="16">
                    <Form-item prop="description" label="描述">
                        <Input v-model="tag.description" type="textarea" :autosize="true"
                               placeholder="请输入标签描述(可不填)"/>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
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
                    tagsList: [],
                    categories: '',
                    categoriesList: [],
                    hits: '',
                    commentsNum: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                },
                category: {
                    id: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parent: ''
                },
                tag: {
                    id: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parent: ''
                },
                categories: [],
                tags: [],
                articleRule: {
                    title: [
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    categoriesList: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个分类', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个分类', trigger: 'change'}
                    ],
                    tagsList: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个标签', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入文章正文', trigger: 'blur'},
                        {type: 'string', min: 5, message: '正文不能少于5字', trigger: 'blur'}
                    ]
                },
                categoryModel: false,
                tagModel: false
            }
        },//data
        components: {
            mavonEditor
        },
        mounted() {
            const vue = this;
            var id = this.$route.params.id;
            if (id) {
                this.articlePreview(id);
            }
            this.categoryList();
            this.tagList();
        },
        methods: {
            addCategory() {
                setTimeout(() => {
                    this.category.type = 'category';
                    store.dispatch('CategoryAdd', this.category).then(res => { // 拉取user_info
                        var resp = res.data;
                        if (resp.success == true) {
                            this.category = {
                                id: '',
                                name: '',
                                value: '',
                                type: '',
                                description: '',
                                sort: '',
                                parent: ''
                            }
                            this.categoryList();
                            this.$Message.success('添加分类成功');
                        } else {
                            this.$Message.error('添加分类失败');
                        }
                    }).catch(() => {
                        this.$Message.error("添加分类异常");
                    })
                    this.categoryModel = false;
                }, 1000);
            },
            addTag() {
                setTimeout(() => {
                    this.tag.type = 'tag';
                    store.dispatch('TagAdd', this.tag).then(res => { // 拉取user_info
                        var resp = res.data;
                        if (resp.success == true) {
                            this.tag = {
                                id: '',
                                name: '',
                                value: '',
                                type: '',
                                description: '',
                                sort: '',
                                parent: ''
                            }
                            this.tagList();
                            this.$Message.success('添加标签成功');
                        } else {
                            this.$Message.error('添加标签失败');
                        }
                    }).catch(() => {
                        this.$Message.error("添加标签异常");
                    })

                    this.tagModel = false;
                }, 1000);
            },
            articlePreview(id) {
                var self = this;
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    console.log(res.data)
                    var article = res.data;
                    var tags = article.tags.split(",");
                    var categories = article.categories.split(",");
                    article.tagsList = tags;
                    article.categoriesList = categories;
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
                var status = this.$route.query.status;
                var title = this.$route.query.title;
                var tags = this.$route.query.tags;
                var categories = this.$route.query.categories;
                var sort = this.$route.query.sort;
                this.$router.push({
                    path: '/blog/article/manage',
                    query: {
                        pageNum: pageNum, pageSize: pageSize, status: status, title: title,
                        tags: tags,
                        categories: categories,
                        sort: sort
                    }
                });
            },
            handleSubmit(status, refName) {
                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        var userId = Cookies.get("USER-ID");

                        this.article.status = status;
                        this.article.categories = this.article.categoriesList.join(",");
                        this.article.tags = this.article.tagsList.join(",");
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


