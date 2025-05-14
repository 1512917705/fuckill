/**
 * @file character.js
 * @description 角色核心数据模块，管理角色的核心数据（如属性、资源、物品栏等）的存储和基本计算逻辑。
 */

/**
 * 示例角色数据结构
 * @type {Object}
 */
const characterData = {
    name: "勇敢的冒险者",
    attributes: {
        strength: 10,       // 力量
        dexterity: 10,      // 敏捷
        constitution: 10,   // 体质
        intelligence: 10,   // 智力
        wisdom: 10,         // 感知
        charisma: 10        // 魅力
    },
    resources: {
        hp: { current: 100, max: 100 },   // 生命值
        mp: { current: 50, max: 50 },     // 法力值
        morale: { current: 70, max: 100 } // 士气
    },
    identity: {
        race: "人类",        // 种族
        class: "战士",       // 职业
        alignment: "守序善良" // 阵营
    },
    statusEffects: [
        { id: "effect_energetic", name: "精力充沛", description: "行动效率提升", duration: 3, type: "temporary" } // duration: -1表示永久
    ],
    equipment: {
        weapon: null,  // 或 { id: "wpn_001", name: "新手剑", stats: { damage: 5 } }
        armor: null,   // 或 { id: "arm_001", name: "皮甲", stats: { defense: 3 } }
        accessory: null // 或 { id: "acc_001", name: "幸运符", stats: { luck: 1 } }
    },
    inventory: [
        // { id: "item_001", name: "治疗药水", quantity: 3, description: "恢复少量生命值。" }
    ],
    inventoryCapacity: 20,
    skills: [
        // { id: "skill_001", name: "猛击", description: "造成130%的物理伤害", cooldown: 2 }
    ],
    experience: {
        level: 1,
        current: 0,
        nextLevel: 100
    },
    gold: 0,
    gameProgress: {
        currentLocation: "艾尔文森林",
        discoveredLocations: ["初始村庄", "艾尔文森林"],
        completedQuests: []
    }
};

/**
 * @function initializeCharacter
 * @description 初始化角色数据，返回包含示例数据的角色对象。
 * @returns {Object} 包含角色初始数据的对象。
 */
export function initializeCharacter() {
    // 深拷贝以防意外修改原始模板
    return JSON.parse(JSON.stringify(characterData));
}

// ------ 数据获取接口 (Getter functions) ------

/**
 * @function getCharacterName
 * @description 获取角色名称。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {string} 角色名称。
 */
export function getCharacterName(charInstance) {
    return charInstance.name;
}

/**
 * @function getCharacterClass
 * @description 获取角色职业。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {string} 角色职业。
 */
export function getCharacterClass(charInstance) {
    return charInstance.identity.class;
}

/**
 * @function getCharacterAlignment
 * @description 获取角色阵营。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {string} 角色阵营。
 */
export function getCharacterAlignment(charInstance) {
    return charInstance.identity.alignment;
}

/**
 * @function getCharacterAttributes
 * @description 获取角色所有属性。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Object} 包含所有核心属性的对象。
 */
export function getCharacterAttributes(charInstance) {
    return charInstance.attributes;
}

/**
 * @function getCharacterAttribute
 * @description 获取角色特定属性值。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} attributeName - 属性名称。
 * @returns {number} 属性值，如果属性不存在则返回0。
 */
export function getCharacterAttribute(charInstance, attributeName) {
    return charInstance.attributes[attributeName] || 0;
}

/**
 * @function getCharacterResources
 * @description 获取角色所有资源。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Object} 包含所有资源的对象。
 */
export function getCharacterResources(charInstance) {
    return charInstance.resources;
}

/**
 * @function getCharacterResource
 * @description 获取角色特定资源。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} resourceName - 资源名称(hp, mp等)。
 * @returns {Object} 资源对象，包含current和max。
 */
export function getCharacterResource(charInstance, resourceName) {
    return charInstance.resources[resourceName] || null;
}

/**
 * @function getCharacterInventory
 * @description 获取角色物品栏。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Array} 物品数组。
 */
export function getCharacterInventory(charInstance) {
    return charInstance.inventory;
}

/**
 * @function getInventoryCapacity
 * @description 获取角色物品栏容量。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {number} 物品栏容量。
 */
export function getInventoryCapacity(charInstance) {
    return charInstance.inventoryCapacity;
}

/**
 * @function getStatusEffects
 * @description 获取角色所有状态效果。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Array} 状态效果数组。
 */
export function getStatusEffects(charInstance) {
    return charInstance.statusEffects;
}

/**
 * @function getEquipment
 * @description 获取角色装备。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Object} 装备对象。
 */
export function getEquipment(charInstance) {
    return charInstance.equipment;
}

