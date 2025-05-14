/**
 * 游戏主入口文件
 * 负责初始化游戏、加载模块、启动主循环
 */

// 导入角色数据模块
import { initializeCharacter, calculateDerivedStats } from './core/character.js';

// 导入角色UI模块
import { initCharacterUI } from './ui/characterUI.js';

// 导入事件管理器模块
import { initializeEvents, getCurrentEvent, processEventOption } from './core/eventManager.js';

// 导入事件UI模块
import { initEventUI, bindEventOptionHandlers } from './ui/eventUI.js';

// 游戏初始化
function initGame() {
    console.log("DOM 已加载，开始初始化游戏...");

    // 1. 初始化角色核心数据
    const playerCharacter = initializeCharacter();
    if (playerCharacter) {
        console.log("角色数据已初始化:", playerCharacter);

        // 计算衍生属性
        calculateDerivedStats(playerCharacter);

        // 添加一个示例物品
        playerCharacter.inventory.push({
            id: "item_health_potion",
            name: "治疗药水",
            quantity: 3,
            description: "恢复30点生命值"
        });

        // 2. 初始化并渲染角色UI
        initCharacterUI(playerCharacter);
    } else {
        console.error("角色数据初始化失败！");
    }

    // 3. 初始化事件系统
    initializeEvents();
    const initialEvent = getCurrentEvent();
    if (initialEvent) {
        // 初始化事件UI
        initEventUI(initialEvent);
        
        // 绑定事件选项处理函数
        bindEventOptionHandlers((optionId) => {
            console.log(`选择了选项: ${optionId}`);
            processEventOption(optionId);
            // 处理完选项后更新UI
            const nextEvent = getCurrentEvent();
            if (nextEvent) {
                initEventUI(nextEvent);
            }
        });
    } else {
        console.error("无法加载初始事件！");
    }

    // 后续其他模块的初始化将放在这里
    console.log("游戏初始化流程初步完成。");
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', initGame);

// 主游戏循环
function gameLoop() {
    // TODO: 实现游戏主循环
} 