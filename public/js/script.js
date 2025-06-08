import { setCookieValue, getCookieValue } from "./utils.js";
import {
	getChampions,
	getShops,
	getProfile,
	getRoleChampions,
	getItems,
	createChampion,
	deleteChampion,
	deleteItem,
	createItem,
	buyItem,
	sellItem,
	getItemsOfChampion,
	getItemsOfShop,
	getGuilds,
	updateStatusChampion,
	deleteShop
} from "./api.js";

let API_TOKEN = null;

let roles = [];
const profile = {
	name: null,
	email: null,
	role: null,
	champions: []
}


// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		// Remove active class from all buttons and tabs
		document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
		document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

		// Add active class to clicked button and corresponding tab
		btn.classList.add('active');
		const tabId = btn.getAttribute('data-tab');
		document.getElementById(tabId).classList.add('active');

		// Load data when tab is shown
		if (tabId === 'characters') loadChampions(profile.champions);
		if (tabId === 'items') loadItems();
		if (tabId === 'guilds') loadGuilds();
		if (tabId === 'shops') loadShops();

	});
});

document.getElementById('cancel-character').addEventListener('click', () => {
	document.getElementById('character-form').classList.add('hidden');
	document.getElementById('new-character-form').reset();
});

// Item form toggle
document.getElementById('create-item-btn').addEventListener('click', () => {
	document.getElementById('item-form').classList.remove('hidden');
});

document.getElementById('cancel-item').addEventListener('click', () => {
	document.getElementById('item-form').classList.add('hidden');
	document.getElementById('new-item-form').reset();
});

function getChampionImage(role) {
	const roleImages = {
		'warrior': '/assets/warrior.png',
		'mage': '/assets/mage.png',
		'paladin': '/assets/paladin.png',
		'assassin': '/assets/assassin.png',
		'healer': '/assets/healer.png'
	};
	return roleImages[role] || '/assets/default-champion.png';
}

function championCard(champion) {
	// Encontrar a role do campeão
	const championRole = roles.find((role) => role.id === champion.roleId);
	const maxHp = championRole ? championRole.hp : 100;
	const hpPercent = Math.max(0, Math.min(100, Math.round((champion.hp / maxHp) * 100)));
	return `
		<div class="flex justify-between items-start mb-4">
			<div class="flex items-center space-x-3">
				<img src="${getChampionImage(champion.role)}" alt="${champion.role}" class="w-12 h-12 rounded-full object-cover border-2 border-gray-700">
				<h3 class="text-xl font-semibold">${champion.name}</h3>
			</div>
			<span class="px-3 py-1 bg-gray-700 rounded-full text-sm">Nível ${champion.level}</span>
		</div>
		<div class="mb-4">
			<div class="flex justify-between text-sm mb-1">
				<span>Classe: <span class="font-medium">${champion.role}</span></span>
				<span>${champion.hp}/${maxHp} HP</span>
			</div>
			<div class="health-bar bg-gray-700 rounded-full">
				<div class="health-bar bg-red-500 rounded-full" style="width: ${hpPercent}%"></div>
			</div>
		</div>
		<div class="flex justify-between">
			<button class="delete-character px-3 py-1 bg-red-600 hover:bg-red-500 rounded transition" data-id="${champion.id}">
				<i class="fas fa-trash mr-1"></i>Deletar
			</button>
			<button class="view-character px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded transition" data-id="${champion.id}">
				<i class="fas fa-eye mr-1"></i>Detalhes
			</button>
		</div>
		`;
}