// ------ 数据修改接口 (Setter/Modifier functions) ------

/**
 * @function updateCharacterName
 * @description 更新角色名称。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} newName - 新的角色名称。
 * @returns {void}
 */
export function updateCharacterName(charInstance, newName) {
    if (typeof newName === 'string' && newName.trim()) {
        charInstance.name = newName.trim();
        console.log(`角色名称已更新为: ${charInstance.name}`);
    } else {
        console.warn("无法更新角色名称: 名称无效");
    }
}

/**
 * @function updateCharacterAttribute
 * @description 更新角色特定属性值。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} attributeName - 属性名称。
 * @param {number} newValue - 新的属性值。
 * @returns {boolean} 是否成功更新。
 */
export function updateCharacterAttribute(charInstance, attributeName, newValue) {
    if (charInstance.attributes.hasOwnProperty(attributeName) && typeof newValue === 'number') {
        charInstance.attributes[attributeName] = Math.max(1, newValue); // 确保属性值至少为1
        console.log(`角色${attributeName}属性已更新为: ${charInstance.attributes[attributeName]}`);
        return true;
    }
    console.warn(`无法更新角色属性: ${attributeName}不存在或值无效`);
    return false;
}

/**
 * @function updateCharacterHP
 * @description 更新角色当前HP。
 * @param {Object} charInstance - 角色数据实例。
 * @param {number} amount - HP变化量，正数为增加，负数为减少。
 * @returns {void}
 */
export function updateCharacterHP(charInstance, amount) {
    if (!charInstance.resources.hp) {
        console.warn("角色没有HP资源");
        return;
    }
    
    charInstance.resources.hp.current += amount;
    
    // 确保HP在合理范围内
    if (charInstance.resources.hp.current < 0) {
        charInstance.resources.hp.current = 0;
    }
    if (charInstance.resources.hp.current > charInstance.resources.hp.max) {
        charInstance.resources.hp.current = charInstance.resources.hp.max;
    }
    
    console.log(`角色HP更新: ${charInstance.resources.hp.current}/${charInstance.resources.hp.max}`);
}

/**
 * @function updateCharacterMP
 * @description 更新角色当前MP。
 * @param {Object} charInstance - 角色数据实例。
 * @param {number} amount - MP变化量，正数为增加，负数为减少。
 * @returns {void}
 */
export function updateCharacterMP(charInstance, amount) {
    if (!charInstance.resources.mp) {
        console.warn("角色没有MP资源");
        return;
    }
    
    charInstance.resources.mp.current += amount;
    
    // 确保MP在合理范围内
    if (charInstance.resources.mp.current < 0) {
        charInstance.resources.mp.current = 0;
    }
    if (charInstance.resources.mp.current > charInstance.resources.mp.max) {
        charInstance.resources.mp.current = charInstance.resources.mp.max;
    }
    
    console.log(`角色MP更新: ${charInstance.resources.mp.current}/${charInstance.resources.mp.max}`);
}

/**
 * @function addItemToInventory
 * @description 向角色物品栏添加物品。
 * @param {Object} charInstance - 角色数据实例。
 * @param {Object} item - 要添加的物品对象 (例如 { id: "itm_003", name: "金币", quantity: 10 })。
 * @returns {boolean} 是否成功添加物品。
 */
export function addItemToInventory(charInstance, item) {
    if (!item || !item.id || !item.name || typeof item.quantity !== 'number' || item.quantity <= 0) {
        console.warn("无法添加物品: 物品数据无效");
        return false;
    }
    
    // 检查是否已有同类物品
    const existingItem = charInstance.inventory.find(i => i.id === item.id);
    
    if (existingItem) {
        // 已有该物品，增加数量
        existingItem.quantity += item.quantity;
        console.log(`物品 ${item.name} 数量增加 ${item.quantity}，当前: ${existingItem.quantity}`);
        return true;
    } else {
        // 没有该物品，检查背包容量
        if (charInstance.inventory.length < charInstance.inventoryCapacity) {
            // 添加新物品
            charInstance.inventory.push({ ...item });
            console.log(`物品 ${item.name} x${item.quantity} 已添加到物品栏`);
            return true;
        } else {
            console.warn("物品栏已满，无法添加新物品");
            return false;
        }
    }
}

/**
 * @function removeItemFromInventory
 * @description 从角色物品栏移除物品。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} itemId - 要移除的物品ID。
 * @param {number} quantity - 要移除的数量，默认为1。
 * @returns {boolean} 是否成功移除物品。
 */
