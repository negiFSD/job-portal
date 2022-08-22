
// here we are setting header and using thunkapi from the function wherever it is used.
const authHeader = (thunkAPI) => {
    return {
      headers: {
             //below we are jwt from usr slice (user.user.slice) >>>here 1st user is slice name 2nd user is user state and token is the key.
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    };
  };
  
  export default authHeader;
  