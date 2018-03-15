<template>
    <div>
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>赞赏</span>
        </p>
        <div style="text-align:center">
            <Form ref="awardForm" :model="user" :label-width="120" label-position="right">
                <Row style="padding-left: 20px;">
                    <Col span="14">
                    <Form-item style="margin-left: 60px;" prop="name" label="金额:(RMB)"
                               label-position="top">
                        <i-circle
                                :size="100"
                                :trail-width="5"
                                :stroke-width="6"
                                :percent="6"
                                stroke-linecap="square"
                                stroke-color="red">
                            <div class="demo-i-circle-custom">
                            </div>
                        </i-circle>
                    </Form-item>

                    </Col>
                    <Col span="24">
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="error" size="large" :loading="false"
            >赞赏
            </Button>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'header',
        props: [],
        data() {
            return {
                user: {
                    id: '',
                    loginName: '',
                    password: '',
                    email: '',
                    homeUrl: '',

                }
            }
        },
        components: {},
        methods: {

        }
    }
</script>

<style type="text/css" scoped>

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
