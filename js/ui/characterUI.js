/**
 * @file characterUI.js
 * @description 角色界面模块，负责将角色数据渲染到人物卡界面。
 */

/**
 * @function renderCharacterSheet
 * @description 根据传入的角色数据更新人物卡界面的显示
 * @param {object} charData - 从 character.js 获取的角色数据对象
 * @returns {void}
 */
export function renderCharacterSheet(charData) {
    if (!charData) {
        console.error('角色数据为空，无法渲染人物卡');
        return;
    }

    console.log('开始渲染人物卡界面:', charData);

    // --- 渲染角色基本信息 ---
    renderCharacterBasicInfo(charData);

    // --- 渲染核心资源（HP/MP等）---
    renderCharacterResources(charData);

    // --- 渲染角色属性 ---
    renderCharacterAttributes(charData);

    // --- 渲染状态效果 ---
    renderStatusEffects(charData);

    // --- 渲染物品栏 ---
    renderInventory(charData);

    console.log('人物卡界面渲染完成');
}

/**
 * @function renderCharacterBasicInfo
 * @description 渲染角色基本信息（名称、职业、阵营等）
 * @param {object} charData - 角色数据对象
 * @returns {void}
 */
function renderCharacterBasicInfo(charData) {
    // 角色名称
    const nameElement = document.getElementById('character-name');
    if (nameElement) {
        nameElement.textContent = charData.name;
    }

    // 角色职业
    const classElement = document.getElementById('character-class');
    if (classElement && charData.identity && charData.identity.class) {
        classElement.textContent = charData.identity.class;
    }

    // 角色阵营
    const alignmentElement = document.getElementById('character-alignment');
    if (alignmentElement && charData.identity && charData.identity.alignment) {
        alignmentElement.textContent = charData.identity.alignment;
    }
}

/**
 * @function renderCharacterResources
 * @description 渲染角色资源（生命值、法力值等）
 * @param {object} charData - 角色数据对象
 * @returns {void}
 */
function renderCharacterResources(charData) {
    // 渲染HP（生命值）
    if (charData.resources && charData.resources.hp) {
        const hp = charData.resources.hp;
        const hpBar = document.getElementById('hp-bar');
        const hpText = document.getElementById('hp-text');

        if (hpBar && hpText) {
            // 计算HP百分比
            const hpPercentage = Math.floor((hp.current / hp.max) * 100);
            
            // 更新HP条宽度
            hpBar.style.width = `${hpPercentage}%`;
            
            // 更新HP文本
            hpText.textContent = `${hp.current}/${hp.max}`;
            
            // 根据HP百分比设置颜色
            if (hpPercentage < 25) {
                hpBar.classList.remove('bg-yellow-500', 'bg-red-500', 'bg-green-500');
                hpBar.classList.add('bg-red-600');
            } else if (hpPercentage < 50) {
                hpBar.classList.remove('bg-red-600', 'bg-red-500', 'bg-green-500');
                hpBar.classList.add('bg-yellow-500');
            } else {
                hpBar.classList.remove('bg-yellow-500', 'bg-red-600', 'bg-red-500');
                hpBar.classList.add('bg-green-500');
            }
        }
    }

    // 渲染MP（法力值）
    if (charData.resources && charData.resources.mp) {
        const mp = charData.resources.mp;
        const mpBar = document.getElementById('mp-bar');
        const mpText = document.getElementById('mp-text');

        if (mpBar && mpText) {
            // 计算MP百分比
            const mpPercentage = Math.floor((mp.current / mp.max) * 100);
            
            // 更新MP条宽度
            mpBar.style.width = `${mpPercentage}%`;
            
            // 更新MP文本
            mpText.textContent = `${mp.current}/${mp.max}`;
            
            // 根据MP百分比调整颜色深浅
            if (mpPercentage < 25) {
                mpBar.classList.remove('bg-blue-400', 'bg-blue-500');
                mpBar.classList.add('bg-blue-300');
            } else if (mpPercentage < 50) {
                mpBar.classList.remove('bg-blue-300', 'bg-blue-500');
                mpBar.classList.add('bg-blue-400');
            } else {
                mpBar.classList.remove('bg-blue-300', 'bg-blue-400');
                mpBar.classList.add('bg-blue-500');
            }
        }
    }
}

/**
 * @function renderCharacterAttributes
 * @description 渲染角色属性
 * @param {object} charData - 角色数据对象
 * @returns {void}
 */
function renderCharacterAttributes(charData) {
    if (!charData.attributes) return;

    // 属性名称映射（英文到中文）
    const attributeNames = {
        strength: 'strength',       // 力量
        dexterity: 'dexterity',     // 敏捷
        constitution: 'constitution', // 体质
        intelligence: 'intelligence', // 智力
        wisdom: 'wisdom',           // 感知
        charisma: 'charisma'        // 魅力
    };

    // 遍历所有属性并更新对应的显示元素
    for (const [engName, elemId] of Object.entries(attributeNames)) {
        if (charData.attributes[engName] !== undefined) {
            const element = document.getElementById(`attribute-${elemId}`);
            if (element) {
                element.textContent = charData.attributes[engName];
            }
        }
    }
}