async function showChampionDetails(champion) {
	const inventory = await getItemsOfChampion(API_TOKEN, champion.id);
	const role = roles.find((role) => role.id === champion.roleId);
	const maxHp = role ? role.hp : 100;
	const hpPercent = Math.max(0, Math.min(100, Math.round((champion.hp / maxHp) * 100)));
	const modal = document.createElement('div');
	modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
	modal.innerHTML = `
		<div class="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto custom-scrollbar">
			<div class="flex justify-between items-start mb-6">
				<div class="flex items-center space-x-4">
					<img src="${getChampionImage(champion.role)}" alt="${champion.role}" class="w-20 h-20 rounded-full object-cover border-4 border-gray-700">
					<div>
						<h2 class="text-3xl font-bold text-white mb-2">${champion.name}</h2>
						<div class="flex items-center space-x-4">
							<span class="px-4 py-1 bg-blue-600 rounded-full text-sm font-medium">Nível ${champion.level}</span>
							<span class="px-4 py-1 bg-purple-600 rounded-full text-sm font-medium">${champion.role}</span>
						</div>
					</div>
				</div>
				<button class="close-modal text-gray-400 hover:text-white transition-colors">
					<i class="fas fa-times text-xl"></i>
				</button>
			</div>

			<div class="mb-6">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium text-gray-300">HP</span>
					<span class="text-sm font-medium text-gray-300">${champion.hp}/${maxHp}</span>
				</div>
				<div class="w-full bg-gray-700 rounded-full h-2.5">
					<div class="bg-red-500 h-2.5 rounded-full" style="width: ${hpPercent}%"></div>
				</div>
			</div>

			<div class="mb-6">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium text-gray-300">MP</span>
					<span class="text-sm font-medium text-gray-300">${champion.mp || 0}</span>
				</div>
				<div class="w-full bg-gray-700 rounded-full h-2.5">
					<div class="bg-blue-500 h-2.5 rounded-full" style="width: ${champion.mp || 0}%"></div>
				</div>
			</div>

			<div class="mb-6">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium text-gray-300">EP</span>
					<span class="text-sm font-medium text-gray-300">${champion.ep || 0}</span>
				</div>
				<div class="w-full bg-gray-700 rounded-full h-2.5">
					<div class="bg-green-500 h-2.5 rounded-full" style="width: ${champion.ep || 0}%"></div>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="space-y-4">
	<h3 class="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">Atributos</h3>

				${atributesArea(champion)}

				<div class="space-y-4">
					<h3 class="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">Status</h3>
					<div class="grid grid-cols-2 gap-4">
						<div class="bg-gray-700 p-4 rounded-lg">
							<p class="text-sm text-gray-400 mb-1">Experiência</p>
							<p class="text-xl font-bold text-white">${champion.xp || 0}</p>
						</div>
						<div class="bg-gray-700 p-4 rounded-lg">
							<p class="text-sm text-gray-400 mb-1">Ouro</p>
							<p class="text-xl font-bold text-yellow-400">${champion?.money || 0}</p>
						</div>
						<div class="bg-gray-700 p-4 rounded-lg">
							<p class="text-sm text-gray-400 mb-1">Guilda</p>
							<p class="text-xl font-bold text-white">${champion.guild || 'Nenhuma'}</p>
						</div>
						<div class="bg-gray-700 p-4 rounded-lg">
							<p class="text-sm text-gray-400 mb-1">Inventário</p>
							<p class="text-xl font-bold text-white">${inventory?.itens?.length || 0} itens</p>
						</div>
						<div class="bg-gray-700 p-4 rounded-lg">
							<p class="text-sm text-gray-400 mb-1">Pontos de Habilidade</p>
							<p class="text-xl font-bold text-white" data-sp-value>${champion.sp || 0}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8">
				<div class="flex justify-between items-center mb-4">
					<h3 class="text-xl font-semibold text-gray-300 border-b border-gray-700 pb-2">Inventário</h3>
					<span class="text-sm text-gray-400">Capacidade: ${inventory?.itens?.length || 0}/${inventory?.capacity || 0} slots</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					${inventory && inventory.itens && inventory.itens.length > 0 ?
			inventory.itens.map(item => `
							<div class="bg-gray-700 p-4 rounded-lg">
								<div class="flex justify-between items-start mb-2">
									<h4 class="text-lg font-semibold">${item.name}</h4>
									<span class="text-sm text-yellow-400">${item.price} gold</span>
								</div>
								<div class="flex items-center space-x-2 mb-2">
									<span class="text-sm text-gray-400">Tipo: ${item.type}</span>
									<span class="text-sm text-gray-400">|</span>
									<span class="text-sm text-gray-400">Quantidade: ${item.quantity}</span>
								</div>
								<div class="flex items-center space-x-2 mb-2">
									<span class="text-sm ${getRarityColor(item.rarity)}">${item.rarity}</span>
								</div>
								<p class="text-sm text-gray-300">${item.description || 'Sem descrição'}</p>
							</div>
						`).join('') : ''
		}
					${Array(inventory?.capacity - (inventory?.itens?.length || 0)).fill(0).map(() => `
						<div class="bg-gray-700 p-4 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center h-[200px]">
							<span class="text-gray-500">Slot Vazio</span>
						</div>
					`).join('')}
				</div>
			</div>
		</div>
	`;

	// Add custom scrollbar styles
	const style = document.createElement('style');
	style.textContent = `
		.custom-scrollbar::-webkit-scrollbar {
			width: 8px;
		}
		.custom-scrollbar::-webkit-scrollbar-track {
			background: #1f2937;
			border-radius: 4px;
		}
		.custom-scrollbar::-webkit-scrollbar-thumb {
			background: #4b5563;
			border-radius: 4px;
		}
		.custom-scrollbar::-webkit-scrollbar-thumb:hover {
			background: #6b7280;
		}
	`;
	document.head.appendChild(style);

	document.body.appendChild(modal);

	modal.querySelector('.close-modal').addEventListener('click', () => {
		modal.remove();
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.remove();
		}
	});


	function setupAttributeButtons() {
		document.querySelectorAll('button[data-attribute]').forEach(button => {
			button.addEventListener('click', async () => {
				try {
					const attribute = button.getAttribute('data-attribute');
					const championId = button.getAttribute('data-id');
					const response = await updateStatusChampion(API_TOKEN, championId, { [attribute]: 1 });
				
					const attributeValueP = document.querySelector(`p[data-attvalue="${attribute}"]`);
					attributeValueP.textContent = parseInt(attributeValueP.textContent) + 1;
	
					const skillPointsValue = document.querySelector(`p[data-sp-value]`);
					skillPointsValue.textContent = parseInt(skillPointsValue.textContent) - 1;
				
				} catch (error) {
					console.error(error);
					showAlert('Erro ao atualizar status: ' + (error?.response?.data?.error || error.message), 'warning');
				}
				

			});
		});

		
	}
	setupAttributeButtons();
}

