import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  FETCH_DATA,
  ADD_EMPTY_ROW,
  UPDATE_ROW,
  REMOVE_ROW,
  EDIT_ROW,
  SAVE_ROW,
  CLOSE_NOTIF, ADD_NEW_ITEM
} from '../../actions/actionConstants';

const initialState = {
  dataTable: List([]),
  notifMsg: '',
};

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = keyTemplate.keys();
  const staticKey = {
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  };
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id' && rawKey[i] !== 'edited') {
      staticKey[rawKey[i]] = anchor[i].initialValue;
    }
  }
  // Push another static key
  staticKey.edited = true;

  return Map(staticKey);
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA}`:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('dataTable', items);
      });
    case `${branch}/${ADD_EMPTY_ROW}`:
      return state.withMutations((mutableState) => {
        const raw = state.get('dataTable').last();
        const initial = initialItem(raw, action.anchor);
        mutableState.update('dataTable', dataTable => dataTable.unshift(initial));
      });
    case `${branch}/${ADD_NEW_ITEM}`:
      return state.withMutations((mutableState) => {
        const raw = state.get('dataTable').last();
        const initial = initialItem(raw, action.anchor);
        mutableState.update('dataTable', dataTable => dataTable.unshift(initial));
      });
    case `${branch}/${REMOVE_ROW}`:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        mutableState
          .update('dataTable', dataTable => dataTable.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case `${branch}/${UPDATE_ROW}`:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        const cellTarget = action.event.target.name;
        const newVal = type => {
          if (type === 'checkbox') {
            return action.event.target.checked;
          }
          return action.event.target.value;
        };
        mutableState.update('dataTable', dataTable => dataTable
          .setIn([index, cellTarget], newVal(action.event.target.type))
        );
      });
    case `${branch}/${EDIT_ROW}`:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        mutableState.update('dataTable', dataTable => dataTable
          .setIn([index, 'edited'], true)
        );
      });
    case `${branch}/${SAVE_ROW}`:
      console.log("this is branch", branch);
      console.log("this is SAVE_ROW", SAVE_ROW);
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        console.log("this is the index", index);
        console.log("this is the action", action);
        console.log("this is the action item", action.item._root.entries);
        let entries = action.item._root.entries;
        let finalObject = {};
        for (let i in entries){
          if(entries[i][0] === "date"){
            console.log("this is the date", (entries[i][1].toString()));
          }
          console.log("this is single entry", entries[i]);
          finalObject[entries[i][0]] = entries[i][1]
        }
        console.log("this is finalObject", finalObject);
        mutableState
          .update('dataTable', dataTable => dataTable
            .setIn([index, 'edited'], false)
          )
          .set('notifMsg', notif.saved);
      });
    case `${branch}/${CLOSE_NOTIF}`:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default:
      return state;
  }
}