export function removeItemFromInventory(charInstance, itemId, quantity = 1) {
    const itemIndex = charInstance.inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
        console.warn(`物品栏中没有ID为 ${itemId} 的物品`);
        return false;
    }
    
    const item = charInstance.inventory[itemIndex];
    
    if (item.quantity > quantity) {
        // 数量足够，减少数量
        item.quantity -= quantity;
        console.log(`从物品栏中移除 ${item.name} x${quantity}，剩余: ${item.quantity}`);
        return true;
    } else {
        // 数量不足或刚好，移除整个物品
        charInstance.inventory.splice(itemIndex, 1);
        console.log(`物品 ${item.name} 已从物品栏中移除`);
        return true;
    }
}

/**
 * @function addStatusEffect
 * @description 添加状态效果到角色。
 * @param {Object} charInstance - 角色数据实例。
 * @param {Object} effect - 状态效果对象。
 * @returns {boolean} 是否成功添加状态效果。
 */
export function addStatusEffect(charInstance, effect) {
    if (!effect || !effect.id || !effect.name) {
        console.warn("无法添加状态效果: 数据无效");
        return false;
    }
    
    // 检查是否已有相同ID的状态效果
    const existingEffectIndex = charInstance.statusEffects.findIndex(e => e.id === effect.id);
    
    if (existingEffectIndex !== -1) {
        // 已有该效果，替换或更新
        charInstance.statusEffects[existingEffectIndex] = { ...effect };
        console.log(`状态效果 ${effect.name} 已更新`);
    } else {
        // 添加新效果
        charInstance.statusEffects.push({ ...effect });
        console.log(`状态效果 ${effect.name} 已添加`);
    }
    
    return true;
}

/**
 * @function removeStatusEffect
 * @description 移除角色的状态效果。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} effectId - 要移除的状态效果ID。
 * @returns {boolean} 是否成功移除状态效果。
 */
export function removeStatusEffect(charInstance, effectId) {
    const effectIndex = charInstance.statusEffects.findIndex(effect => effect.id === effectId);
    
    if (effectIndex === -1) {
        console.warn(`角色没有ID为 ${effectId} 的状态效果`);
        return false;
    }
    
    const removedEffect = charInstance.statusEffects[effectIndex];
    charInstance.statusEffects.splice(effectIndex, 1);
    console.log(`状态效果 ${removedEffect.name} 已移除`);
    
    return true;
}

/**
 * @function updateEquipment
 * @description 更新角色装备。
 * @param {Object} charInstance - 角色数据实例。
 * @param {string} slot - 装备槽位 (weapon, armor, accessory)。
 * @param {Object|null} item - 要装备的物品对象，null表示卸下装备。
 * @returns {boolean} 是否成功更新装备。
 */
export function updateEquipment(charInstance, slot, item) {
    if (!charInstance.equipment.hasOwnProperty(slot)) {
        console.warn(`无效的装备槽位: ${slot}`);
        return false;
    }
    
    const oldEquipment = charInstance.equipment[slot];
    charInstance.equipment[slot] = item;
    
    if (item) {
        console.log(`已装备 ${item.name} 到 ${slot} 槽位`);
    } else {
        console.log(`已卸下 ${slot} 槽位的装备`);
    }
    
    return true;
}

/**
 * @function calculateDerivedStats
 * @description 根据基础属性计算衍生属性。
 * @param {Object} charInstance - 角色数据实例。
 * @returns {Object} 衍生属性对象。
 */
export function calculateDerivedStats(charInstance) {
    const attributes = charInstance.attributes;
    
    // 计算生命值上限
    const maxHP = 50 + (attributes.constitution * 5);
    
    // 计算法力值上限
    const maxMP = 20 + (attributes.intelligence * 3);
    
    // 计算物理攻击力
    const physicalAttack = attributes.strength * 2;
    
    // 计算物理防御力
    const physicalDefense = attributes.constitution + Math.floor(attributes.dexterity / 2);
    
    // 计算魔法攻击力
    const magicAttack = attributes.intelligence * 2;
    
    // 计算魔法防御力
    const magicDefense = attributes.wisdom + Math.floor(attributes.intelligence / 2);
    
    // 计算闪避率
    const evasion = Math.min(30, Math.floor(attributes.dexterity * 1.5));
    
    // 更新资源最大值
    charInstance.resources.hp.max = maxHP;
    charInstance.resources.mp.max = maxMP;
    
    // 确保当前值不超过最大值
    if (charInstance.resources.hp.current > maxHP) {
        charInstance.resources.hp.current = maxHP;
    }
    if (charInstance.resources.mp.current > maxMP) {
        charInstance.resources.mp.current = maxMP;
    }
    
    return {
        maxHP,
        maxMP,
        physicalAttack,
        physicalDefense,
        magicAttack,
        magicDefense,
        evasion
    };
} 