function getRarityColor(rarity) {
	const colors = {
		'Common': 'text-gray-400',
		'Uncommon': 'text-green-400',
		'Rare': 'text-blue-400',
		'Epic': 'text-purple-400',
		'Legendary': 'text-yellow-400'
	};
	return colors[rarity] || 'text-gray-400';
}

function showAlert(message, type = 'error') {
	const alertDiv = document.createElement('div');
	alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-500 translate-x-full`;

	const bgColor = type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-yellow-600' : 'bg-green-600';
	const icon = type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle';

	alertDiv.innerHTML = `
		<div class="flex items-center ${bgColor} text-white px-6 py-4 rounded-lg">
			<i class="fas ${icon} mr-3 text-xl"></i>
			<p class="font-medium">${message}</p>
			<button class="ml-4 text-white hover:text-gray-200 focus:outline-none">
				<i class="fas fa-times"></i>
			</button>
		</div>
	`;

	document.body.appendChild(alertDiv);

	// Animate in
	setTimeout(() => {
		alertDiv.classList.remove('translate-x-full');
	}, 100);

	// Add click event to close button
	alertDiv.querySelector('button').addEventListener('click', () => {
		alertDiv.classList.add('translate-x-full');
		setTimeout(() => {
			alertDiv.remove();
		}, 500);
	});

	// Auto remove after 5 seconds
	setTimeout(() => {
		if (document.body.contains(alertDiv)) {
			alertDiv.classList.add('translate-x-full');
			setTimeout(() => {
				alertDiv.remove();
			}, 500);
		}
	}, 5000);
}

async function loadChampions(champions) {
	try {
		if (!champions) {
			showAlert('Dados inválidos ao carregar campeões');
			return console.error("Invalid Data", champions);
		}

		const charactersList = document.getElementById('characters-list');
		charactersList.innerHTML = '';
		champions?.forEach(champion => {

			champion.role = roles.find((role) => role.id === champion.roleId).name;

			const characterCard = document.createElement('div');
			characterCard.className = 'character-card bg-gray-800 p-6 rounded-lg shadow-lg';

			characterCard.innerHTML = championCard(champion);
			charactersList.appendChild(characterCard);
		});

		// Add event listeners to delete buttons
		document.querySelectorAll('.delete-character').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				const characterId = e.target.closest('button').getAttribute('data-id');
				if (confirm('Are you sure you want to delete this character?')) {
					await deleteCharacter(characterId);
					const champions = await getChampions(API_TOKEN);
					loadChampions(champions);
				}
			});
		});

		// Add event listeners to view details buttons
		document.querySelectorAll('.view-character').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				const characterId = e.target.closest('button').getAttribute('data-id');
				console.log(characterId);
				const champion = champions.find(c => c.id == characterId);
				if (champion) {
					showChampionDetails(champion);
				}
			});
		});

	} catch (error) {
		console.error('Error loading characters:', error);
		showAlert('Erro ao carregar campeões');
	}
}

async function loadItems() {
	try {

		const items = await getItems(API_TOKEN);

		const itemsList = document.getElementById('items-list');
		itemsList.innerHTML = '';
		if(!items || items.length == 0) return;
		items?.forEach(item => {
			const itemCard = document.createElement('div');
			itemCard.className = 'bg-gray-800 p-6 rounded-lg shadow-lg';
			itemCard.innerHTML = `
				<div class="flex justify-between items-start mb-3">
					<h3 class="text-lg font-semibold">${item.name}</h3>
				</div>
				<div class="mb-3">
					<span class="text-sm text-gray-400">Type: ${item.type}</span>
					<span class="mx-2 text-gray-600">|</span>
					<span class="text-sm text-gray-400">Value: ${item.priceMin} | ${item.priceMax} gold</span>
				</div>
				<p class="text-sm text-gray-300 mb-4">${item.description || 'No description available.'}</p>
				<div class="flex justify-between">
					${profile.role === 'admin' ? `
						<button class="delete-item px-3 py-1 bg-red-600 hover:bg-red-500 rounded transition" data-id="${item.id}">
							<i class="fas fa-trash mr-1"></i>Delete
						</button>
					` : ''}
				</div>
			`;
			itemsList.appendChild(itemCard);
		});

		// Add event listeners to delete buttons
		document.querySelectorAll('.delete-item').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				const itemId = e.target.closest('button').getAttribute('data-id');
				if (confirm('Are you sure you want to delete this item?')) {
					await deleteItem(API_TOKEN,itemId);
					loadItems();
				}
			});
		});

	} catch (error) {
		console.error('Error loading items:', error);
		showAlert('Erro ao carregar itens');
	}
}

async function loadShops() {
	try {
		const shops = await getShops(API_TOKEN);

		if (!shops) {
			showAlert('Dados inválidos ao carregar lojas');
			return console.error("Invalid Data", shops)
		}

		const shopsList = document.getElementById('shops-list');
		shopsList.innerHTML = '';
		shopsList.className = 'flex flex-col gap-8';

		// Exibir as lojas em lista, cards maiores
		for (const shop of shops) {
			const shopItems = await getItemsOfShop(API_TOKEN, shop.id);

			const shopCard = document.createElement('div');
			shopCard.className = 'bg-gray-800 p-10 rounded-2xl shadow-2xl mb-10 w-full';
			shopCard.innerHTML = `
				<div class="flex justify-between items-start mb-6">
					<div>
						<h3 class="text-3xl font-bold mb-2 text-white">${shop.name}</h3>
						<p class="text-lg text-gray-400">Tipo de loja: ${shop.type}</p>
					</div>
					<div class="flex space-x-2 items-center">
						${profile.role === 'admin' ? `
						<button class="delete-shop px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-lg transition flex items-center space-x-2" data-id="${shop.id}">
							<i class="fas fa-trash mr-2"></i><span>Delete</span>
						</button>
						` : ''}
						<button class="sell-items-shop px-5 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition flex items-center space-x-2 text-lg" data-shop-id="${shop.id}" data-shop-type="${shop.type}">
							<i class="fas fa-coins"></i>
							<span>Vender Itens</span>
						</button>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<h4 class="col-span-full text-2xl font-semibold text-gray-300 mb-5">Itens Disponíveis</h4>
					${shopItems && shopItems.itens && shopItems.itens.length > 0 ?
					shopItems.itens.map(item => `
								<div class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 hover:scale-105 hover:shadow-2xl transition-transform duration-200 min-w-[280px] max-w-[320px] flex-shrink-0 cursor-pointer item-detail-trigger" 
									data-item='${JSON.stringify(item).replace(/'/g, "&#39;")}' >
									<div class="flex justify-between items-start mb-4">
										<div>
											<h5 class="text-xl font-bold text-white">${item.name}</h5>
											<div class="flex items-center space-x-2 mt-1">
												<span class="text-base ${getRarityColor(item.rarity)} font-semibold">${item.rarity}</span>
												<span class="text-base text-gray-400">•</span>
												<span class="text-base text-gray-400">${item.type}</span>
											</div>
										</div>
										<div class="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-lg">
											<i class="fas fa-coins text-yellow-400"></i>
											<span class="text-yellow-400 font-bold text-lg">${item.price}</span>
										</div>
									</div>
									<div class="mt-1">
										<span class="text-xs text-gray-400 estoque-span">Estoque: ${item.quantity}</span>
									</div>
									<div class="border-t border-gray-600 my-4"></div>

									<p class="text-base text-gray-300 mb-5 line-clamp-2">${item.description || 'Sem descrição'}</p>

									<div class="flex justify-between items-center">
										<div class="flex items-center space-x-2">
											<span class="text-xs text-gray-400">ID: ${item.id}</span>
										</div>
										<div class="flex space-x-2">
											<button class="buy-item px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition flex items-center space-x-2 text-base" 
													data-shop-id="${shop.id}" 
													data-item-id="${item.id}">
												<i class="fas fa-shopping-cart"></i>
												<span>Comprar</span>
											</button>
										</div>
									</div>
								</div>
							`).join('') :
					'<div class="col-span-full bg-gray-700 p-8 rounded-lg text-center"><p class="text-gray-400">Nenhum item disponível nesta loja</p></div>'
				}
				</div>
			`;
			shopsList.appendChild(shopCard);
		}

		// Add event listeners to delete buttons
		document.querySelectorAll('.delete-shop').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				const shopId = e.target.closest('button').getAttribute('data-id');
				if (confirm('Tem certeza que deseja deletar esta loja?')) {
					await deleteShop(API_TOKEN, shopId);
					loadShops();
				}
			});
		});

		// Add event listeners to buy buttons
		document.querySelectorAll('.buy-item').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				e.stopPropagation();
				const shopId = btn.getAttribute('data-shop-id');
				const itemId = btn.getAttribute('data-item-id');
				// Modal de seleção de campeão e quantidade
				const modal = document.createElement('div');
				modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50';
				modal.innerHTML = `
					<div class="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700 relative">
						<button class="close-modal absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
							<i class="fas fa-times text-xl"></i>
						</button>
						<h2 class="text-xl font-bold mb-4">Escolha o campeão para comprar o item</h2>
						<select id="champion-select" class="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg">
							${profile.champions.map(c => `<option value="${c.id}">${c.name} (Nível ${c.level})</option>`).join('')}
						</select>
						<label class="block mb-2 text-gray-300">Quantidade</label>
						<input id="buy-quantity" type="number" min="1" max="999" value="1" class="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg" />
						<button id="confirm-buy" class="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition">Confirmar Compra</button>
					</div>
				`;
				document.body.appendChild(modal);
				modal.querySelector('.close-modal').onclick = () => modal.remove();
				modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };
				modal.querySelector('#confirm-buy').onclick = async () => {
					const championId = modal.querySelector('#champion-select').value;
					const quantity = parseInt(modal.querySelector('#buy-quantity').value) || 1;
					try {
						await buyItem(API_TOKEN, shopId, championId, itemId, quantity);
						showAlert('Compra realizada com sucesso!', 'success');
						modal.remove();
						// Atualiza apenas o estoque do item comprado
						const itemCard = document.querySelector(
							`.buy-item[data-shop-id="${shopId}"][data-item-id="${itemId}"]`
						)?.closest('.bg-gray-700');
						if (itemCard) {
							const estoqueSpan = itemCard.querySelector('.estoque-span');
							if (estoqueSpan) {
								const estoqueAtual = parseInt(estoqueSpan.textContent.replace(/\D/g, '')) || 0;
								estoqueSpan.textContent = `Estoque: ${estoqueAtual - quantity}`;
							}
						}
					} catch (err) {
						showAlert('Erro ao comprar item: ' + (err?.response?.data?.error || err.message));
					}
				};
			});
		});

		// Após renderizar os cards das lojas, registre o handler do botão .sell-items-shop:
		document.querySelectorAll('.sell-items-shop').forEach(btn => {
			btn.addEventListener('click', async (e) => {
				e.stopPropagation();
				const shopId = btn.getAttribute('data-shop-id');
				const itemType = btn.getAttribute('data-shop-type');
				// Modal de seleção de campeão
				const modal = document.createElement('div');
				modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50';
				modal.innerHTML = `
					<div class="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700 relative">
						<button class="close-modal absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
							<i class="fas fa-times text-xl"></i>
						</button>
						<h2 class="text-xl font-bold mb-4">Escolha o campeão para vender item</h2>
						<select id="champion-sell-select" class="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg">
							<option value="">Selecione...</option>
							${profile.champions.map(c => `<option value="${c.id}">${c.name} (Nível ${c.level})</option>`).join('')}
						</select>
						<div id="champion-items-area"></div>
					</div>
				`;
				document.body.appendChild(modal);
				modal.querySelector('.close-modal').onclick = () => modal.remove();
				modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };

				modal.querySelector('#champion-sell-select').onchange = async function () {
					const championId = this.value;
					const area = modal.querySelector('#champion-items-area');
					area.innerHTML = '';
					if (!championId) return;
					// Buscar inventário do campeão
					const inventory = await getItemsOfChampion(API_TOKEN, championId);
					// Filtrar itens do tipo da loja
					const filtered = (inventory?.itens || []).filter(i => i.type === itemType);
					if (!filtered.length) {
						area.innerHTML = '<p class="text-gray-400">Este campeão não possui itens desse tipo.</p>';
						return;
					}
					area.innerHTML = `
						<label class="block mb-2 text-gray-300">Item</label>
						<select id="item-sell-select" class="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg">
							${filtered.map(i => `<option value="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">${i.name} (Qtd: ${i.quantity})</option>`).join('')}
						</select>
						<label class="block mb-2 text-gray-300">Quantidade</label>
						<input id="sell-quantity" type="number" min="1" max="${filtered[0].quantity}" value="1" class="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg" />
						<p id="sell-gain" class="text-gray-300 mb-4">Ganho: 0</p>
						<button id="confirm-sell" class="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition">Confirmar Venda</button>
					`;

					let itemSelect = area.querySelector('#item-sell-select');
					let qtyInput = area.querySelector('#sell-quantity');
					const sellGain = area.querySelector('#sell-gain');
					
					

					const updateGain = () => {
						const selectedItem = itemSelect.selectedOptions[0];
						const price = parseFloat(selectedItem.getAttribute('data-price'));
						const quantity = parseInt(qtyInput.value || 1, 10);
						sellGain.textContent = `Ganho: ${(price * quantity).toFixed(2)}`;
					};

					updateGain();

					itemSelect.onchange = () => {
						const opt = itemSelect.selectedOptions[0];
						qtyInput.max = opt.getAttribute('data-qty');
						qtyInput.value = 1;
						updateGain();
					};

					qtyInput.oninput = updateGain;
					// Atualizar max do input ao trocar item
					itemSelect = area.querySelector('#item-sell-select');
					qtyInput = area.querySelector('#sell-quantity');
					itemSelect.onchange = function () {
						const opt = itemSelect.selectedOptions[0];
						qtyInput.max = opt.getAttribute('data-qty');
						qtyInput.value = 1;
					};
					// Confirmar venda
					area.querySelector('#confirm-sell').onclick = async () => {
						const itemId = itemSelect.value;
						const quantity = parseInt(qtyInput.value) || 1;
						try {
							await sellItem(API_TOKEN, shopId, championId, itemId, quantity);

							showAlert('Venda realizada com sucesso!', 'success');
							modal.remove();
							// Atualiza apenas o estoque do item vendido
							const itemCard = document.querySelector(
								`.buy-item[data-shop-id=\"${shopId}\"][data-item-id=\"${itemId}\"]`
							)?.closest('.bg-gray-700');
							if (itemCard) {
								const estoqueSpan = itemCard.querySelector('.estoque-span');
								if (estoqueSpan) {
									const estoqueAtual = parseInt(estoqueSpan.textContent.replace(/\D/g, '')) || 0;
									estoqueSpan.textContent = `Estoque: ${estoqueAtual + quantity}`;
								}
							}
						} catch (err) {
							showAlert('Erro ao vender item: ' + (err?.response?.data?.error || err.message));
						}
					};
				};
			});
		});

	} catch (error) {
		console.error('Error loading shops:', error);
		showAlert('Erro ao carregar lojas');
	}

	// Add after rendering shop cards:
	setTimeout(() => {
		document.querySelectorAll('.item-detail-trigger').forEach(card => {
			card.addEventListener('click', function (e) {
				// Prevent click on buy button from opening modal
				if (e.target.closest('.buy-item') || e.target.closest('.sell-item')) return;
				const item = JSON.parse(this.getAttribute('data-item').replace(/&#39;/g, "'"));
				const modal = document.createElement('div');
				modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50';
				modal.innerHTML = `
					<div class="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700 relative">
						<button class="close-modal absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
							<i class="fas fa-times text-xl"></i>
						</button>
						<h2 class="text-2xl font-bold text-white mb-2">${item.name}</h2>
						<div class="flex items-center space-x-3 mb-4">
							<span class="text-sm ${getRarityColor(item.rarity)} font-medium">${item.rarity}</span>
							<span class="text-sm text-gray-400">•</span>
							<span class="text-sm text-gray-400">${item.type}</span>
							<span class="text-sm text-gray-400">ID: ${item.id}</span>
						</div>
						<p class="text-gray-300 mb-4">${item.description || 'Sem descrição'}</p>
						<div class="flex items-center space-x-2 mb-4">
							<i class="fas fa-coins text-yellow-400"></i>
							<span class="text-yellow-400 font-medium">${item.price} gold</span>
						</div>
						<button class="buy-item px-4 py-2 bg-green-600 hover:bg-green-500 rounded transition flex items-center space-x-2 w-full" 
							data-item-id="${item.id}">
							<i class="fas fa-shopping-cart"></i>
							<span>Comprar</span>
						</button>
					</div>
				`;
				document.body.appendChild(modal);
				modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
				modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
			});
		});
	}, 0);
}

async function loadGuilds() {
	try {
		const guilds = await getGuilds(API_TOKEN);
		console.log(guilds);
		guilds.forEach(guild => {
			const guildCard = document.createElement('div');
			guildCard.className = 'relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 pl-8 rounded-2xl shadow-lg mb-6 border border-gray-700 transition transform hover:scale-105 overflow-hidden';

			guildCard.innerHTML = `
		<!-- Barra lateral colorida -->
		<div class="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-green-500"></div>

		<div class="flex items-center justify-between mb-4">
			<h2 class="text-2xl font-extrabold text-white">${guild.name}</h2>
			<span class="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-md">Nível ${guild.level}</span>
		</div>
		<div>
			<p class="text-gray-400 text-sm"><span class="font-semibold">Criada em:</span> ${new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(guild.created_at))}</p>
		</div>
	`;

			document.getElementById('guilds').appendChild(guildCard);

		});

	} catch (err) {
		console.error('Error loading guilds:', err);
		showAlert('Erro ao carregar guilds');
	}
}

// Create new character
document.getElementById('new-character-form').addEventListener('submit', async (e) => {
	e.preventDefault();

	const newCharacter = {
		name: document.getElementById('character-name').value,
		roleId: document.getElementById('character-class').value
	};

	try {
		const championCreated = await createChampion(API_TOKEN, newCharacter);

		if (championCreated) {
			document.getElementById('character-form').classList.add('hidden');
			document.getElementById('new-character-form').reset();
			await updateUser(API_TOKEN);
			showAlert('Campeão criado com sucesso!', 'success');
		} else {
			showAlert('Erro ao criar campeão');
		}
	} catch (error) {
		console.error('Error creating character:', error);
		showAlert('Erro ao criar campeão');
	}
});

// Create new item
document.getElementById('new-item-form').addEventListener('submit', async (e) => {
	e.preventDefault();

	const newItem = {
		name: document.getElementById('item-name').value,
		type: document.getElementById('item-type').value,
		priceMin: parseInt(document.getElementById('item-value-min').value),
		priceMax: parseInt(document.getElementById('item-value-max').value),
		description: document.getElementById('item-description').value
	};

	try {
		const createdItem = await createItem(API_TOKEN, newItem);

		if (createdItem) {
			document.getElementById('item-form').classList.add('hidden');
			document.getElementById('new-item-form').reset();
			loadItems();
			showAlert('Item criado com sucesso!', 'success');
		} else {
			showAlert('Erro ao criar item');
		}
	} catch (error) {
		console.error('Error creating item:', error);
		showAlert('Erro ao criar item');
	}
});

// Delete character
async function deleteCharacter(id) {
	try {
		const response = await deleteChampion(API_TOKEN, id);

		if (response) {
			showAlert('Personagem deletado com sucesso!', 'success');
		} else {
			showAlert('Erro ao deletar personagem');
		}

	} catch (error) {
		console.error('Error deleting character:', error);
		showAlert('Erro ao deletar personagem');
	}
}


async function updateUser(token) {
	try {
		const newProfile = await getProfile(token);

		if (!newProfile) {
			showAlert('Token inválido');
			return;
		}

		document.getElementById("user-name").innerHTML = `Nome: ${newProfile.name}`;
		document.getElementById("user-role").innerHTML = `Cargo: ${newProfile.role}`;

		const champions = await getChampions(token) || [];

		profile.name = newProfile.name;
		profile.email = newProfile.email;
		profile.champions = champions;
		profile.role = newProfile.role;

		// Mostrar/ocultar aba Items e botão Criar Item só para admin
		const tabItemsBtn = document.getElementById('tab-items-btn');
		if (tabItemsBtn) {
			tabItemsBtn.style.display = (profile.role === 'admin') ? 'block' : 'none';
		}
		const createItemBtn = document.getElementById('create-item-btn');
		if (createItemBtn) {
			createItemBtn.style.display = (profile.role === 'admin') ? 'block' : 'none';
		}

		loadChampions(profile.champions);
	} catch (error) {
		console.error('Error updating user:', error);
		showAlert('Erro ao atualizar perfil');
	}
}


document.addEventListener('DOMContentLoaded', async () => {

	roles = await getRoleChampions();

	document.getElementById('token').addEventListener('input', async () => {
		const token = document.getElementById('token').value;
		API_TOKEN = token;
		setCookieValue('api_token', token);

		try {
			await updateUser(API_TOKEN);
		} catch (error) {
			console.error(error.message);
		}
	});

	API_TOKEN = getCookieValue('api_token');
	document.getElementById('token').value = API_TOKEN;

	if (API_TOKEN !== null) {
		await updateUser(API_TOKEN);
	}

	document.getElementById('toggle-token-visibility').addEventListener('click', function () {
		const tokenInput = document.getElementById('token');
		const icon = this.querySelector('i');
		if (tokenInput.type === 'password') {
			tokenInput.type = 'text';
			icon.classList.remove('fa-eye');
			icon.classList.add('fa-eye-slash');
		} else {
			tokenInput.type = 'password';
			icon.classList.remove('fa-eye-slash');
			icon.classList.add('fa-eye');
		}
	});

	// Character form toggle
	document.getElementById('create-character-btn').addEventListener('click', async (e) => {
		e.preventDefault();
		document.getElementById('character-form').classList.remove('hidden');

		const championsRoles = document.getElementById('character-class');

		const optionsRoles = roles.map(role => {
			const option = document.createElement('option');
			option.value = role.id;
			option.textContent = role.name;

			return option;
		});

		championsRoles.innerHTML = '';
		optionsRoles.forEach(option => championsRoles.appendChild(option));
	});

});


function atributesArea(champion) {
	return `
		<div class="grid grid-cols-2 gap-4">
		<!-- Força -->
		<div class="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
			<div>
				<p class="text-sm text-gray-400 mb-1">Força</p>
				<p class="text-xl font-bold text-white" data-attvalue="strength">${champion.strength || 0}</p>
			</div>
			<button
				class="w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-200 rounded-full shadow-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
				data-attribute="strength" data-id="${champion.id || 0}">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
		<!-- Inteligência -->
		<div class="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
			<div>
				<p class="text-sm text-gray-400 mb-1">Inteligência</p>
				<p class="text-xl font-bold text-white" data-attvalue="intelligence">${champion.intelligence || 0}</p>
			</div>
			<button
				class="w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-200 rounded-full shadow-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
				data-attribute="intelligence" data-id="${champion.id || 0}">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
		<!-- Vitalidade -->
		<div class="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
			<div>
				<p class="text-sm text-gray-400 mb-1">Vitalidade</p>
				<p class="text-xl font-bold text-white" data-attvalue="vitality">${champion.vitality || 0}</p>
			</div>
			<button
				class="w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-200 rounded-full shadow-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
				data-attribute="vitality" data-id="${champion.id || 0}">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
		<!-- Destreza -->
		<div class="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
			<div>
				<p class="text-sm text-gray-400 mb-1">Destreza</p>
				<p class="text-xl font-bold text-white" data-attvalue="dexterity">${champion.dexterity || 0}</p>
			</div>
			<button
				class="w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-200 rounded-full shadow-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
				data-attribute="dexterity" data-id="${champion.id || 0}">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
	</div>
</div>
	`
}