const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: []
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = "UNDO";
const REDO = "REDO";

export default function counter( state = initialState, action ) {
  switch ( action.type ) {
    case INCREMENT:
      return {
        currentValue: state.currentValue + action.amount, 
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      };
    case DECREMENT:
      return {
        currentValue: state.currentValue - action.amount,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      };
    case UNDO:
      return {
        currentValue: state.previousValues[ 0 ],
        futureValues: [ state.currentValue, ...state.futureValues ],
        previousValues: state.previousValues.slice( 1, state.previousValues.length )
      };
    case REDO:
      return {
        currentValue: state.futureValues[ 0 ],
        futureValues: state.futureValues.slice( 1, state.futureValues.length ),
        previousValues: [ state.currentValue, ...state.previousValues ]
      };
    default:
      return state;
  }
}

export function increment( amount ) {
  return { amount, type: INCREMENT };
}

export function decrement( amount ) {
  return { amount, type: DECREMENT };
}

export function undo() {
  return { type: UNDO };
}

export function redo() {
  return { type: REDO };
}