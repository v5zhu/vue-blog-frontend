<template>
    <div class="animated fadeIn" style="margin-left: 10px;">
        <Row>
            <Col offset="1">
                <Button type="primary" size="large"
                        @click="openAlbumModal" style="padding-bottom:5px;">
                    新建相册
                </Button>
            </Col>
        </Row>

        <Row>
            <Col :md="24">
                <div>
                    <div id="container" style="margin-bottom:10px;">
                        <!--<Button type="primary" size="large" id='pickfiles'
                                @click="qiniu_upload" style="padding-bottom:5px;">上传文件
                        </Button>-->

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

                <Row>
                    <Col span="7" v-for="al in pageInfo.list" :key="al.id" style="margin-top: 20px;">
                        <p style="font-size: 14px;font-weight: bold;"><span style="color: #8cc5ff">创建时间:</span>{{al.gmtCreate|formatDate}}
                        </p>

                        <div style="padding-top: 10px;border: #c3b8f5 5px solid;height:180px;width:300px;">
                            <div v-for="img in al.covers">
                                <img :src="img.domain+img.key+'?imageMogr2/auto-orient'" height="30%" width="30%"
                                     style="float: left;"/>
                            </div>
                        </div>
                        <div style="padding-top: 10px;">
                            <Button type="primary" size="small" @click="modifyAlbum(al)">修改</Button>
                            <Button type="error" size="small" @click="deleteAlbum(al)">删除</Button>
                            <Button type="info" size="small" @click="modifyAlbum(al)">查看</Button>
                        </div>
                    </Col>
                </Row>
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

        <Modal v-model="showAlbumModal" width="633" :maskClosable="false"
               style="position: relative" :styles="{top: '20px'}">
            <div slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-pulse-strong" size="20"></Icon>
                <span style="font-size:14px;">新建相册</span>
            </div>
            <Form ref="albumForm" :rules="albumRule" :model="album" :label-width="80">
                <Row>
                    <Col>
                        <Form-item prop="type" label="相册类型">
                            <Select v-model="album.type" filterable clearable>
                                <Option v-for="item in albumTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col>
                        <Form-item prop="locked" label="是否公开">
                            <Select v-model="album.locked" filterable clearable>
                                <Option v-for="item in lockedTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col>
                        <FormItem label="相册名称" prop="name">
                            <Input v-model="album.name" type="text" placeholder="请输入相册名称">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="描述" prop="description">
                            <Input v-model="album.description" type="textarea"
                                   placeholder="请输入相册的描述信息" :rows="6">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align: left">
                <Row>
                    <Col style="margin-left: 80px">
                        <Button type="primary" @click="addAlbum">保存</Button>
                    </Col>
                </Row>
            </div>

        </Modal>
    </div>
</template>

