<template>
    <section>
        <div id="allmap"></div>
    </section>

</template>

<script>
    export default {
        name: "HomeMap",
        data() {
            return {
                map: {},
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
            }, 200)
        },
        beforeDestroy() {
            document.getElementsByClassName('app-main')[0].style.paddingBottom = '30px';
        }

    }
</script>

<style>
    #allmap {
        width: 100%;
        height: 100%;
    }
</style>
