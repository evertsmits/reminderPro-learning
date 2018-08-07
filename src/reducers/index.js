import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from "../constants";
import { bake_cookie, read_cookie } from 'sfcookies';
import moment from 'moment';

const reminder = (action) => {
    let { text, dueDate } = action; //omdat action.text en action.dueDate
    let today = checkDate(dueDate);
    return {
        id: Math.random(),
        text,
        dueDate,
        today
    }
};

const checkDate = (dueDate) => {
    let now = moment();
    let dueDateMoment = moment(new Date(dueDate));
    return now.diff(dueDateMoment) < 0;
}

const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders
};


const reminders = (state = [], action) => { //state is dus hier reminders. Je kan het ook state noemen dat zou beter zijn dus let state ipv let reminders en const state ipv const reminders
    let reminders = null;
    state = read_cookie('reminders');
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie('reminders', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            bake_cookie('reminders', reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie('reminders', reminders);
            return reminders;
        default:
            return state;
    }

};

export default reminders;