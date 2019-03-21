import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import * as mutations from './mutations';
import Axios from 'axios';

const url = "http://localhost:7777";



export function* taskCreationSaga(){
    while (true) {
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = `UI`;
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupID, ownerID));
        const { res } = yield axios.post(url + '/task/new', {
            task: {
                id:taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "New task"
            }
        });
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        axios.post(url + '/task/update', {
            task:{
                id: task.taskID,
                group: task.groupI,
                name: task.name,
                isComplete: task.isComplete

            }
        })
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const {username, password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = axios.post(url + `/authenticate`, {username,password});
            if (!data) {
                throw new Error();
            }
        } catch (e) {
            console.log("can't authenticate");
            yield put (mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}