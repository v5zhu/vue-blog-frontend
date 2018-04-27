<template>
    <div>
        <Form ref="articleForm" :rules="articleRule" :model="article" :label-width="70" label-position="right">
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="typeList" label="类型">
                        <Select v-model="article.type" filterable>
                            <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="22">
                    <Form-item prop="title" label="文章标题">
                        <Input v-model="article.title" size="large" placeholder="请输入文章标题"/>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="categoryIds" label="分类">
                        <Cascader v-model="article.categoryTree" :data="categoryTree" change-on-select
                                  @on-change="changeParent"></Cascader>
                    </Form-item>
                </Col>
                <Col span="2">
                    <Button type="ghost" shape="circle" icon="plus-circled" @click="categoryModel=true">添加分类</Button>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="tags" label="标签">
                        <Select v-model="article.tags" multiple filterable>
                            <Option v-for="item in tags" :value="item.id" :key="item.id">{{ item.name }}
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
                <Col span="22">
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
                        <Button type="warning" @click="handleSubmit('draft','articleForm')"
                                style="margin-left: 15px">
                            保存为草稿
                        </Button>
                        <Button type="primary" @click="handleSubmit('audit','articleForm')"
                                style="margin-left: 15px">
                            提交审核
                        </Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>

        <Modal v-model="categoryModel"
               title="添加分类">
            <Form ref="categoryForm" :model="category" :label-width="60" label-position="right">
                <Row style="padding-left: 50px;">
                    <Col span="16">
                        <Form-item prop="name" label="上级分类">
                            <Cascader v-model="category.upper" :data="categoryTree" change-on-select
                                      @on-change="changeParent"></Cascader>
                        </Form-item>
                    </Col>
                </Row>
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
            <div slot="footer" style="text-align: center">
                <Row>
                    <Col>
                        <div style="text-align: right;">
                            <Button @click="addCategory" type="primary" size="default" :loading="false">保存
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
        <Modal v-model="tagModel"
               title="添加标签"
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
    import LocalStorage from 'utils/LocalStorage';

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
                    tags: [],
                    categoryId: null,
                    hits: '',
                    comments: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: '',
                    categoryTree: []
                },
                category: {
                    id: '',
                    authorId: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parentId: '',
                    upper: []
                },
                tag: {
                    id: '',
                    authorId: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parent: '',
                    articleNumbers: 0
                },
                tags: [],
                categoryTree: [],
                types: [
                    {name: '原创作品', value: 'original'},
                    {name: '转载', value: 'reshipment'},
                    {name: '翻译', value: 'translation'}
                ],
                articleRule: {
                    title: [
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    categoryTree: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个分类', trigger: 'change'}
                    ],
                    tags: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个标签', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入文章正文', trigger: 'blur'},
                        {type: 'string', min: 5, message: '正文不能少于5字', trigger: 'blur'}
                    ]
                },
                categoryModel: false,
                tagModel: false,
                loginUser: {}
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
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
            this.filterCategoryTree(this.loginUser.id);
            this.tagList(this.loginUser.id);

        },
        methods: {
            addCategory() {
                setTimeout(() => {
                    this.category.authorId = this.loginUser.id;
                    var upper = this.category.upper;
                    if (upper && upper.length > 0) {
                        this.category.parentId = upper[upper.length - 1];
                    }
                    store.dispatch('CategoryAdd', this.category).then(res => { // 拉取user_info
                        this.$Message.success('添加分类成功');
                        this.$refs.categoryForm.resetFields();
                        this.filterCategoryTree(this.loginUser.id);
                    }).catch(err => {
                        this.$Message.error({
                            content: err.data.error,
                            duration: 5,
                            closeable: true
                        });
                    })
                }, 1000);
            },
            addTag() {
                setTimeout(() => {
                    this.tag.type = 'tag';
                    this.tag.authorId = this.loginUser.id;
                    store.dispatch('TagAdd', this.tag).then(res => { // 拉取user_info
                        this.$Message.success('添加标签成功');
                        this.$refs.tagForm.resetFields();
                        this.tagList(this.loginUser.id);
                    }).catch(err => {
                        this.$Message.error({
                            content: err.data.error,
                            duration: 5,
                            closeable: true
                        });
                    })

                }, 1000);
            },
            articlePreview(id) {
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data.payload;
                    this.article = article;

                }).catch(() => {
                    console.log("请求文章详情失败");
                })
            },
            tagList(userId) {
                store.dispatch('FilterTagList', {userId: userId}).then(res => { // 拉取user_info
                    var tags = res.data.payload;
                    this.tags = tags;

                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            goBack() {
                this.$router.push({
                    path: '/admin/mgr/blog/article'
                });
            },
            handleSubmit(status, refName) {
                var categoryIds = this.article.categoryTree;
                if (categoryIds && categoryIds.length > 0) {
                    this.article.categoryId = categoryIds[categoryIds.length - 1];
                }

                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        this.article.status = status;
                        this.article.authorId = this.loginUser.id;
                        var msg = status == 'audit' ? '提交审核' : '保存草稿';
                        if (!this.article.id) {
                            this.article.id = null;
                            store.dispatch('ArticlePublish', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                this.$Message.success(msg + '成功!');
                                this.$router.push({path: '/admin/mgr/blog/article'});
                            }).catch(err => {
                                this.$Message.error({
                                    content: err.data.error,
                                    duration: 5,
                                    closable: true
                                });
                            })
                        } else {
                            store.dispatch('ArticleEdit', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                this.$Message.success(msg + '成功!');
                                this.$router.push({path: '/admin/mgr/blog/article'});
                            }).catch(err => {
                                this.$Message.error({
                                    content: err.data.error,
                                    duration: 5,
                                    closable: true
                                });
                            })
                        }
                    } else {
                        this.$Message.error({
                            content: '验证失败',
                            duration: 5,
                            closable: true
                        });
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
            filterCategoryTree(userId) {
                store.dispatch('FilterCategoryTree', {userId: userId}).then(res => {
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
            changeParent(value) {
                if (value && value.length > 0) {

                } else {
                    this.$Message.warning('确定不选择上级分类？');
                }
            }
        }

    }
</script>
<style scoped>

</style>


