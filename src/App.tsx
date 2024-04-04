import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./shared/redux/store";

import { Layout } from "./widgets/layout/Layout";
import { SearchWords } from "./widgets/words/search-words/SearchWords";
import { StarredWords } from "./widgets/words/starred-words/StarredWords";
addd err
const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<SearchWords />} />
							<Route path="starred" element={<StarredWords />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
};

export default App;
