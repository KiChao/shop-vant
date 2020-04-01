<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="formData.name"
                clearable
                label="收货人"
                placeholder="收货人的真实姓名"
                type="text"
            />
            <van-field
                v-model="formData.phone"
                clearable
                label="手机号码"
                placeholder="收货人的手机号码"
                type="tel"
            />
            <van-field
                :value="`${formData.province} ${formData.city} ${formData.county}`"
                clearable
                label="选择区域"
                placeholder="省/市/县"
                type="text"
                readonly
                @click="chooseArea()"
            />
            <van-field
                v-model="formData.street"
                rows="2"
                autosize
                label="详细街道"
                type="textarea"
                maxlength="100"
                placeholder="详细街道地址，门牌号"
                show-word-limit
            />
        </van-cell-group>
        <div class="default-window">
            <van-button :loading="btnStatus" @click="saveAddress" type="danger" round block>保存地址</van-button>
        </div>
        <div class="default-window">
            <van-button v-if="type=='edit'" @click="delAddress" round block>删除地址</van-button>
        </div>

        <!--        省份选择面板-->
        <van-popup
            v-model="showArea"
            :close-on-click-overlay="false"
            position="bottom"
            :style="{ height: '50%' }"
        >
            <van-row style="height: 100%">
                <van-col span="8" style="height: 100%">
                    <div class="area-item">
                        <div @click="chooseProvince(province.id,province.name)" v-for="province in provinceArray"
                             :key="province.id" class="default-window"><span>{{province.name}}</span>
                        </div>
                    </div>
                </van-col>
                <van-col span="8" style="height: 100%">
                    <div class="area-item">
                        <div @click="chooseCity(city.id,city.name)" v-for="city in cityArray" :key="city.id"
                             class="default-window"><span>{{city.name}}</span></div>
                    </div>
                </van-col>
                <van-col span="8" style="height: 100%">
                    <div class="area-item">
                        <div @click="chooseCounty(county.id,county.name)" v-for="county in countyArray" :key="county.id"
                             class="default-window"><span>{{county.name}}</span></div>
                    </div>
                </van-col>
            </van-row>
        </van-popup>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                //编辑类型
                type: this.$route.params.type || 'add',
                //地址信息表单
                formData: {
                    name: '',
                    phone: '',
                    city_id: '',
                    province_id: '',
                    county_id: '',
                    street: '',
                    province: '省',
                    city: '市',
                    county: '县',
                },

                //省份选择面板
                province: '省',
                city: '市',
                county: '县',
                provinceArray: [],
                cityArray: [],
                countyArray: [],
                showArea: false,

                btnStatus: false,
            }
        },
        mounted() {
            this.judge();
            this.loadCity(0, 0);
        },
        methods: {
            //判断是新增地址还是编辑地址
            judge() {
                if (this.type == 'edit') {
                    let params = {
                        user_address_id: this.$route.params.loadId,
                    };
                    this.$api('UserAddress/detail', params).then(data => {
                        console.log(data);
                        this.formData = data.user_address;
                        this.formData.street = this.formData.address;
                    })
                }
            },
            //加载省市县
            loadCity(parent, level) {
                let params = {
                    parent_id: parent
                };
                this.$api('Public/load_city', params).then(data => {
                    let list = data.area_list;
                    switch (level) {
                        case 0:
                            this.provinceArray = list;
                            break;
                        case 1:
                            this.cityArray = list;
                            break;
                        case 2:
                            this.countyArray = list;
                            break;
                    }
                });
            },
            //选择省份
            chooseProvince(provinceId, provinceName) {
                this.formData.province_id = provinceId;
                this.loadCity(provinceId, 1);
                this.countyArray = [];
                this.formData.province = provinceName;
                this.formData.city = '市';
                this.formData.county = '县';
            },

            //选择城市
            chooseCity(cityId, cityName) {
                this.formData.city_id = cityId;
                this.loadCity(cityId, 2);
                this.formData.city = cityName;
            },
            //选择县区
            chooseCounty(CountyId, countyName) {
                this.formData.county_id = CountyId;
                this.showArea = false;
                this.formData.county = countyName;
            },
            //保存收货地址
            saveAddress() {
                this.$dialog.confirm({
                    message: '是否保存该地址？'
                }).then(() => {
                    this.btnStatus = true;
                    this.$api('UserAddress/add', this.formData).then(data => {
                        this.$toast.success('保存成功');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    });
                }).catch(() => {

                });
            },
            //删除收货地址
            delAddress() {
                this.$dialog.confirm({
                    message: '是否删除该地址？'
                }).then(() => {
                    let params = {
                        user_address_id: this.$route.params.loadId
                    };
                    this.$api('UserAddress/delete', params).then(data => {
                        this.$toast.success('删除成功');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    });
                }).catch(() => {

                });
            },
            chooseArea() {
                //显示地区选择框
                this.showArea = true;
            }
        }
    }
</script>

<style scoped>
    .area-item {
        width: 100%;
        height: 100%;
        overflow: auto;
        text-align: center;
    }
</style>
