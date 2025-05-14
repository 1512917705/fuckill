/**
 * @file eventUI.js
 * @description 事件界面模块，负责将事件数据渲染到事件信息区域。
 */

/**
 * @function renderEvent
 * @description 根据传入的事件数据更新事件信息区域的显示。
 * @param {object} eventData - 从 eventManager.js 获取的事件数据对象。
 * @returns {void}
 */
export function renderEvent(eventData) {
    const descriptionElement = document.getElementById('event-description');
    const optionsContainer = document.getElementById('event-options');
    const eventCreaturesElement = document.getElementById('event-creatures');

    if (!eventData) {
        if (descriptionElement) descriptionElement.innerHTML = "<p>当前没有事件。</p>";
        if (optionsContainer) optionsContainer.innerHTML = "";
        if (eventCreaturesElement) eventCreaturesElement.classList.add('hidden');
        console.warn("renderEvent 调用时未提供有效事件数据。");
        return;
    }

    // 更新事件描述
    if (descriptionElement) {
        descriptionElement.innerHTML = `<p>${eventData.visibleDesc || "这个事件没有描述。"}</p>`;
        // 可以添加事件名称作为标题
        if (eventData.name) {
            descriptionElement.innerHTML = `<h3 class="text-lg font-medium mb-2">${eventData.name}</h3>` + descriptionElement.innerHTML;
        }
    }

    // 更新事件选项
    if (optionsContainer) {
        optionsContainer.innerHTML = ''; // 清空旧选项
        if (eventData.options && eventData.options.length > 0) {
            eventData.options.forEach(option => {
                // 检查选项的条件(初期简化为检查'true'字符串)
                if (option.condition === "true" || typeof option.condition === 'undefined') {
                    const button = document.createElement('button');
                    button.id = option.id; 
                    button.classList.add('w-full', 'text-left', 'p-3', 'bg-gray-50', 'hover:bg-gray-100', 'rounded', 'transition', 'mb-2');
                    
                    // 创建标题和描述的结构
                    const titleSpan = document.createElement('span');
                    titleSpan.classList.add('block', 'font-medium');
                    titleSpan.textContent = option.title || "未命名选项";
                    
                    const textSpan = document.createElement('span');
                    textSpan.classList.add('block', 'text-sm', 'text-gray-600', 'mt-1');
                    textSpan.textContent = option.text || "";
                    
                    button.appendChild(titleSpan);
                    if (option.text && option.text !== option.title) {
                        button.appendChild(textSpan);
                    }
                    
                    // 存储选项数据
                    button.dataset.optionId = option.id;
                    button.dataset.action = option.resultEffects; 
                    button.dataset.nextEvent = option.successEventId;

                    optionsContainer.appendChild(button);
                }
            });
        } else {
            optionsContainer.innerHTML = "<p class='text-gray-500 italic'>这个事件没有可选操作。</p>";
        }
    }

    // 显示场景中的生物(如果有)
    if (eventCreaturesElement) {
        if (eventData.visibleCreatures && eventData.visibleCreatures.length > 0) {
            eventCreaturesElement.classList.remove('hidden');
            const creaturesContainer = eventCreaturesElement.querySelector('div');
            if (creaturesContainer) {
                creaturesContainer.innerHTML = '';
                eventData.visibleCreatures.forEach(creature => {
                    const creatureElement = document.createElement('div');
                    creatureElement.classList.add('p-2', 'bg-white', 'rounded', 'mb-1');
                    creatureElement.textContent = creature;
                    creaturesContainer.appendChild(creatureElement);
                });
            }
        } else {
            eventCreaturesElement.classList.add('hidden');
        }
    }

    console.log("事件UI已使用数据渲染完毕:", eventData);
}

/**
 * @function initEventUI
 * @description 初始化事件UI模块，执行首次渲染并绑定事件处理。
 * @param {object} initialEventData - 初始的事件数据。
 * @returns {void}
 */
export function initEventUI(initialEventData) {
    if (!initialEventData) {
        console.error("初始化事件UI失败：未提供事件数据。");
        return;
    }
    
    // 渲染初始事件
    renderEvent(initialEventData);
    
    // 绑定刷新按钮事件
    const refreshButton = document.getElementById('refresh-event-btn');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            console.log("刷新事件按钮被点击");
            // 这里可以触发事件刷新逻辑
            // 例如：EventBus.emit('refreshEvent');
        });
    }
    
    console.log("事件UI初始化完成");
}

/**
 * @function bindEventOptionHandlers
 * @description 绑定事件选项按钮的点击处理函数
 * @param {Function} optionClickHandler - 处理选项点击的回调函数
 * @returns {void}
 */
export function bindEventOptionHandlers(optionClickHandler) {
    document.getElementById('event-options').addEventListener('click', (event) => {
        // 检查点击是否在选项按钮上
        const button = event.target.closest('button');
        if (button && button.dataset.optionId) {
            // 调用传入的处理函数，传递选项ID
            optionClickHandler(button.dataset.optionId);
        }
    });
    
    console.log("事件选项处理程序已绑定");
} 