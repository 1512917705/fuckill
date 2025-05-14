/**
 * @file eventManager.js
 * @description 事件核心数据模块，管理游戏中的事件数据（定义、选项）和当前事件的状态。
 */

/**
 * 示例事件数据 (会在实际开发中被服务器数据或Mod数据替换)
 * @type {Array<object>}
 */
const sampleEvents = [
    {
        id: "evt_001",
        name: "森林的岔路口",
        visibleDesc: "你来到了一个森林中的岔路口，左边的路看起来阴森恐怖，右边的路则似乎通向一片阳光明媚的空地。",
        conditionalDesc: ["if (characterData.attributes['感知'].total >= 12) return '你似乎闻到空气中有一丝腐败的气味。';"],
        hiddenDesc: "这是一个关键的选择点，左边通向危险但有宝藏的路径，右边相对安全。",
        visibleCreatures: ["小松鼠"],
        hiddenCreatures: ["潜伏的狼"],
        options: [
            { 
                id: "opt_001_01", 
                parentEventId: "evt_001", 
                title: "走左边的路", 
                text: "向左走，进入阴暗的小径", 
                condition: "true", 
                resultEffects: "console.log('你选择了左边的路...');", 
                successEventId: "evt_002" 
            },
            { 
                id: "opt_001_02", 
                parentEventId: "evt_001", 
                title: "走右边的路", 
                text: "向右走，前往阳光明媚的空地", 
                condition: "true", 
                resultEffects: "console.log('你选择了右边的路...');", 
                successEventId: "evt_003" 
            },
            { 
                id: "opt_001_03", 
                parentEventId: "evt_001", 
                title: "原地休息", 
                text: "在岔路口原地休息一下，恢复体力", 
                condition: "true", 
                resultEffects: "console.log('你决定原地休息...');" 
            }
        ]
    },
    {
        id: "evt_002",
        name: "阴森小径",
        visibleDesc: "左边的小径果然名不虚传，你感到一阵寒意。树木遮蔽了阳光，周围的空气潮湿而冰冷。你隐约听到一些窸窸窣窣的声音，似乎有什么东西在潜伏。",
        options: [
            { 
                id: "opt_002_01", 
                parentEventId: "evt_002", 
                title: "继续前进", 
                text: "鼓起勇气继续前进，看看前方有什么", 
                resultEffects: "console.log('你鼓起勇气继续前进...');" 
            },
            { 
                id: "opt_002_02", 
                parentEventId: "evt_002", 
                title: "返回岔路口", 
                text: "这里太危险了，还是返回岔路口吧", 
                successEventId: "evt_001" 
            }
        ]
    },
    {
        id: "evt_003",
        name: "阳光空地",
        visibleDesc: "右边的路通向一片美丽的空地，阳光洒在你身上，暖洋洋的。这里鲜花盛开，蝴蝶在空中翩翩起舞。在空地中央，有一个小小的水池，水面清澈见底。",
        options: [
            { 
                id: "opt_003_01", 
                parentEventId: "evt_003", 
                title: "四处看看", 
                text: "在空地上四处探索，寻找有用的东西", 
                resultEffects: "console.log('你开始在空地四处探索...');" 
            },
            { 
                id: "opt_003_02", 
                parentEventId: "evt_003", 
                title: "喝水", 
                text: "走到水池边喝一口清澈的水", 
                resultEffects: "console.log('你喝了一口清澈的泉水，感觉精神焕发...');" 
            },
            { 
                id: "opt_003_03", 
                parentEventId: "evt_003", 
                title: "返回岔路口", 
                text: "返回岔路口，选择其他方向", 
                successEventId: "evt_001" 
            }
        ]
    }
];

/**
 * 所有已加载的事件
 * @type {Array<object>}
 */
let allEvents = [];

/**
 * 当前激活的事件ID
 * @type {string|null}
 */
let currentEventId = null;

/**
 * @function loadEvents
 * @description 加载事件数据到事件管理器中。
 * @param {Array<object>} eventsArray - 包含事件对象的数组。
 * @returns {void}
 */
export function loadEvents(eventsArray) {
    allEvents = eventsArray;
    console.log(`${allEvents.length} 个事件已加载。`);
}

/**
 * @function initializeEvents
 * @description 初始化事件管理器，加载示例事件并设置初始事件。
 * @returns {void}
 */
export function initializeEvents() {
    loadEvents(sampleEvents);
    if (allEvents.length > 0) {
        currentEventId = allEvents[0].id; // 默认加载第一个事件
        console.log(`初始事件已设置为: ${currentEventId}`);
    } else {
        console.warn("没有可加载的初始事件。");
    }
}

/**
 * @function getEventById
 * @description 根据ID获取指定的事件对象。
 * @param {string} eventId - 要获取的事件的ID。
 * @returns {object|null} 事件对象，如果未找到则返回null。
 */
export function getEventById(eventId) {
    return allEvents.find(event => event.id === eventId) || null;
}

/**
 * @function getCurrentEvent
 * @description 获取当前激活的事件对象。
 * @returns {object|null} 当前事件对象，如果currentEventId无效则返回null。
 */
export function getCurrentEvent() {
    if (!currentEventId) return null;
    return getEventById(currentEventId);
}

/**
 * @function setCurrentEventId
 * @description 设置当前激活的事件ID。
 * @param {string} eventId - 要设置为当前事件的事件ID。
 * @returns {boolean} 如果事件ID有效并成功设置则返回true，否则返回false。
 */
export function setCurrentEventId(eventId) {
    const eventExists = allEvents.some(event => event.id === eventId);
    if (eventExists) {
        currentEventId = eventId;
        console.log(`当前事件已切换为: ${currentEventId}`);
        // 后续会在这里触发UI更新事件
        return true;
    }
    console.warn(`试图切换到不存在的事件ID: ${eventId}`);
    return false;
}

/**
 * @function getOptionById
 * @description 根据ID获取指定的选项对象。
 * @param {string} optionId - 要获取的选项的ID。
 * @returns {object|null} 选项对象，如果未找到则返回null。
 */
export function getOptionById(optionId) {
    for (const event of allEvents) {
        if (event.options) {
            const option = event.options.find(opt => opt.id === optionId);
            if (option) return option;
        }
    }
    return null;
}

/**
 * @function processEventOption
 * @description 处理玩家选择的事件选项，执行相关效果并返回下一个事件（如果有）。
 * @param {string} optionId - 玩家选择的选项ID。
 * @returns {object|null} 下一个事件对象，如果没有下一个事件则返回null。
 */
export function processEventOption(optionId) {
    const option = getOptionById(optionId);
    if (!option) {
        console.error(`找不到选项ID: ${optionId}`);
        return null;
    }
    
    console.log(`处理选项: ${option.title} (${optionId})`);
    
    // 执行选项的效果（实际版本中会有更复杂的逻辑，现在简单处理）
    if (option.resultEffects) {
        try {
            // 注意：这只是示例，实际代码需要更安全的处理方式
            eval(option.resultEffects);
        } catch (error) {
            console.error(`执行选项效果时出错:`, error);
        }
    }
    
    // 设置下一个事件（如果有）
    if (option.successEventId) {
        const nextEvent = getEventById(option.successEventId);
        if (nextEvent) {
            setCurrentEventId(option.successEventId);
            return nextEvent;
        } else {
            console.warn(`选项指向的下一个事件ID不存在: ${option.successEventId}`);
        }
    }
    
    return null;
} 