/**
 * @function renderStatusEffects
 * @description 渲染角色状态效果
 * @param {object} charData - 角色数据对象
 * @returns {void}
 */
function renderStatusEffects(charData) {
    const statusEffectsContainer = document.getElementById('status-effects');
    if (!statusEffectsContainer || !charData.statusEffects) return;

    // 清空现有的状态效果显示
    statusEffectsContainer.innerHTML = '';

    if (charData.statusEffects.length === 0) {
        // 如果没有状态效果，显示一个占位符
        statusEffectsContainer.innerHTML = '<div class="text-sm text-gray-500 italic">无状态效果</div>';
        return;
    }

    // 添加所有状态效果
    charData.statusEffects.forEach(effect => {
        const effectElement = document.createElement('div');
        effectElement.classList.add('text-sm', 'flex', 'items-center');
        
        // 根据状态效果类型设置不同的样式
        if (effect.type === 'buff' || effect.type === 'temporary') {
            effectElement.classList.add('text-green-600');
            effectElement.innerHTML = `<i class="fas fa-leaf mr-1"></i>`;
        } else if (effect.type === 'debuff') {
            effectElement.classList.add('text-red-600');
            effectElement.innerHTML = `<i class="fas fa-skull mr-1"></i>`;
        } else if (effect.type === 'permanent') {
            effectElement.classList.add('text-blue-600');
            effectElement.innerHTML = `<i class="fas fa-star mr-1"></i>`;
        } else {
            effectElement.classList.add('text-gray-600');
            effectElement.innerHTML = `<i class="fas fa-circle mr-1"></i>`;
        }
        
        // 添加效果名称
        const nameSpan = document.createElement('span');
        nameSpan.textContent = effect.name;
        effectElement.appendChild(nameSpan);
        
        // 如果有持续时间，添加一个标识
        if (effect.duration !== undefined && effect.duration !== -1) {
            const durationSpan = document.createElement('span');
            durationSpan.classList.add('ml-1', 'text-xs', 'text-gray-500');
            durationSpan.textContent = `(${effect.type === 'permanent' ? '永久' : '临时'})`;
            effectElement.appendChild(durationSpan);
        }
        
        statusEffectsContainer.appendChild(effectElement);
    });
}

/**
 * @function renderInventory
 * @description 渲染角色物品栏
 * @param {object} charData - 角色数据对象
 * @returns {void}
 */
function renderInventory(charData) {
    const inventoryList = document.getElementById('inventory-list');
    const inventorySummary = document.getElementById('inventory-summary');
    
    if (!inventoryList || !inventorySummary) return;
    
    // 更新物品栏容量显示
    inventorySummary.textContent = `${charData.inventory.length}/${charData.inventoryCapacity}`;
    
    // 清空当前物品列表
    inventoryList.innerHTML = '';
    
    // 如果物品栏为空，显示一个占位符
    if (!charData.inventory || charData.inventory.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.classList.add('p-2', 'text-gray-500', 'italic');
        emptyItem.textContent = '物品栏为空';
        inventoryList.appendChild(emptyItem);
        return;
    }
    
    // 添加所有物品
    charData.inventory.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('p-2', 'flex', 'justify-between', 'items-center');
        
        const itemInfo = document.createElement('div');
        itemInfo.innerHTML = `
            <span class="font-medium">${item.name}</span>
            ${item.description ? `<span class="text-xs text-gray-500 block">${item.description}</span>` : ''}
        `;
        
        const itemQuantity = document.createElement('span');
        itemQuantity.classList.add('text-sm', 'bg-gray-100', 'px-2', 'py-1', 'rounded');
        itemQuantity.textContent = `x${item.quantity}`;
        
        itemElement.appendChild(itemInfo);
        itemElement.appendChild(itemQuantity);
        
        inventoryList.appendChild(itemElement);
    });
}

/**
 * @function initCharacterUI
 * @description 初始化角色UI模块，执行首次渲染
 * @param {object} initialCharacterData - 初始的角色数据
 * @returns {void}
 */
export function initCharacterUI(initialCharacterData) {
    if (!initialCharacterData) {
        console.error("初始化角色UI失败：未提供角色数据。");
        return;
    }
    
    // 绑定UI交互事件
    bindCharacterUIEvents();
    
    // 执行首次渲染
    renderCharacterSheet(initialCharacterData);
    
    console.log("角色UI模块已初始化");
}

/**
 * @function bindCharacterUIEvents
 * @description 绑定角色UI相关的事件处理
 * @returns {void}
 */
function bindCharacterUIEvents() {
    // 详情按钮点击事件
    const detailsBtn = document.getElementById('details-btn');
    if (detailsBtn) {
        detailsBtn.addEventListener('click', () => {
            console.log('详情按钮被点击');
            // 这里可以添加显示详细人物信息的逻辑
        });
    }
    
    // 合成按钮点击事件
    const synthesisBtn = document.getElementById('synthesis-btn');
    if (synthesisBtn) {
        synthesisBtn.addEventListener('click', () => {
            console.log('合成按钮被点击');
            // 这里可以添加打开合成界面的逻辑
        });
    }
} 