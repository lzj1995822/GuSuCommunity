<template>
    <div id="allmap"></div>
</template>

<script>
    export default {
        name: "GISmap",
        methods: {
            initMap() {
                // 百度地图API功能
                var map = new BMap.Map("allmap");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(119.175002,31.951788), 14);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]}));
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                let markers = [];
                this.$http('post','/identity/projectInfo/list').then(
                    data => {
                        data.forEach( item => {
                            let marker = new BMap.Marker(new BMap.Point(item.longitude, item.latitude)); // 创建点
                            markers.push(marker);
                        })
                    }
                );
                console.log(markers);
                //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
                let markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
                console.log(markerClusterer)
            },
        },
        mounted() {
            this.initMap();
        }
    }
</script>

<style scoped>
#allmap {
    width: 100%;
    height: 610px;
}
</style>
