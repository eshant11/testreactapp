const redux = require(`redux`);
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//lecture 11 MiddleWare
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
// export
const Buy_Cake = "BUY_CAKE";

// Lecture 9
const Buy_IceCream = "BUY_ICECREAM";

const buyIceCream = () => {
  return {
    type: Buy_IceCream,
    info: "Second redux action",
  };
};

const buyCake = () => {
  return {
    type: Buy_Cake,
    info: "First redux action",
  };
};

// export default buyCake;

// Reducers (previousState, action)=> newState

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case Buy_Cake:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
// Lecture 9

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case Buy_IceCream:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// store

// Combined Reducer

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger)); // pass here a middleware
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {}); // no need of console);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
