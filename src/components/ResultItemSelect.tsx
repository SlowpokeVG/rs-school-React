import { CheckboxProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleSelection } from '../redux/slices/selectedItemsSlice';

function ResultItemSelect({ gif }: CheckboxProps) {
  const id = gif.id;
  const dispatch = useDispatch<AppDispatch>();
  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.selected.includes(id)
  );

  const handleChange = () => {
    dispatch(toggleSelection(gif));
  };

  return (
    <div className="results-item-select">
      <label>
        <input
          className="results-item-select-checkbox"
          type="checkbox"
          checked={isSelected}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default ResultItemSelect;
