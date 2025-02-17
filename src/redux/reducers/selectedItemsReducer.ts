import { Gif } from '../../types';

const initialState: { selected: string[]; selectedGifs: Gif[] } = {
  selected: [],
  selectedGifs: [],
};

const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';

export function selectedItemsReducer(
  state = initialState,
  action: { type: string; payload?: Gif }
) {
  switch (action.type) {
    case TOGGLE_SELECTION:
      if (action.payload != undefined)
        return {
          ...state,
          selected: state.selected.includes(action.payload.id)
            ? state.selected.filter(
                (id) => action.payload && id !== action.payload.id
              )
            : [...state.selected, action.payload.id],
          selectedGifs: state.selected.includes(action.payload.id)
            ? state.selectedGifs.filter(
                (gif) => action.payload && gif.id !== action.payload.id
              )
            : [...state.selectedGifs, action.payload],
        };
      return state;
    case CLEAR_SELECTION:
      return { ...state, selected: [] };
    default:
      return state;
  }
}

export const toggleSelection = (gif: Gif) => ({
  type: TOGGLE_SELECTION,
  payload: gif,
});

export const clearSelection = () => ({
  type: CLEAR_SELECTION,
});

export default selectedItemsReducer;
