/**
 * @file utils.js
 * @description 通用工具函数库，提供各种辅助功能
 */

// 创建全局Utils对象
window.Utils = {
    /**
     * 生成唯一ID
     * @param {string} prefix - ID前缀
     * @returns {string} 唯一ID
     */
    generateId: function(prefix = '') {
        return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    },

    /**
     * 随机数生成器
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 随机整数
     */
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * 深度克隆对象
     * @param {any} obj - 要克隆的对象
     * @returns {any} 克隆后的对象
     */
    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * 带范围限制的值
     * @param {number} value - 输入值
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 限制在范围内的值
     */
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
};