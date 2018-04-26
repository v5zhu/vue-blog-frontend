import {
    articleDelete,
    articleDetail,
    articleEdit,
    articleList,
    articlePreview,
    articlePublish,
    articles,
    updateStatistics
} from 'api/blog/article';

const article = {
    state: {
        articleAuthor: null,
        articleArchives: [],
        articleCategories: [],
        articleTags: []
    },

    mutations: {
        SET_ARTICLE_AUTHOR: (state, author) => {
            state.articleAuthor = author;
        },
        SET_ARTICLE_ARCHIVES: (state, archives) => {
            state.articleArchives = archives;
        },
        SET_ARTICLE_CATEGORIES: (state, categories) => {
            state.articleCategories = categories;
        },
        SET_ARTICLE_TAGS: (state, tags) => {
            state.articleTags = tags;
        }
    },

    actions: {
        // 获取文章列表
        ArticleList({commit, state}, data) {
            return new Promise((resolve, reject) => {
                articleList(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取文章列表
        Articles({commit, state}, data) {
            return new Promise((resolve, reject) => {
                articles(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 文章预览
        ArticlePreview({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articlePreview(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 文章详情
        ArticleDetail({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleDetail(params.path).then(response => {
                    commit("SET_ARTICLE_AUTHOR", response.data.payload.author);

                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 文章发布
        ArticlePublish({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articlePublish(params.article).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 文章发布
        ArticleEdit({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleEdit(params.article).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 文章删除
        ArticleDelete({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleDelete(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 更新文章统计信息
        UpdateStatistics({commit, state}, data) {
            return new Promise((resolve, reject) => {
                updateStatistics(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }

    }
};

export default article;
