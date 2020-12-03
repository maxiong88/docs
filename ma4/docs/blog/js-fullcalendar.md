---
title: 'fullcalendar日历插件v4'
description: '学习笔记-https://fullcalendar.io/'
time: '2020-10-27'
prev: ''
next: ''
imgPIc: '../assets/img/fullcalendar.png'
---

新版与v4版本api是有所不同，建议查看官方文档，[看这里](https://fullcalendar.io)

+ 获取API：`this.$refs[name].getApi()`
+ 全屏展示，可以动态设置高度，使用API`updateSize()`更新
+ EVENT REQUESTING 中
    - 属性：startParam，endParam，timeZoneParam，lazyFetching
    - 事件：loading


组件

```vue
<template>
    <a-card class="jm-leri-right-card-box" :bordered="false">
        <a-spin :indicator="indicator" :spinning="spinning">
            <div style="position:absolute;left:0;top:0;">
                <a-date-picker @change="onChange" />
            </div>
            <FullCalendar
                class='demo-app-calendar'
                ref="fullCalendar"
                :locale="zhLocale"
                :header="{
                    left: '', // prev,next today
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }"
                :buttonText="{
                    today:    '今天',
                    month:    '月',
                    week:     '周',
                    day:      '日',
                }"
                :plugins="calendarPlugins"
                :eventLimit="true"
                @loading="loadingCallback"
                :handleWindowResize="false"
                eventLimitText="more"
                :height="heightY"
                :events="eventsCallback"
                @eventClick="handleEventClick"
                />
            </a-spin>
    </a-card>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import {axios,cancelToken} from '@/utils/request'
import { mixin } from '@/utils/mixin.js'
// 测试数据
import moment from 'moment'
const CancelToken = cancelToken;
let cancel;
export default {
    data(){
        return{
            zhLocale,
            calendarPlugins: [ // plugins must be defined in the JS
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin // needed for dateClick
            ],
            calendarWeekends: true,
            getApi:{},
            spinning:false,
            indicator:<a-icon type="loading" style="font-size: 24px" spin />
        }
    },
    mixins: [mixin],
    props:{
        heightY:{
            default:500
        },
        selecto:{
            default:[]
        }
    },
    watch:{
        heightY:{
            handler(n,o){
                console.log(n,o,'heightY')
                this.getApi.updateSize && this.getApi.updateSize()
            },
            immediate:true,
            deep:true
        },
        selecto:{
            handler(n,o){
                console.log(n,o,'selecto')
                this.getApi.refetchEvents && this.getApi.refetchEvents()
            },
            immediate:true,
            deep:true
        },
        primaryColor:{
            handler(n,o){
                console.log(n,o,'primaryColor')
                setTimeout(()=>{
                    // "fc-prev-button","fc-next-button",,"fc-today-button"
                    ["fc-dayGridMonth-button","fc-timeGridWeek-button","fc-timeGridDay-button"].forEach(it => {
                        document.querySelector(`.${it}`).style.backgroundColor = n
                        document.querySelector(`.${it}`).style.borderColor = n
                    })
                },500)
            },
            immediate:true,
        }
    },
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    mounted(){
        this.$nextTick(()=>{
            this.getApi = this.$refs.fullCalendar.getApi();
        })
    },
    methods:{
        onChange(date, dateString){
            this.getApi.gotoDate && this.getApi.gotoDate(dateString)
        },
        handleEventClick(event){
            this.$emit("onHandleEventClick",event)
        },
        loadingCallback(bol){
            if(bol){
                this.spinning = true
            }else{
                this.spinning = false
            }
        },
        eventsCallback(info, successCallback, failureCallback){
            if(cancel){
                cancel.cancel();
            }
            cancel = CancelToken.source();
            axios.get('https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/api/exchangePoint',{params:{
                selecto:this.selecto,
                start: info.start.valueOf(),
                end: info.end.valueOf()
            },cancelToken: cancel.token
            }).then(res=>{
                cancel = null;
                if (!res.success) {
                    failureCallback(res.message);
                } else {
                    successCallback(
                        res.result.map(function(eventEl) {
                            return {
                                id: eventEl.id,
                                title: eventEl.title,
                                start: eventEl.start,
                                end: eventEl.end
                            }
                        })
                    )
                }
                
            }).catch(e=>{
                failureCallback(e,'eeeee');
            })
        }
    }
}
</script>
<style lang="less">
    
</style>
```