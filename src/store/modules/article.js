import {articleList, articlePreview, articlePublish, articleEdit, articleDelete, articleAudit} from 'api/article';

const article = {
    state: {
        id: '',
        title: '',
        cover: '',
        path: '',
        type: '',
        status: '',
        authorId: '',
        tags: '',
        categories: '',
        hits: '',
        commentsNum: '',
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
                    const data = response.data;
                    commit('SET_ID', data.id);
                    commit('SET_TITLE', data.title);
                    commit('SET_COVER', data.cover);
                    commit('SET_PATH', data.path);
                    commit('SET_TYPE', data.type);
                    commit('SET_STATUS', data.status);
                    commit('SET_AUTHOR_ID', data.authorId);
                    commit('SET_TAGS', data.tags);
                    commit('SET_CATEGORIES', data.categories);
                    commit('SET_HITS', data.hits);
                    commit('SET_COMMENTS_NUM', data.commentsNum);
                    commit('SET_ALLOW_COMMENT', data.allowComment);
                    commit('SET_ALLOW_PING', data.allowPing);
                    commit('SET_ALLOW_FEED', data.allowFeed);
                    commit('SET_CONTENT', data.content);
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
                    const data = response.data;
                    commit('SET_ID', data.id);
                    commit('SET_TITLE', data.title);
                    commit('SET_COVER', data.cover);
                    commit('SET_PATH', data.path);
                    commit('SET_TYPE', data.type);
                    commit('SET_STATUS', data.status);
                    commit('SET_AUTHOR_ID', data.authorId);
                    commit('SET_TAGS', data.tags);
                    commit('SET_CATEGORIES', data.categories);
                    commit('SET_HITS', data.hits);
                    commit('SET_COMMENTS_NUM', data.commentsNum);
                    commit('SET_ALLOW_COMMENT', data.allowComment);
                    commit('SET_ALLOW_PING', data.allowPing);
                    commit('SET_ALLOW_FEED', data.allowFeed);
                    commit('SET_CONTENT', data.content);
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
                    /*const data = response.data;
                    commit('SET_ID', data.id);
                    commit('SET_TITLE', data.title);
                    commit('SET_COVER', data.cover);
                    commit('SET_PATH', data.path);
                    commit('SET_TYPE', data.type);
                    commit('SET_STATUS', data.status);
                    commit('SET_AUTHOR_ID', data.authorId);
                    commit('SET_TAGS', data.tags);
                    commit('SET_CATEGORIES', data.categories);
                    commit('SET_HITS', data.hits);
                    commit('SET_COMMENTS_NUM', data.commentsNum);
                    commit('SET_ALLOW_COMMENT', data.allowComment);
                    commit('SET_ALLOW_PING', data.allowPing);
                    commit('SET_ALLOW_FEED', data.allowFeed);
                    commit('SET_CONTENT', data.content);*/
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 文章审核
        ArticleAudit({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleAudit(params.auditInfo).then(response => {
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
                articleDelete(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }

    }
};

export default article;
