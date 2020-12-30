import React from 'react';
import {Create, maxLength, minValue, NumberInput, required, SimpleForm, TextInput} from 'react-admin';

export const LogCreate = (props) => {
    console.info('LogCreate:', props);
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="moduleCode" validate={[required(), maxLength(63)]}/>
                <NumberInput source="recordId" validate={[minValue(0)]} min={0}/>
                <TextInput source="operateCode" validate={[required(), maxLength(63)]}/>
                <TextInput source="description" validate={[required(), maxLength(255)]}/>
                <NumberInput source="duration" validate={[required(), minValue(0)]} min={0}/>
                <TextInput source="input" validate={[maxLength(2046)]}/>
                <TextInput source="output" validate={[maxLength(2046)]}/>
                <TextInput source="exception" validate={[maxLength(1022)]}/>
            </SimpleForm>
        </Create>
    );
};
