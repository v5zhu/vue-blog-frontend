<template>
    <div class="animated fadeIn">


        <Row>
            <Col :md="24">
                <div>
                    <div id="container" style="margin-bottom:10px;">
                        <Button type="primary" size="large" icon="ios-cloud-upload-outline" id='pickfiles'
                                @click="qiniu_upload" style="padding-bottom:5px;">上传文件
                        </Button>

                        <Progress :percent="progresscount" :status="progresstatus"
                                  style="width:90%;vertical-align:middle"
                                  v-if="progresshow">
                            <Icon type="checkmark-circled" v-if="progresscount==100"></Icon>
                            <span v-if="progresscount===100">上传成功</span>
                            <Icon type="close-circled" v-if="progresstatus==='wrong'"></Icon>
                            <span v-if="progresstatus==='wrong'">上传失败</span>
                            <span style="position:absolute;left:50%;top:-5px;"
                                  v-if="progresscount!==0&&progresscount!=100">{{progressspeed}}</span>
                        </Progress>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="24" offset="1">
                <p style="font-size: 16px;font-weight: bolder;">时间与生命的旅行</p>

                <Timeline>
                    <TimelineItem v-for="img in pageInfo.list" :key="img.id">
                        <p style="font-size: 14px;font-weight: bold;"><span style="color: #8cc5ff">拍摄时间:</span>{{img.shootTime|formatDate}}
                        </p>

                        <div style="padding-top: 10px;">
                            <img :src="img.domain+img.key+'?imageMogr2/auto-orient'" height="30%" width="30%"
                                 style="border: #a2e6f8 8px solid"/>
                        </div>
                        <a style="margin-top: 10px;" @click="openMapModal(img)" title="点击在地图中查看拍摄地理位置">
                            <Icon type="ios-location" color="red" size="20"></Icon>
                            {{img.exif|filterLatitude}}, {{img.exif|filterLongitude}}
                        </a>
                        <div style="padding-top: 10px;">
                            <Row>
                                <Col span="3">
                                    <Icon type="iphone" color="blue" size="20"></Icon>
                                    {{img.exif|filterPhone}}
                                </Col>
                                <Col span="3">
                                    光圈:{{img.exif|filterFnumber}}
                                </Col>
                                <Col span="3">
                                    焦距:{{img.exif|filterFocalLength}}
                                </Col>
                            </Row>

                        </div>
                        <div style="padding-top: 10px;">
                            <Button type="primary" size="small" @click="modifyImage(img)">修改</Button>
                            <Button type="error" size="small" @click="modifyImage(img)">删除</Button>
                            <Button type="info" size="small" @click="modifyImage(img)">大图</Button>
                        </div>
                    </TimelineItem>
                    <TimelineItem>
                        <div v-if="pageInfo.total > pageInfo.pageSize"
                             style="text-align: left;position: relative;margin-top: -8px;margin-left: 10px;">
                            <p @click="loadMoreImages()" style="border: none;cursor: pointer;">
                                <Icon type="ios-more-outline" size="32"></Icon>
                                <Icon type="ios-more-outline" size="32"></Icon>
                            </p>
                        </div>
                        <div style="text-align: left;position: relative;" v-if="pageInfo.pageSize>=pageInfo.total">
                            全部加载完成
                        </div>
                    </TimelineItem>
                </Timeline>
            </Col>
        </Row>
        <Modal v-model="showMapModal" width="633" :maskClosable="false"
               style="position: relative" :styles="{top: '20px'}">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-pulse-strong" size="20"></Icon>
                <span style="font-size:14px;">图片位置</span>
            </p>
            <div style="position: relative">
                <Input type="text" v-model="locationAddress" style="margin-bottom: 10px;">
                    <span slot="prepend">拍摄地点:</span>
                    <span slot="append"><Icon type="ios-location" color="red" size="20"></Icon></span>
                </Input>
                <div id="map-container" style="position: relative"></div>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" size="small" @click="showMapModal=false">关闭</Button>
            </div>

        </Modal>
    </div>
