const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SUCCESS':
      if (action.result === [] || action.result === null) return [];
      
      state = action.result;
      return state;
      
   case 'ERROR':
      state = [action.error];
      return state;
      
    default:
      return state
  }
}

export default reducer;

