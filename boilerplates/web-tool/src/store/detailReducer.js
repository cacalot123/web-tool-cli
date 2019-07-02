const initialState = {
  count: 3,
  commonVar: '123456'
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        count: state.count + action.number
      };
    case 'DECREASE':
      return {
        count: state.count - action.count2
      };
    default:
      return initialState;
  }
};

export default detailReducer;
