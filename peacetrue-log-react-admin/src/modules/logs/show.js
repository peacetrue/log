import React from 'react';
import {DateField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const LogShow = (props) => {
    console.info('LogShow:', props);
    return (
        <Show {...props}>
            <SimpleShowLayout>
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
            </SimpleShowLayout>
        </Show>
    );
};
