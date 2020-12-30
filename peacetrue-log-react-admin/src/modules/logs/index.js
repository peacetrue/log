import React from "react";
import {Resource} from "react-admin";

import {LogList} from './list';
import {LogCreate} from './create';
import {LogEdit} from './edit';
import {LogShow} from './show';

export const Log = {list: LogList, create: LogCreate, edit: LogEdit, show: LogShow};
const LogResource = <Resource name="logs" {...Log} />;
export default LogResource;
