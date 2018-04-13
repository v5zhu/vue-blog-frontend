import {
    articleList,
    articlePreview,
    articleDetail,
    articlePublish,
    articleEdit,
    articleDelete,
    articles,
    updateStatistics
} from 'api/article';

const article = {
    state: {
        id: '',
        title: '',
        outline: '',
        cover: '',
        path: '',
        type: '',
        status: '',
        authorId: '',
        tags: '',
        categories: '',
        hits: '',
        commentsNum: '',
        likes: '',
        dislikes: '',
        allowComment: true,
        allowPing: true,
        allowFeed: true,
        content: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_TITLE: (state, title) => {
            state.title = title;
        },
        SET_OUTLINE: (state, outline) => {
            state.outline = outline;
        },
        SET_COVER: (state, cover) => {
            state.cover = cover;
        },
        SET_PATH: (state, path) => {
            state.path = path;
        },
        SET_TYPE: (state, type) => {
            state.type = type;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_AUTHOR_ID: (state, authorId) => {
            state.authorId = authorId;
        },
        SET_TAGS: (state, tags) => {
            state.tags = tags;
        },
        SET_CATEGORIES: (state, categories) => {
            state.categories = categories;
        },
        SET_HITS: (state, hits) => {
            state.hits = hits;
        },
        SET_COMMENTS_NUM: (state, commentsNum) => {
            state.commentsNum = commentsNum;
        },
        SET_LIKES: (state, likes) => {
            state.likes = likes;
        },
        SET_DISLIKES: (state, dislikes) => {
            state.dislikes = dislikes;
        },
        SET_ALLOW_COMMENT: (state, allowComment) => {
            state.allowComment = allowComment;
        },
        SET_ALLOW_PING: (state, allowPing) => {
            state.allowPing = allowPing;
        },
        SET_ALLOW_FEED: (state, allowFeed) => {
            state.allowFeed = allowFeed;
        },
        SET_CONTENT: (state, content) => {
            state.content = content;
        }
    },

    actions: {
        // 获取文章列表
        ArticleList({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleList(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取文章列表
        Articles({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articles(params).then(response => {
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