<script>
    import store from 'store/';
    import {comma2Degree, comma2Dfm, dfm2Degree, formatTime, deepCopy} from 'utils';
    import LocalStorage from "utils/LocalStorage";

    var vue;
    var uploader;

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
                showAlbumModal: false,
                map: null,
                geocoder: null,
                marker: null,
                albumTypes: [
                    {name: 'life', value: '生活'},
                    {name: 'baby', value: '亲子'},
                    {name: 'travel', value: '旅行'},
                    {name: 'other', value: '其他'}
                ],
                lockedTypes: [
                    {name: true, value: '隐藏'},
                    {name: false, value: '公开'}
                ],
                album: {
                    id: null,
                    authorId: null,
                    name: null,
                    type: null,
                    locked: null,
                    photoNumber: 0,
                    description: null,
                    gmtCreate: null,
                    gmtModified: null
                },
                photo: {
                    name: null,
                    type: null,
                    size: 0,
                    originalSize: 0,
                    uploadedSize: 0,
                    domain: null,
                    key: null,
                    longitudeRef: null,
                    longitude: null,
                    latitudeRef: null,
                    latitude: null,
                    address: null,
                    make: null,
                    model: null,
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
                    filterMap: {
                        authorId: null
                    },
                    sortMap: {}
                },
                albumRule: {
                    name: [
                        {required: true, message: '相册名称不能为空', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, type: 'string', message: '选择相册类型', trigger: 'change'}
                    ],
                    locked: [
                        {required: true, type: 'boolean', message: '选择相册是否公开', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '输入相册描述信息', trigger: 'blur'}
                    ]
                },
            }//return
        },//data
        mounted() {
            const vue = this;

            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
            this.getUptoken();
            this.getAlbumsForPage();
            this.initMap();
        },
        methods: {
            openAlbumModal() {
                this.$refs.albumForm.resetFields();
                this.showAlbumModal = true;
            },
            getAlbumsForPage() {
                this.$Loading.start();
                this.pageQuery.filterMap.authorId = this.loginUser.id;
                store.dispatch('GetAlbumsForPage', this.pageQuery).then(res => {
                    this.pageInfo = res.data.payload;
                    this.$Loading.finish();
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                    this.$Loading.error();
                });
            },
            addAlbum() {
                this.$refs.albumForm.validate(valid => {
                    if (valid) {
                        this.$Loading.start();
                        this.album.authorId = this.loginUser.id;
                        store.dispatch('AddAlbum', this.album).then(res => {
                            this.$Loading.finish();
                            this.getAlbumsForPage();
                        }).catch(err => {
                            this.$Message.error({
                                content: err.data.error,
                                duration: 5,
                                closable: true
                            })
                            this.$Loading.error()
                        });
                    } else {
                        this.$Message.error({
                            content: '验证失败',
                            duration: 5,
                            closable: true
                        });
                    }
                })
            },
            modifyAlbum(album) {
                this.album = deepCopy(album);
                this.showAlbumModal = true;
                console.log(JSON.stringify(this.album))
            },
            deleteAlbum(album) {
                store.dispatch("DeleteAlbum", {albumId: album.id}).then(response => {
                    this.$Notice.success({
                        title: '删除成功',
                        desc: '删除相册:' + album.name,
                        duration: 5,
                        closable: true
                    });
                    this.getAlbumsForPage();
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            deletePhoto(photo) {
                store.dispatch("DeletePhoto", {photoId: photo.id}).then(res => {
                    this.$Notice.success({
                        title: '删除成功',
                        desc: '删除照片:' + photo.name,
                        duration: 3
                    });
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            qiniu_upload() {
                uploader.start();
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
            modifyPhoto(photo) {

            },
            uploadPhoto(photo) {
                store.dispatch("UploadPhoto", photo).then(response => {
                    this.$Notice.success({
                        title: photo.name + '上传成功',
                        desc: '访问路径:' + photo.domain + photo.key,
                        duration: 3
                    });
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            loadMorePhotos() {
                this.pageQuery.pageSize += 10;
                this.getPhotosForPage();
            },
            openMapModal(img) {
                this.getAddress(img.longitude, img.latitude);
                this.showMapModal = true;
            },
            getPhotosForPage() {
                this.$Loading.start();
                this.pageQuery.filterMap.authorId = this.loginUser.id;
                store.dispatch('GetPhotosForPage', this.pageQuery).then(res => {
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
            getAddress(longitude, latitude) {
                var self = this;
                if (longitude && latitude) {
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
                    })
                } else {
                    self.locationAddress = '';
                }
                return self.locationAddress;
            }
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
                    // 设置作者
                    vue.photo.authorId = vue.loginUser.id;
                    vue.photo.name = file.name;
                    vue.photo.type = file.type;
                    vue.photo.size = file.size;
                    vue.photo.originalSize = file.origSize;
                    vue.photo.uploadedSize = file.loaded;

                    if (res != null && res.DateTimeOriginal) {
                        var time = res.DateTimeOriginal.val.replace(":", "-");
                        time = time.replace(":", "-");
                        vue.photo.shootTime = new Date(time);
                    }

                    vue.photo.lastModifiedDate = file.lastModifiedDate;
                    vue.photo.domain = Qiniu.domain;
                    vue.photo.key = data.key;
                    vue.photo.exif = res == null ? "" : JSON.stringify(res);
                    //设置照片经纬度、地理位置、制造商、手机型号
                    vue.photo.longitudeRef = filterExif(res, 'GPSLongitudeRef');
                    vue.photo.longitude = comma2Degree(filterExif(res, 'GPSLongitude'));
                    vue.photo.latitudeRef = filterExif(res, 'GPSLatitudeRef');
                    vue.photo.latitude = comma2Degree(filterExif(res, 'GPSLatitude'));
                    vue.photo.make = filterExif(res, 'Make');
                    vue.photo.model = filterExif(res, 'Model');

                    if (vue.photo.longitude && vue.photo.latitude) {
                        var lnglatXY = new AMap.LngLat(vue.photo.longitude, vue.photo.latitude);
                        vue.geocoder.getAddress(lnglatXY, function (status, result) {
                            if (status == 'complete') {
                                vue.photo.address = result.regeocode.formattedAddress;
                                console.log(vue.photo)
                                vue.uploadPhoto(vue.photo);
                            } else {
                                console.log('无法获取地址');
                            }
                        })
                    } else {
                        vue.uploadPhoto(vue.photo);
                    }


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
                'UploadComplete': function (res) {
                    //队列文件处理完毕后，处理相关的事情
                    if (res.files.length > 0) {
                        vue.getPhotosForPage();
                    }
                },
                'Key': function (up, file) {
                }
            }
        });
    }


    function filterExif(exif, property) {
        if (!exif) {
            return null;
        }
        if (!exif[property] || !exif[property].val) {
            return null;
        }
        return exif[property].val;
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



