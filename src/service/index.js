const request = async (api, options) => {
	return await fetch(api, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		...options
	})
		.then((res) => res.json())
		.catch((err) => console.error('error:' + err));
};

export async function getCarouselList(carouselId) {
	return await request(`/api/carousel/list/${carouselId}`, {
		method: 'GET'
	});
}

export async function addCarouselItem(id, item) {
	return await request(`/api/carousel/${id}/add`, {
		method: 'POST',
        body: JSON.stringify(item)
	});
}

export async function updateCarouselItem(id, item) {
	return await request(`/api/carousel/update/${id}`, {
		method: 'PUT',
        body: JSON.stringify(item)
	});
}

export async function deleteCarouselItem(id) {
	return await request(`/api/carousel/delete/${id}`, {
		method: 'DELETE',
	});
}
