# fuckill游戏简介
AI驱动的文字冒险与合成游戏

设计文档：
重要的设计文档在document目录下，有《游戏设计文档.md》《游戏开发文档 - 核心数据结构.md》《架构文档.md》《UI逻辑文档.md》


项目文件结构
fuckill/
├── index.html             # 主游戏界面 (玩家视图)
├── login.html             # (可选) 独立的登录页面, 或在 index.html 中实现
├── admin.html             # 管理员后台入口页面 (可选, 或动态加载)
│
├── document/
│   └── 游戏设计文档.md         
│   └── 游戏开发文档 - 核心数据结构.md         
│   └── 架构文档.md         
│   └── UI逻辑文档.md    
│
├── originalDemo/             # 原始demo文件，只供AI生成代码做参考，不会实际参与游戏。
│   └── 人物模板V1.2.html       
│   └── 事件模块.html
│   └── 文字游戏demo1.0.html
│   └── UI_frame.html
│
├── mods/                  # 存放 Mod 的目录
│   └── example_mod/
│       ├── mod_info.json
│       ├── items.json
│       ├── events.json
│       ├── creatures.json
│       └── mod.js
│
├── css/
│   └── style.css          # 主要的 CSS 样式
│
├── js/
│   ├── main.js            # 游戏入口, **初始化认证**, **数据同步**, Mod加载, 加载模块, 主循环
│   ├── config.js          # 游戏配置 (API 端点, 难度系数等)
│   ├── utils.js           # 通用工具函数
│   ├── eventBus.js        # 全局事件总线
│   │
│   ├── core/              # 核心游戏逻辑模块
│   │   ├── authManager.js   # <--- 新增: 用户认证与权限管理
│   │   ├── syncManager.js   # <--- 新增: 数据同步管理 (存档, 基础数据, 内容上传)
│   │   ├── character.js   # 角色数据管理
│   │   ├── itemManager.js  # 物品与配方定义管理
│   │   ├── synthesisManager.js # 物品合成逻辑处理
│   │   ├── eventManager.js # 事件处理与流程控制
│   │   ├── mapManager.js   # 地图数据与探索逻辑
│   │   ├── worldManager.js # (新增) 世界状态与规则管理
│   │   ├── timeManager.js  # (新增) 游戏内时间管理
│   │   ├── aiService.js    # AI 服务交互封装
│   │   └── combatManager.js # (可选) 传统战斗逻辑
│   │
│   ├── ui/                # UI 管理与交互模块
│   │   ├── loginUI.js       # <--- 新增: 处理登录界面的交互
│   │   ├── uiManager.js     # 主界面通用 UI 更新
│   │   ├── characterUI.js   # 角色状态面板 UI
│   │   ├── eventUI.js       # 事件描述与选项 UI
│   │   ├── mapUI.js         # 地图显示与交互 UI
│   │   ├── synthesisUI.js   # 合成弹窗 UI
│   │   └── combatUI.js      # (可选) 战斗弹窗 UI
│   │
│   ├── admin/             # 后台管理页面逻辑
│   │   ├── adminLoader.js
│   │   ├── itemAdmin.js
│   │   ├── creatureAdmin.js
│   │   ├── eventAdmin.js
│   │   ├── mapAdmin.js
│   │   └── worldAdmin.js    # (新增) 世界管理页面逻辑
│   │
│   └── data/              # 存放或加载游戏**核心默认**数据 (会被服务器数据覆盖或补充)
│       ├── items.json
│       ├── events.json
│       ├── creatures.json
│       ├── maps.json
│       └── worlds.json      # (新增) 核心世界定义
│
└── assets/                # 存放图片, 图标等静态资源
    └── icons/
    └── images/
