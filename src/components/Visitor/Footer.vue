<template>
    <footer class="app-footer" id="app-footer" style="padding-top: 50px;position: relative">
        <div class="my-qrcode">
        </div>
        <div class="links">
            <Row>
                <Col span="4" class="foot-separator">
                <Avatar shape="square" style="height:150px;width:150px;"
                        src="/static/img/qrcode/alipay_qrcode_2.png"></Avatar>
                <p style="margin-left: 5px;margin-top: 10px;font-size: 12px;">打开<span
                        style="color:yellow;font-size: 12px;">【微信】</span>扫码加为好友</p>
                <div style="padding-top: 5px;">
                    <img style="width:20px;"
                         src="/static/img/beian.png"/>
                    <span style="padding-top: 5px;">川公网安备</span>
                </div>
                <div>&copy; 2018
                    <span class="float-right"> <a href="http://www.mofaxue.com">zhuxiaolong</a>&nbsp;版权所有</span>
                </div>
                </Col>
                <Col span="3" offset="1">
                <p>前端技术栈</p>
                <ul>
                    <li><a href="https://vuejs.org" target="_blank">Vue JS</a></li>
                    <li><a href="https://vuex.vuejs.org/zh-cn/" target="_blank">Vuex</a></li>
                    <li><a href="http://element.eleme.io/#/zh-CN/component/installation" target="_blank">Element-UI</a>
                    </li>
                    <li><a href="https://www.iviewui.com/docs/guide/install">Iview UI</a></li>
                    <li><a href="https://developer.qiniu.com/kodo/sdk/1289/nodejs" target="_blank">七牛NodeJS SDK</a></li>
                    <li><a href="https://developer.qiniu.com/kodo/sdk/1283/javascript"
                           target="_blank">七牛JavaScript SDK</a></li>
                    <li><a href="http://iconfont.cn/" target="_blank">阿里巴巴Iconfont</a></li>
                </ul>
                </Col>

                <Col span="3">
                <p>后端技术栈</p>
                <ul>
                    <li><a href="https://www.nginx.cn/doc/" target="_blank">Nginx中文文档</a></li>
                    <li><a href="https://maven.apache.org/" target="_blank">Maven 3.5.3</a></li>
                    <li><a href="https://projects.spring.io/spring-boot/" target="_blank">Spring Boot</a></li>
                    <li><a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#aop"
                           target="_blank">Spring Aop</a></li>
                    <li><a href="https://docs.spring.io/spring-framework/docs/1.2.x/reference/mail.html"
                           target="_blank">Spring Mail</a>
                    </li>
                    <li><a href="http://www.mybatis.org/mybatis-3/zh/index.html" target="_blank">Mybatis 3</a></li>
                    <li><a href="https://dev.mysql.com/doc/" target="_blank">MySQL 5</a>
                    <li><a href="https://redis.io/documentation" target="_blank">Redis</a>
                    </li>
                    <li>
                        <a href="http://www.quartz-scheduler.org/documentation/quartz-2.x/quick-start.html">Quartz Scheduler</a>
                    </li>
                    <li>
                        <a href="https://developer.qiniu.com/kodo/sdk/1239/java"
                           target="_blank">
                            七牛Java SDK
                        </a>
                    </li>
                    <li>
                        <a href="https://common-buy.aliyun.com/?spm=5176.sms-account.1001.1.23001cbeLwmCYY&&commodityCode=newdysmsbag#/buy"
                           target="_blank">
                            阿里云短信
                        </a>
                    </li>

                </ul>
                </Col>

                <Col span="3">
                <p>开源项目</p>
                <ul>
                    <li><a href="https://projects.spring.io/spring-cloud/" target="_blank">Spring Cloud</a></li>
                    <li><a href="https://docs.docker.com/get-started/#test-docker-version" target="_blank">Docker</a>
                    </li>
                    <li><a href="https://kubernetes.io/docs/home/" target="_blank">Kubernates</a></li>
                    <li><a href="http://www.rabbitmq.com/getstarted.html" target="_blank">RabbitMQ</a></li>
                    <li><a href="http://lucene.apache.org/solr/guide/7_2/solr-tutorial.html" target="_blank">Solr</a>
                    </li>
                    <li><a href="http://dubbo.apache.org/" target="_blank">Dubbo</a></li>
                    <li><a href="http://zookeeper.apache.org/doc/r3.4.11/zookeeperStarted.html" target="_blank">Zoo Keeper</a>
                    </li>
                    <li><a href="http://elasticjob.io/docs/elastic-job-cloud/00-overview/intro/" target="_blank">Elastic Job</a>
                    </li>
                    <li><a href="https://jenkins.io/">Jenkins</a></li>
                </ul>
                </Col>

                <Col span="3">
                <p>社区推荐</p>
                <ul>
                    <li><a href="http://www.apache.org/" target="_blank">Apache官网</a></li>
                    <li><a href="http://www.apache.org/" target="_blank">Github</a></li>
                    <li><a href="http://www.apache.org/" target="_blank">SegmentFault</a></li>
                    <li><a href="http://www.apache.org/" target="_blank">StackOverflow</a></li>
                    <li><a href="https://www.csdn.net/" target="_blank">CSDN</a></li>
                    <li><a href="https://yq.aliyun.com/" target="_blank">云栖社区</a></li>
                </ul>
                </Col>
                <Col span="3">
                <p>面试集锦</p>
                <ul>
                    <li><a href="#" target="_blank">Spring框架原理</a></li>
                    <li><a href="#" target="_blank">JDK集合</a></li>
                    <li><a href="#" target="_blank">HashMap、List、Set</a></li>
                    <li><a href="#" target="_blank">JVM原理及调优</a></li>
                    <li><a href="#" target="_blank">高并发</a></li>
                    <li><a href="#" target="_blank">分布式</a></li>
                    <li><a href="#" target="_blank">多线程（安全及加锁）</a></li>
                    <li><a href="#" target="_blank">Linux</a></li>
                    <li><a href="#" target="_blank">数据库</a></li>
                    <li><a href="#" target="_blank">持久层框架</a></li>
                    <li><a href="#" target="_blank">设计模式</a></li>
                    <li><a href="#" target="_blank">事务</a></li>
                </ul>
                </Col>
            </Row>
        </div>
        <div>

        </div>
    </footer>
</template>
<script>
    export default {
        name: 'footer'
    }
</script>
<style type="text/css" scoped>
    .foot-separator {
        min-height: 300px;
        border-right: #889195 1px solid;
    }

    .links {
        padding-left: 100px;
        margin-top: 100px;
        margin-bottom: 50px;
    }

    .app-footer {
        background: #303848;
        margin-left: 0px;
        color: #adaeb3;
        font-family: "Helvetica Neue", Helvetica, "Microsoft Sans Serif", Arial, sans-serif;
        line-height: 2;
    }

    .app-footer p {
        font-size: 0.85em;
        color: white;
    }

    .app-footer a {
        color: #adaeb3;
        min-height: 40px;
        font-size: 14px;
    }

    .app-footer li {
        list-style-type: none;
    }

    .app-footer a:hover {
        color: yellow;
    }

</style>
