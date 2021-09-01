import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import { addToExport, removeFromArray, setArray } from './redux/app-reducer';
import { YMaps, Map, Polygon } from 'react-yandex-maps';
import { ExportCSV } from './ExportCSV';

function App() {
	const inputEl = useRef();

	const [popUpData, setPopUpData] = useState(null);
	const [isVisiblePopup, setIsVisiblePopup] = useState(false);
	const [isVisibleImport, setIsVisibleImport] = useState(true);

	const dispatch = useDispatch();
	const { importArray, isLoaded, exportArray } = useSelector(({ app }) => app);

	const onImportFile = () => {
		readXlsxFile(inputEl.current.files[0]).then(rows => {
			dispatch(setArray(rows));
		});
		setIsVisibleImport(false);
	};

	const onMouseEnter = (index, number, area, zone, coords) => {
		setPopUpData({
			index,
			number,
			area,
			zone,
			coords,
		});
		setIsVisiblePopup(true);
	};

	const onMouseLeave = () => {
		setIsVisiblePopup(false);
	};

	const onAddToExport = (number, area, zone, coords) => {
		const obj = {
			number,
			area,
			zone,
			coords,
		};
		dispatch(addToExport(obj));
	};

	const onRemoveFromArray = index => {
		dispatch(removeFromArray(index));
	};

	return (
		<div className="app">
			{isVisibleImport && (
				<div>
					<input
						ref={inputEl}
						className="visually-hidden"
						type="file"
						id="file"
						onChange={onImportFile}
					/>
					<button className="btn__app">
						<label for="file">Загрузите .xlsx файл</label>
					</button>
				</div>
			)}
			{isLoaded && (
				<YMaps>
					<Map
						className="map"
						defaultState={{
							center: [55.027699226608924, 82.89660746004719],
							zoom: 15,
						}}
					>
						<div>
							{importArray.map((obj, index) => {
								return (
									<Polygon
										key={`${obj}_${index}`}
										className="map__polygon"
										onMouseEnter={() =>
											onMouseEnter(index, obj[0], obj[1], obj[2], obj[3])
										}
										geometry={[JSON.parse('[' + obj[3] + ']')]}
									/>
								);
							})}
							{isVisiblePopup && (
								<div onMouseLeave={() => onMouseLeave()} className="popup">
									<div>Номер: {popUpData.number}</div>
									<div>Площадь: {popUpData.area}</div>
									<div>Зона: {popUpData.zone}</div>
									<button
										className="popup__btn"
										onClick={() =>
											onAddToExport(
												popUpData.number,
												popUpData.area,
												popUpData.zone,
												popUpData.coords
											)
										}
									>
										Оставить объект
									</button>
									<button onClick={() => onRemoveFromArray(popUpData.index)}>
										Удалить объект
									</button>
								</div>
							)}
						</div>
					</Map>
				</YMaps>
			)}
			{exportArray.length > 0 && (
				<ExportCSV csvData={exportArray} fileName={'updated-perspective'} />
			)}
		</div>
	);
}

export default App;
