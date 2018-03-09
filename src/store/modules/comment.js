import {articleComments, commitComment} from 'api/comment';

const comment = {
    state: {
        id: '',
        articleId: '',
        author: {},
        authorId: '',
        ownerId: '',
        email: '',
        siteUrl: '',
        ip: '',
        agent: '',
        content: '',
        type: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_ARTICLE_ID: (state, articleId) => {
            state.articleId = articleId;
        },
        SET_AUTHOR: (state, author) => {
            state.author = author;
        },
        SET_AUTHOR_ID: (state, authorId) => {
            state.authorId = authorId;
        },
        SET_OWNER_ID: (state, ownerId) => {
            state.ownerId = ownerId;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_SITE_URL: (state, siteUrl) => {
            state.siteUrl = siteUrl;
        },
        SET_IP: (state, ip) => {
            state.ip = ip;
        },
        SET_AGENT: (state, agent) => {
            state.agent = agent;
        },
        SET_CONTENT: (state, content) => {
            state.content = content;
        },
        SET_TYPE: (state, type) => {
            state.type = type;
        }
    },

    actions: {
        // 获取文章评论列表
        ArticleComments({commit, state}, params) {
            return new Promise((resolve, reject) => {
                articleComments(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        CommitComment({commit, state}, data) {
            return new Promise((resolve, reject) => {
                commitComment(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default comment;
