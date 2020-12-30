export const logMessages = {
    resources: {
        "logs": {
            name: '日志表',
            fields: {
                'id': '主键',
                'moduleCode': '模块编码',
                'recordId': '记录主键',
                'operateCode': '操作编码',
                'description': '操作描述',
                'duration': '耗时(毫秒)',
                'input': '输入参数',
                'output': '输出结果',
                'exception': '异常信息',
                'creatorId': '创建者主键',
                'createdTime': '创建时间',
            },
        }
    }
}

//['id','moduleCode','recordId','operateCode','description','duration','input','output','exception','creatorId','createdTime',]
//['主键','模块编码','记录主键','操作编码','操作描述','耗时(毫秒)','输入参数','输出结果','异常信息','创建者主键','创建时间',]

export default logMessages;
