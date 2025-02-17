import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { clearSelection } from '../redux/reducers/selectedItemsReducer';

function Flyout() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedNumber = useSelector(
    (state: RootState) => state.selectedItems.selected.length
  );

  function handleClick() {
    dispatch(clearSelection());
  }

  return selectedNumber > 0 ? (
    <div className="flyout">
      <div>{selectedNumber} items are selected</div>
      <div className="theme-button" onClick={handleClick}>
        <div className="theme-button-text">Unselect All</div>
      </div>
    </div>
  ) : null;
}

export default Flyout;
