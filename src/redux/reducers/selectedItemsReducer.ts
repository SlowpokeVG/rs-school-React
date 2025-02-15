const initialState: { selected: string[] } = {
  selected: [],
};

const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';

export function selectedItemsReducer(
  state = initialState,
  action: { type: string; payload?: string }
) {
  switch (action.type) {
    case TOGGLE_SELECTION:
      if (action.payload)
        return {
          ...state,
          selected: state.selected.includes(action.payload)
            ? state.selected.filter((id) => id !== action.payload)
            : [...state.selected, action.payload],
        };
      else return state;
    case CLEAR_SELECTION:
      return { ...state, selected: [] };
    default:
      return state;
  }
}

export const toggleSelection = (id: string) => ({
  type: TOGGLE_SELECTION,
  payload: id,
});

export const clearSelection = () => ({
  type: CLEAR_SELECTION,
});

export default selectedItemsReducer;
