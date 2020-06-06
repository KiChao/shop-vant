<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    body {
        font-size: 14px;
        background-color: #FFFFFF;
        box-sizing: border-box;
        word-break: break-all;
        line-height: 1.5;
        font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu
    }

    .white-bg {
        background-color: #FFFFFF;
    }

    .block {
        display: block;
    }

    .blank {
        width: 100%;
        height: 8px;
        background-color: #f2f2f2;
    }

    .image {
        width: 100%;
        display: block
    }

    .table {
        width: 100%;
        display: table;
        box-sizing: border-box;
    }

    .table-cell {
        display: table-cell;
        vertical-align: middle;
    }

    .font-12 {
        font-size: 12px;
    }

    .font-13 {
        font-size: 13px;
    }

    .font-red {
        color: #ee0a24;
    }

    .van-dialog__confirm, .van-dialog__confirm:active {
        color: #ee0a24 !important;
    }

    .default-window {
        padding: 10px;
    }

    .text-right {
        text-align: right;
    }

    .text-center {
        text-align: center;
    }

    .font-gary {
        color: #888888;
    }
    .flex {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .place {
        place-content: space-between;
    }
</style>