</template>

<script>
    import store from 'store/';
    import {Dfm2Degree, formatTime} from 'utils';
    import LocalStorage from "utils/LocalStorage";

    var vue;
    var uploader;

    function qiniuInit(vue) {

        uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式，依次退化
            browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
            uptoken_func: function () {    // 在需要获取uptoken时，该方法会被调用
                return vue.uptoken;
            },
            get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
            // downtoken_url: '/downtoken',
            // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
            unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
            save_key: false,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
            domain: 'http://ooc5yp8fk.bkt.clouddn.com/',     // bucket域名，下载资源时用到，必需
            container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
            max_file_size: '1024mb',             // 最大文件体积限制
            flash_swf_url: 'static/bower_components/plupload/js/Moxie.swf',  //引入flash，相对路径
            max_retries: 0,                     // 上传失败最大重试次数
            dragdrop: true,                     // 开启可拖曳上传
            drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '10mb',                  // 分块上传时，每块的体积
            auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
            multi_selection: true,
            filters: {
                max_file_size: '1000mb',
                prevent_duplicates: false,
                // Specify what files to browse for
                mime_types: [
                    {title: "Video files", extensions: "mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                    {title: "Image files", extensions: "jpg,png,jpeg"}, // 限定jpg,gif,png后缀上传
                ]
            },
            init: {
                'FilesAdded': function (up, files) {

                    plupload.each(files, function (file) {
                        vue.progresshow = true;
                        vue.progresscount = 0;
                        vue.progresstatus = "active";
                    });
                },
                'BeforeUpload': function (up, file) {

                },
                'UploadProgress': function (up, file) {
                    vue.progresscount += 10;
                    vue.progressspeed = "1.5 Mb/s";

                },
                'FileUploaded': function (up, file, response) {
                    vue.progresscount = 100;


                    //在这里封装图片信息并保存到后台
                    var data = JSON.parse(response);
                    var res = null;
                    try {
                        res = Qiniu.exif(data.key);
                    } catch (err) {
                        console.error(err)
                    }
                    vue.$Notice.success({title: file.name + '上传成功'});
                    vue.image.name = file.name;
                    vue.image.type = file.type;
                    vue.image.size = file.size;
                    vue.image.originalSize = file.origSize;
                    vue.image.uploadedSize = file.loaded;

                    if (res != null && res.DateTimeOriginal) {
                        var time = res.DateTimeOriginal.val.replace(":", "-");
                        time = time.replace(":", "-");
                        vue.image.shootTime = new Date(time);
                    }

                    vue.image.lastModifiedDate = file.lastModifiedDate;
                    vue.image.domain = Qiniu.domain;
                    vue.image.key = data.key;
                    vue.image.exif = res == null ? "" : JSON.stringify(res);
                    vue.uploadImage(vue.image);

                },
                'Error': function (up, err, errTip) {
                    //上传出错时，处理相关的事情
                    vue.progresstatus = "wrong";
                    vue.$Message.error({
                        content: errTip,
                        duration: 5,
                        closable: true
                    })

                },
                'UploadComplete': function () {
                    //队列文件处理完毕后，处理相关的事情
                    vue.getImagesForPage();
                },
                'Key': function (up, file) {
                }
            }
        });
    }

    function filterLatitude(exif, isShowRef) {
        if (!exif) {
            return '未知';
        }
        var exifObj = JSON.parse(exif);
        if (!exifObj.GPSLatitudeRef || !exifObj.GPSLatitude) {
            return '未知';
        }
        if (exifObj.GPSLatitudeRef.val && exifObj.GPSLatitude.val) {
            if (isShowRef) {
                if (exifObj.GPSLatitudeRef.val == 'N') {
                    return '北纬' + Dfm2Degree(exifObj.GPSLatitude.val.replace(",", "°").replace(",", "′") + "″");
                } else if (exifObj.GPSLatitudeRef.val == 'S') {
                    return '南纬' + Dfm2Degree(exifObj.GPSLatitude.val.replace(",", "°").replace(",", "′") + "″");
                }
            } else {
                return Dfm2Degree(exifObj.GPSLatitude.val.replace(",", "°").replace(",", "′") + "″");
            }
            return '未知';
        }
        return '未知';
    }

    function filterLongitude(exif, isShowRef) {
        if (!exif) {
            return '未知';
        }
        var exifObj = JSON.parse(exif);
        if (!exifObj.GPSLongitudeRef || !exifObj.GPSLongitude) {
            return '未知';
        }
        if (exifObj.GPSLongitudeRef.val && exifObj.GPSLongitude.val) {
            if (isShowRef) {
                if (exifObj.GPSLongitudeRef.val == 'E') {
                    return '东经' + Dfm2Degree(exifObj.GPSLongitude.val.replace(",", "°").replace(",", "′") + "″");
                } else if (exifObj.GPSLongitudeRef.val == 'S') {
                    return '西经' + Dfm2Degree(exifObj.GPSLongitude.val.replace(",", "°").replace(",", "′") + "″");
                }
            } else {
                return Dfm2Degree(exifObj.GPSLongitude.val.replace(",", "°").replace(",", "′") + "″");
            }
            return '未知';
        }
        return '未知';
    }

    function filterPhone(exif) {
        if (!exif) {
            return '未知';
        }
        var exifObj = JSON.parse(exif);
        if (!exifObj.Make || !exifObj.Model) {
            return '未知';
        }
        if (exifObj.Make.val && exifObj.Model.val) {
            return exifObj.Make.val + ' ' + exifObj.Model.val;
        }
        return '未知';
    }

    function filterFnumber(exif) {
        if (!exif) {
            return '未知';
        }
        var exifObj = JSON.parse(exif);
        if (!exifObj.FNumber) {
            return '未知';
        }
        return exifObj.FNumber.val;
    }

    function filterFocalLength(exif) {
        if (!exif) {
            return '未知';
        }
        var exifObj = JSON.parse(exif);
        if (!exifObj.FocalLength) {
            return '未知';
        }
        return exifObj.FocalLength.val;
    }

    export default {

        name: 'buttons',
        data() {
            return {
                loginUser: null,
                uptoken: '',
                progresshow: false,
                geocoder: undefined,
                locationAddress: '',
                showMapModal: false,
                map: null,
                geocoder: null,
                marker: null,
                image: {
                    name: null,
                    type: null,
                    size: 0,
                    originalSize: 0,
                    uploadedSize: 0,
                    domain: null,
                    key: null,
                    shootTime: null,
                    lastModifiedDate: null,
                    gmtCreate: null,
                    gmtModified: null
                },
                pageInfo: {
                    isFirstPage: undefined,
                    isLastPage: undefined,
                    pageNum: 1,
                    pageSize: 10,
                    pages: undefined,
                    total: undefined,
                    list: [],
                    prePage: undefined,
                    nextPage: undefined
                },
                pageQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterMap: {},
                    sortMap: {}
                },
            }//return
        },//data
        methods: {
            remove(index) {
                this.video_list.splice(index, 1);
            },
            qiniu_upload() {
                uploader.start();
            },
            setInitPage(page) {

                this.page_video_list = [];
                this.pageindex = page;
                let video_list = this.video_list;
                for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {


                    if (i < video_list.length) {

                        this.page_video_list.push(this.video_list[i]);

                    }
                }
            },
            exportData(type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据',
                        columns: this.columns7,
                        data: this.video_list
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                }
            },
            getUptoken() {
                store.dispatch("GetUptoken", {bucket: 'touch6'}).then(response => {
                    var uptoken = response.data.payload;
                    this.uptoken = uptoken;
                    qiniuInit(this);//初始化七牛数据

                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            modifyImage(image) {

            },
            uploadImage(image) {
                store.dispatch("UploadImage", image).then(response => {

                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            loadMoreImages() {
                this.pageQuery.pageSize += 10;
                this.getImagesForPage();
            },
            openMapModal(img) {
                this.getAddress(img);
                this.showMapModal = true;
            },
            getImagesForPage() {
                this.$Loading.start();
                this.pageQuery.filterMap.authorId = this.loginUser.id;
                store.dispatch('GetImagesForPage', this.pageQuery).then(res => {
                    this.pageInfo = res.data.payload;
                    this.$Loading.finish();
                }).catch(err => {
                    this.$Message.error(err);
                    this.$Loading.error()
                });
            },
            initMap() {
                var self = this;
                self.map = new AMap.Map('map-container', {
                    resizeEnable: true,
                    zoom: 15,
                    center: [104.55555, 30.4445555]
                });
                AMap.plugin(['AMap.Geocoder', 'AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
                    self.geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    var toolBar = new AMap.ToolBar();
                    var scale = new AMap.Scale();
                    self.map.addControl(toolBar);
                    self.map.addControl(scale);

                    self.marker = new AMap.Marker({
                        map: self.map,
                        bubble: true
                    });
                    self.map.on('click', function (e) {
                        self.marker.setPosition(e.lnglat);
                        self.geocoder.getAddress(e.lnglat, function (status, result) {
                            if (status == 'complete') {
                                self.locationAddress = result.regeocode.formattedAddress
                            } else {
                                self.locationAddress = '无法获取地址'
                            }
                        })
                    })
                });
            },
            getAddress(img) {
                var self = this;
                var longitude = filterLongitude(img.exif, false);
                var latitude = filterLatitude(img.exif, false);
                longitude = parseFloat(longitude);
                latitude = parseFloat(latitude);

                self.map.setCenter([longitude, latitude]);
                // self.marker.setMap(self.map);
                var lnglatXY = new AMap.LngLat(longitude, latitude);
                self.marker.setPosition(lnglatXY);
                self.geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status == 'complete') {
                        self.locationAddress = result.regeocode.formattedAddress
                    } else {
                        self.locationAddress = '无法获取地址'
                    }
                    return self.locationAddress;
                })
            }
        },
        mounted() {
            const vue = this;

            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
            this.getUptoken();
            this.getImagesForPage();
            this.initMap();
        },
        filters: {
            formatDate(time) {
                return formatTime(time);
            },
            filterLatitude(exif) {
                return filterLatitude(exif, true);
            },
            filterLongitude(exif) {
                return filterLongitude(exif, true);
            },
            filterPhone(exif) {
                return filterPhone(exif);
            },
            filterFnumber(exif) {
                return filterFnumber(exif);
            },
            filterFocalLength(exif) {
                return filterFocalLength(exif);
            },
            filterAddress(exif) {

            }
        }
    }


</script>


<style type="text/css" scoped>
    #map-container {
        width: 600px;
        height: 400px;
    }

    .ivu-tag-dot {
        border: none !important;
    }

    tr.ivu-table-row-hover td .ivu-tag-dot {
        background-color: #ebf7ff !important;
    }

    .demo-i-circle-custom h1 {
        color: #3f414d;
        font-size: 10px;
        font-weight: normal;
    }

    .demo-i-circle-custom p {
        color: #657180;
        font-size: 8px;
        margin: 5px 0 2px;
    }

    .demo-i-circle-custom span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 10px;
    }

    .demo-i-circle-custom span :before {
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -20px;
    }

    ;
    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }

    /*wz-btn wz-btn-primary wz-btn-small wz-btn-loading*/

    .ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading ) {
        padding: 2px 10px !important;
    }

    td.ivu-table-expanded-cell {
        background-color: white !important;

    }
</style>



