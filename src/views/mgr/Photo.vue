<template>
    <div class="animated fadeIn" style="margin-left: 10px;">
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


                <Timeline>
                    <TimelineItem v-for="img in pageInfo.list" :key="img.id">
                        <p style="font-size: 14px;font-weight: bold;"><span style="color: #8cc5ff">创建时间:</span>{{img.gmtCreate|formatDate}}
                        </p>

                        <div style="padding-top: 10px;">
                            <img :src="img.domain+img.key+'?imageMogr2/auto-orient'" height="30%" width="30%"
                                 style="border: #a2e6f8 8px solid"/>
                        </div>
                        <div style="padding-top: 10px;">
                            <a title="点击在地图上查看拍摄地点" @click="openMapModal(img)">
                                <Icon type="location" size="20" color="red"></Icon>
                                {{img.address}},{{img.longitudeRef}}{{img.longitude}},{{img.latitudeRef}}{{img.latitude}}
                            </a>
                        </div>
                        <div style="padding-top: 10px;">
                            <Icon type="iphone" size="20" color="blue"></Icon>
                            {{img.make}}&nbsp;{{img.model}}
                        </div>
                        <div style="padding-top: 10px;">
                            <Button type="primary" size="small" @click="openPhotoModal(img)">修改</Button>
                            <Button type="error" size="small" @click="deletePhoto(img)">删除</Button>
                            <Button type="info" size="small">
                                <a :href="img.domain+img.key" target="_blank" style="color: white">大图</a>
                            </Button>
                        </div>
                    </TimelineItem>
                    <TimelineItem>
                        <div v-if="pageInfo.total > pageInfo.pageSize"
                             style="text-align: left;position: relative;margin-top: -8px;margin-left: 10px;">
                            <p @click="loadMorePhotos()" style="border: none;cursor: pointer;">
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
        <Modal v-model="showPhotoModal" width="800" :maskClosable="false"
               style="position: relative" :styles="{top: '20px'}">
            <div slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-pulse-strong" size="20"></Icon>
                <span style="font-size:14px;">修正照片</span>
            </div>
            <Form ref="photoForm" :model="photo" :label-width="80">
                <Row>
                    <Col span="8">
                        <FormItem label="照片名称" prop="name">
                            <Input v-model="photo.name" type="text" placeholder="请输入照片名称">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <Form-item prop="albumId" label="相册">
                            <Select v-model="photo.albumId" filterable clearable>
                                <Option v-for="item in albumList" :value="item.id" :key="item.id">{{
                                    item.name }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item prop="locked" label="是否公开">
                            <Select v-model="photo.locked" filterable clearable>
                                <Option v-for="item in lockedTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item prop="cover" label="设为封面">
                            <Select v-model="photo.cover" filterable clearable>
                                <Option v-for="item in coverTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <FormItem label="文件格式" prop="type">
                            <div>{{photo.type}}</div>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="照片大小" prop="size">
                            <div>{{photo.size|filterPhotoSize}}</div>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="访问链接">
                            <a :href="photo.domain+photo.key" target="_blank" :title="photo.domain+photo.key">
                                {{photo.domain}}{{photo.key}}
                            </a>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="拍摄信息">
                            <a :href="photo.domain+photo.key+'?exif'" target="_blank"
                               :title="photo.domain+photo.key+'?exif'">
                                {{photo.domain}}{{photo.key}}?exif
                            </a>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="东西经" prop="longitudeRef">
                            <Select v-model="photo.longitudeRef" filterable clearable>
                                <Option v-for="item in longitudeTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="经度" prop="longitude">
                            <Input v-model="photo.longitude" type="text" placeholder="请输入照片经度">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="南北纬" prop="latitudeRef">
                            <Select v-model="photo.latitudeRef" filterable clearable>
                                <Option v-for="item in latitudeTypes" :value="item.name" :key="item.name">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="纬度" prop="latitude">
                            <Input v-model="photo.latitude" type="text" placeholder="请输入照片纬度">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="详细地址">
                            {{photo.address}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div style="position: relative">
                            <Input type="text" v-model="photo.address" style="margin-bottom: 10px;">
                            <span slot="prepend">拍摄地点:</span>
                            <span slot="append"><Icon type="ios-location" color="red" size="20"></Icon></span>
                            </Input>
                            <div id="photo-map-container" style="position: relative"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="手机制造商">
                            {{photo.make}}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="手机型号">
                            {{photo.model}}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="拍摄时间" prop="shootTime">
                            <DatePicker type="datetime" v-model="photo.shootTime"
                                        placeholder="请选择拍摄照片时间">
                            </DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="上传时间">
                            {{photo.gmtCreate|formatDate}}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="编辑时间">
                            {{photo.gmtModified|formatDate}}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="修改时间">
                            {{photo.lastModifiedDate|formatDate}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="描述" prop="description">
                            <Input v-model="photo.description" type="textarea"
                                   placeholder="请输入相册的描述信息" :rows="6">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align: left">
                <Row>
                    <Col style="margin-left: 80px">
                        <Button type="ghost" @click="showPhotoModal=false">关闭</Button>
                        <Button type="error" @click="editPhoto">保存</Button>
                    </Col>
                </Row>
            </div>

        </Modal>
    </div>
</template>

<script>
    import store from 'store/';
    import {comma2Degree, comma2Dfm, deepCopy, dfm2Degree, formatTime} from 'utils';
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
                locationAddress: '',
                showMapModal: false,
                showPhotoModal: false,
                map: null,
                photoMap: null,
                geocoder: null,
                photoGeocoder: null,
                marker: null,
                photoMarker: null,
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
                coverTypes: [
                    {name: true, value: '是'},
                    {name: false, value: '否'}
                ],
                longitudeTypes: [
                    {name: 'E', value: '东经'},
                    {name: 'W', value: '西经'}
                ],
                latitudeTypes: [
                    {name: 'N', value: '北纬'},
                    {name: 'S', value: '南纬'}
                ],
                albumList: [],
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
                    unit: null,
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
                    description: null,
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
                        authorId: null,
                        albumId: null
                    },
                    sortMap: {}
                },
            }//return
        },//data
        mounted() {
            const vue = this;
            var albumId = this.$route.params.albumId;
            this.pageQuery.filterMap.albumId = albumId;
            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
            this.getUptoken();
            this.initMap();
            this.initPhotoMap();
            this.getPhotosForPage();
            this.getAlbumList();
        },
        methods: {
            getAlbumList() {
                store.dispatch('GetAlbumList', {authorId: this.loginUser.id}).then(res => {
                    this.albumList = res.data.payload;
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
            openAlbumModal() {
                this.$refs.albumForm.resetFields();
                this.showAlbumModal = true;
            },
            openPhotoMapModal() {
                this.showMapModal = true;
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
            openPhotoModal(photo) {
                var temp = deepCopy(photo);
                //格式化size
                temp.shootTime = new Date(temp.shootTime);
                this.photo = temp;
                this.showPhotoModal = true;
            },
            editPhoto() {
                //需要使用地图选择地点设置地点、经纬度

                store.dispatch("UpdatePhoto", this.photo).then(response => {
                    this.$Notice.success({
                        title: '修改成功',
                        desc: '修改照片:' + this.photo.name,
                        duration: 5
                    });
                    this.getPhotosForPage();
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            },
            deletePhoto(photo) {
                this.$Modal.confirm({
                    title: '删除照片',
                    content: '<p>点击确定1秒后将删除此照片</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch("DeletePhoto", {photoId: photo.id}).then(res => {
                                this.$Notice.success({
                                    title: '删除成功',
                                    desc: '删除照片:' + photo.name,
                                    duration: 5
                                });
                                this.getPhotosForPage();
                            }).catch(err => {
                                this.$Message.error({
                                    content: err.data.error,
                                    duration: 5,
                                    closable: true
                                })
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            uploadPhoto(photo) {
                store.dispatch("UploadPhoto", photo).then(response => {
                    this.$Notice.success({
                        title: photo.name + '上传成功',
                        desc: '访问路径:' + photo.domain + photo.key,
                        duration: 5
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
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
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
            initPhotoMap() {
                var self = this;
                self.photoMap = new AMap.Map('photo-map-container', {
                    resizeEnable: true,
                    zoom: 15,
                    center: [104.55555, 30.4445555]
                });
                AMap.plugin(['AMap.Geocoder', 'AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
                    self.photoGeocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    var toolBar = new AMap.ToolBar();
                    var scale = new AMap.Scale();
                    self.photoMap.addControl(toolBar);
                    self.photoMap.addControl(scale);

                    self.photoMarker = new AMap.Marker({
                        map: self.photoMap,
                        bubble: true
                    });
                    self.photoMap.on('click', function (e) {
                        console.log(e)
                        self.photo.longitude = e.lnglat.O;
                        self.photo.latitude = e.lnglat.P;
                        self.photoMarker.setPosition(e.lnglat);
                        self.photoGeocoder.getAddress(e.lnglat, function (status, result) {
                            if (status == 'complete') {
                                self.photo.address = result.regeocode.formattedAddress;
                            } else {
                                self.photo.address = '无法获取地址';
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
                return formatTime(time, '{y}年{m}月{d}日{h}点{i}分{s}秒');
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

            },
            filterPhotoSize(size) {
                if (size < 1024) {
                    return size + ' 字节';
                } else if (size / 1024 < 1024) {
                    return size / 1024 + ' KB';
                } else if (size / 1024 / 1024 < 1024) {
                    return size / 1024 / 1024 + ' MB';
                }
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

    #photo-map-container {
        width: 768px;
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



