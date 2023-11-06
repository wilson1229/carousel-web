import React, { useState, useEffect } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
	useRouteError,
	isRouteErrorResponse
} from 'react-router-dom';
import './App.css';

import Layout from './pages/Layout';
import Carousel from './pages/Carousel';
import Manage from './pages/Manage';


/* use carouselId: 1 as a default carousel id */
window.defaultCarouselId = 1;

function RootBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <div>This page doesn't exist!</div>;
		}

		if (error.status === 401) {
			return <div>You aren't authorized to see this</div>;
		}

		if (error.status === 503) {
			return <div>Looks like our API is down</div>;
		}

		if (error.status === 418) {
			return <div>🫖</div>;
		}
	}

	return <div>Something went wrong</div>;
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />} path='/' errorElement={<RootBoundary />}>
			<Route path='/' element={<Carousel />} />
			<Route path='/manage/:carouselId' element={<Manage />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
