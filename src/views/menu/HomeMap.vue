<template>
    <section class="homeMap">
        <div id="allmap"></div>
        <div class="popover">
            <el-popover
                v-for="item in popover"
                style="display: block;margin-bottom: 10px"
                :popover-class="{'padding': 0}"
                placement="right"
                trigger="hover">
                <el-button class="popover-btn" :style="{'background': `url(../../../static/img/${item.picName})`}" v-for="subItem in item.children" @click="subItem.handler()"></el-button>
                <el-button class="popover-btn" :style="{'background': `url(../../../static/img/${item.picName})`}" slot="reference"> </el-button>
            </el-popover>
        </div>
        <Search :map="map" class="search"></Search>
    </section>

</template>

<script>
    import mapData from '../data/homeMap';
    import Search from '@/components/MapSearch';
    export default {
        name: "HomeMap",
        data() {
            return {
                map: {},
                popover: mapData.popover
            }
        },
        methods: {
            initMap(){
                // 百度地图API功能
                this.map = new BMap.Map("allmap");    // 创建Map实例
                this.map.centerAndZoom(new BMap.Point(120.591693,31.305786), 11);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                /*this.map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]}));
                this.map.setCurrentCity("苏州");          // 设置地图显示的城市 此项是必须设置的*/
                this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var point = new BMap.Point(120.591693,31.305786);
                var marker = new BMap.Marker(point);  // 创建标注
                this.map.addOverlay(marker);              // 将标注添加到地图中
            }
        },
        mounted() {
            this.initMap();
            let headerHeight = this.$screen() * 156;
            let menuHeight = this.$screen() * 53;
            document.getElementById('allmap').style.height = `${Math.ceil(document.body.clientHeight - headerHeight - menuHeight - 45)}px`;
            setTimeout( () => {
                document.getElementsByClassName('app-main')[0].style.paddingBottom = '0px';
            }, 200);
            document.getElementsByClassName('popover')[0].style.top = `${menuHeight + headerHeight + 60}px`;
            document.getElementsByClassName('search')[0].style.top = `${menuHeight + headerHeight + 60}px`;
        },
        beforeDestroy() {
            document.getElementsByClassName('app-main')[0].style.paddingBottom = '30px';
        },
        components: {
            Search
        }

    }
</script>

<style>
    #allmap {
        width: 100%;
        height: 100%;
    }
    .popover {
        position: absolute;
        left: 25px;
    }
    .popover-btn {
        width: calc(100vw/1920*73);
        height: calc(100vw/1920*74);
        background-size: cover !important;
        border: none !important;
    }
    .el-popover {
        padding: 0 !important;
    }
    .search {
        position: absolute;
        right: 25px;
    }
</style>
