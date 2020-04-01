<template>
    <div>
        <div v-for="(item,index) in addressList" :key="index"
             class="default-window van-hairline--bottom">
            <div class="table">
                <div @click="chooseAddress(item)" class="table-cell">
                    <div class="name-phone"><span>{{item.name}} {{item.phone}}</span></div>
                    <div class="street"><span>{{item.province}}{{item.county}}{{item.city}}{{item.address}}</span></div>
                </div>
                <div @click="openAddressEdit('edit',item.user_address_id)" class="table-cell address-right">
                    <van-icon  style="display: block" size="17" name="edit"/>
                </div>
            </div>
        </div>

        <div class="add-btn-window default-window">
            <van-button @click="openAddressEdit('add')" block type="danger">新增地址</van-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "AddressList",
        data() {
            return {
                type: '',
                addressList: [],//收货地址列表

            }
        },
        mounted() {
            this.type = this.$route.params.type || 'add';
            this.loadAddressList();
        },
        methods: {
            //打开地址编辑页面
            openAddressEdit(type, loadId) {
                if (type == 'add') {
                    this.$router.push({
                        name: 'AddressEdit',
                        params: {
                            type:type,
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'AddressEdit',
                        params: {
                            type:type,
                            loadId: loadId
                        }
                    });
                }
            },
            //加载收货地址
            loadAddressList() {
                this.$api('UserAddress/get_user_address').then(data => {
                    this.addressList = data.user_address_list;
                })
            },
            //选择地址
            chooseAddress(item) {
                if (this.type == 'choose') {
                    this.$store.state.chooseAddress = {
                        name: item.name,
                        phone: item.phone,
                        address: item.province+item.city+item.county+item.address,
                        address_id: item.user_address_id,
                        isChoose: true,
                        pick_type: 1,
                        pick_text:'邮寄'
                    };
                    this.$router.history.go(-1);
                }
            }
        }
    }
</script>

<style scoped>
    .delete-button {
        height: 100%;
    }

    .add-btn-window {
        position: absolute;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .name-phone {
        line-height: 24px;
    }

    .street {
        margin-top: 3px;
        color: #969799;
        font-size: 13px;
        line-height: 18px;
    }

    .address-right {
        width: 50px;
        text-align: right;
    }
</style>
