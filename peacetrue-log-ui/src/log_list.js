const {Card, Form, FormItem, Input, Icon, Button, Modal} = require('iview/dist/iview');
const PageTable = require('peacetrue-iview/src/components/page-table');
const Detail = require('peacetrue-iview/src/components/detail');
const VueJsonPretty = require('vue-json-pretty').default;

module.exports = {
    name: 'LogList',
    template: `
    <div class="log-list">
        <template v-if="showCondition">
        <Card >
            <span slot="title">查询条件</span>
            <Form ref="form" :model="params" inline>
                <FormItem prop="moduleCode">
                    <Input type="text" v-model="params.moduleCode" placeholder="模块编码"/>
                </FormItem>
                <FormItem prop="recordId">
                    <Input type="text" v-model="params.recordId" placeholder="记录标识"/>
                </FormItem>
                <FormItem prop="operateCode">
                    <Input type="text" v-model="params.operateCode" placeholder="操作编码"/>
                </FormItem>
                <FormItem prop="description">
                    <Input type="text" v-model="params.description" placeholder="操作描述"/>
                </FormItem>
                <FormItem prop="creatorId">
                    <Input type="text" v-model="params.creatorId" placeholder="创建者"/>
                </FormItem>
                <FormItem prop="createdTime.lowerBound">
                    <Date-Picker type="date" placeholder="创建起始时间" v-model="params.createdTime.lowerBound"></Date-Picker>
                </FormItem>
                <FormItem prop="createdTime.upperBound">
                    <Date-Picker type="date" placeholder="创建结束时间" v-model="params.createdTime.upperBound"></Date-Picker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query(true)">查询</Button>
                    <Button @click="reset">清空</Button>
                </FormItem>
            </Form>
        </Card>
        <br>
        </template>
        <Card>
            <div slot="title">{{listTitle}}</div>
            <PageTable ref="pageTable" :url="url" :columns="columns" v-model="params" :success-format="successFormat"></PageTable>
        </Card>
        <Modal v-model="detail.model" title="日志详情" :footer-hide="true" fullscreen>
            <detail v-if="detail.data" :data="detail.data" :show-close="false">
                <row>
                    <detail-item label="模块编码" name="moduleCode"/>
                    <detail-item label="记录标识" name="recordId"/>
                </row>
                <row>
                    <detail-item label="操作编码" name="operateCode"/>
                    <detail-item label="操作描述" name="description"/>
                    <detail-item label="耗时(秒)">{{detail.data.duration/1000}}</detail-item>
                </row>
                <row>
                    <detail-item label="创建时间" name="createdTime"/>
                    <detail-item label="创建者标识" name="creatorId"/>
                </row>
                <detail-header :size="3">输入参数（最长2046，超过被截断，截断后无法按正常JSON展示）</detail-header>
                <VueJsonPretty :data="detail.data.input" :deep="2"/>
                <detail-header :size="3">输出结果（最长2046，超过被截断，截断后无法按正常JSON展示）</detail-header>
                <VueJsonPretty :data="detail.data.output" :deep="2"/>
                <detail-header :size="3">异常信息（最长1022，超过被截断）</detail-header>
                <div style="line-break: anywhere;word-break: break-word">{{detail.data.exception||'--'}}</div>
            </detail>                        
        </Modal>        
    </div>
    `,
    props: {
        showCondition: {type: Boolean, required: false, default: true},
        listTitle: {type: String, required: false, default: '查询结果'},
        showModule: {type: Boolean, required: false, default: true},
        url: {type: String, required: false, default: '/logs'},
        params: {type: Object, required: false, default() {return {page: 0, size: 10, moduleCode: null, recordId: null, operateCode: null, description: null, creatorId: null, createdTime: {}};}},
        successFormat: {type: Function, required: false, default(data) {return data.data;}},
        failureFormat: {type: Function, required: false, default(data) {return data.data;}},
        columns: {
            type: Array, required: false, default() {
                let columns = [
                    {title: '日志标识', key: 'id', width: 120, sortable: 'custom'},
                    {title: '模块编码', key: 'moduleCode', width: 120},
                    {title: '记录标识', key: 'recordId', width: 120, tooltip: true},
                    {title: '操作编码', key: 'operateCode', width: 120},
                    {title: '操作描述', key: 'description', width: 200, tooltip: true},
                    {title: '耗时(秒)', key: 'duration', width: 150, render(h, r) {return h('span', r.row.duration / 1000)}},
                    {title: '操作状态', width: 150, render: (h, r) => h('span', Boolean(r.row.exception) ? '失败' : '成功')},
                    {title: '异常信息', key: 'exception', tooltip: true},
                    {title: '创建时间', key: 'createdTime', width: 150, sortable: 'custom', tooltip: true, sortType: 'desc'},
                    {title: '操作', width: 100, render: (h, r) => {return this.renderOperate(h, r);}},
                ];
                if (!this.showModule) columns.splice(0, 3);
                return columns;
            }
        },

        // moduleCodeRender: {type: Function, required: false, default(h, row) {return h('span', row.moduleCode)}},
        // recordIdRender: {type: Function, required: false, default(h, row) {return h('span', row.recordId)}},
    },
    data() {
        return {
            detail: {
                model: false,
                data: null
            }
        };
    },
    methods: {
        query(reset) {
            this.$refs.pageTable.query(reset);
        },
        renderOperate(h, r) {
            return h(Button, {props: {type: 'primary', size: 'small'}, on: {click: () => this.openDetail(r.row)}}, '详情');
        },
        openDetail(row) {
            this.detail.model = true;
            let clone = Object.assign({}, row);
            try { clone.input = JSON.parse(row.input);} catch (e) { }
            try { clone.output = JSON.parse(row.output);} catch (e) { }
            this.detail.data = clone;
        },
        reset() {
            this.$refs.form.resetFields();
            return this.query(true);
        },
    },
    components: {
        Card, Form, FormItem, Input, Icon, Button, PageTable, Modal, VueJsonPretty, ...Detail
    },
};

