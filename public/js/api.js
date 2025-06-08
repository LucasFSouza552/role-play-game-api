const API_BASE_URL = 'http://localhost:3000/api';

const api = (token)=> axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	}
})

export async function getRoleChampions(token) {
	try {
		const response = await api(token).get(`/roles?page=1&limit=50`);
		return response.data.roles;
	} catch (error) {
		console.error('Error loading roles:', error);
	}
}

export async function createItem(token, item) {
	try {
		const response = await api(token).post(`/items`, item);
		return response.data;
	} catch (error) {
		console.error('Error creating item:', error);
	}
}

export async function getItems(token) {
	try {
		const response = await api(token).get(`/items?page=1&limit=50`);
		
		return response.data?.items || [];
	} catch (error) {
		console.error('Error loading items:', error);
	}
}

export async function getProfile(token) {
	try {
		const response = await api(token).get(`/user/profile`);

		const profile = response.data.user;
		if(!profile) {
			return null;
		}

		return profile;

	} catch (error) {
		console.error(error.message);
	}
}

export async function createChampion(token, champion) {
	try {
		const response = await api(token).post(`/champions`, champion);
		return response.data;
	} catch (error) {
		console.error('Error creating champion:', error);
	}
}

export async function deleteChampion(token, id) {
	try {
		const response = await api(token).delete(`/champions/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting champion:', error);
	}
}
export async function getChampions(token) {
	try {
		const response = await api(token).get(`/champions?page=1&limit=50`);
		return response.data.champions;
	} catch (error) {
		console.error('Error fetching champions:', error);
		return null;
	}
}
export async function getItemsOfChampion(token, id) {
	try {
		const response = await api(token).get(`/champions/${id}/inventory`);
		return response.data;
	} catch (error) {
		console.error('Error fetching items of champion:', error);
	}
}
export async function getGuilds(token) {
	try {
		const response = await api(token).get(`/guilds?page=1&limit=50`);
		console.log(response.data.guilds);
		return response.data.guilds;
	} catch (error) {
		console.error('Error loading guilds:', error);
	}
}

export async function getShops(token) {
	try {
		const response = await api(token).get(`/shop?page=1&limit=50`);
		return response.data.shops;
	} catch (error) {
		console.error('Error loading shops:', error);
	}
}

export async function deleteItem(token, id) {
	try {
		const response = await api(token).delete(`/items/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting item:', error);
	}
}

export async function getItemsOfShop(token, id) {
	try {
		const response = await api(token).get(`/shop/${id}/inventory`);
		return response.data;
	} catch (error) {
		console.error('Error fetching items of shop:', error);
	}
}

export async function buyItem(token, shopId, championId, itemId, quantity) {
	try {
		const response = await api(token).post(`/shop/${shopId}/purchase`, {
			championId,
			itemId,
			quantity
		});
		return response.data;
	} catch (error) {
		console.error('Error buying item:', error);
		throw error;
	}
}

export async function sellItem(token, shopId, championId, itemId, quantity) {
	try {
		const response = await api(token).post(`/shop/${shopId}/sell`, {
			championId,
			itemId,
			quantity
		});
		return response.data;
	} catch (error) {
		console.error('Error selling item:', error);
		throw error;
	}
}

export async function updateStatusChampion(token, championId, attribute) {
		try {

			const response = await api(token).patch(`/champions/${championId}/status`, {
				...attribute
			})

			return response.data
		} catch (error) {
			console.error('Error updating status champion:', error);
			throw error;
		}
}

export async function deleteShop(token, shopId) {
	try {
		
		const response = await api(token).delete(`/shop/${shopId}`);
		return response.data;

	} catch (error) {
		console.error(`Error deleting shop ${shopId}:`, error);
		throw error;
	}
}