import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { clearSelection } from '../redux/reducers/selectedItemsReducer';
import csvCreate from '../scripts/csvCreate';

function Flyout() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedGifs
  );
  const selectedNumber = selectedItems.length;
  function handleClick() {
    dispatch(clearSelection());
  }

  const downloadCSV = () => {
    const csvContent = csvCreate(selectedItems);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedItems.length}_gifs.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return selectedNumber > 0 ? (
    <div className="flyout">
      <div>{selectedNumber} items are selected</div>
      <div className="flyout-button" onClick={handleClick}>
        <div className="flyout-button-text">Unselect All</div>
      </div>
      <div className="flyout-button" onClick={downloadCSV}>
        <div className="flyout-button-text">Download</div>
      </div>
    </div>
  ) : null;
}

export default Flyout;
