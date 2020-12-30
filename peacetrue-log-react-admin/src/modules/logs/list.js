import React from 'react';
import {Datagrid, DateField, DateInput, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'模块编码'} source="moduleCode" allowEmpty alwaysOn resettable/>
        <TextInput label={'操作编码'} source="operateCode" allowEmpty alwaysOn resettable/>
        <TextInput label={'操作描述'} source="description" allowEmpty alwaysOn resettable/>
        <TextInput label={'输入参数'} source="input" allowEmpty alwaysOn resettable/>
        <TextInput label={'输出结果'} source="output" allowEmpty alwaysOn resettable/>
        <TextInput label={'异常信息'} source="exception" allowEmpty alwaysOn resettable/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

export const LogList = props => {
    console.info('LogList:', props);
    return (
        <List {...props} filters={<Filters/>}>
            <Datagrid rowClick="show">
                <TextField source="moduleCode"/>
                <TextField source="recordId"/>
                <TextField source="operateCode"/>
                <TextField source="description"/>
                <TextField source="duration"/>
                <TextField source="input"/>
                <TextField source="output"/>
                <TextField source="exception"/>
                <TextField source="creatorId"/>
                <DateField source="createdTime" showTime/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};
