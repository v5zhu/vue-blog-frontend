<template>
    <aside class="aside-menu px-4">
        <div class="aside-options">
            <Row>
                <Col>
                <author-right-bar></author-right-bar>
                </Col>
            </Row>
            <Row>
                <Col>
                <archives-right-bar></archives-right-bar>
                </Col>
            </Row>
            <Row>
                <Col>
                <category-right-bar></category-right-bar>
                </Col>
            </Row>
            <Row>
                <Col>
                <tag-right-bar></tag-right-bar>
                </Col>
            </Row>
        </div>


    </aside>
</template>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import AuthorRightBar from './../Visitor/AuthorRightBar';
    import ArchivesRightBar from './../Visitor/ArchivesRightBar';
    import CategoryRightBar from './../Visitor/CategoryRightBar';
    import TagRightBar from './../Visitor/TagRightBar';

    export default {
        name: 'aside',
        data() {
            return {

            }
        },
        computed: {},
        created() {
        },
        components: {AuthorRightBar, ArchivesRightBar, CategoryRightBar, TagRightBar},
        mounted() {
        },
        methods: {

        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>
<style type="text/css">
    .wz-progress-show-info .wz-progress-outer {
        padding-right: 0px;
        margin-right: 0px;
    }
</style>


<style scoped>
    .text-muted {
        margin-top: 1rem;
        margin-bottom: 1rem;

    }

    .demo-i-circle-custom h1 {
        color: #3f414d;
        font-size: 28px;
        font-weight: normal;
    }

    .demo-i-circle-custom p {
        color: #657180;
        font-size: 14px;
        margin: 10px 0 15px;
    }

    .demo-i-circle-custom span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 14px;
    }

    /*  .demo-i-circle-custom:before{
           content: '';
           display: block;
           width: 80px;
           height: 1px;
           margin: 0 auto;
           background: #e0e3e6;
           position: relative;
           top: 100px;
       };*/
    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }
</style>
