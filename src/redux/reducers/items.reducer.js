const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default itemsReducer;

// {description: 'test items', image_url:'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png' , user_id: '1'}