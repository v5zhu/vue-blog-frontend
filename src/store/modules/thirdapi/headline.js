import {listHeadlines} from 'api/thirdapi/headline';

const headline = {
    actions: {
        // 获取新闻
        ListHeadlines({commit, state}, data) {
            return new Promise((resolve, reject) => {
                listHeadlines(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default headline;
