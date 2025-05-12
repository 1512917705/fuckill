UI 逻辑文档
本文档旨在描述文字冒险游戏前端 UI Demo 的各个页面的布局和交互逻辑。
1. 玩家页面 (UI.html)
文件: UI.html (对应 UI_html_with_menu ID)
概述:
玩家页面是游戏的主要界面，采用三栏布局（大屏幕）或单列布局（小屏幕），顶部包含一个全局菜单栏。玩家在此界面查看角色状态、接收事件信息、做出选择以及与游戏世界交互。
布局与功能:
1.顶部菜单栏 (<header class="top-menu-bar">)
○左侧:
■游戏标题 (.menu-title): 显示加粗的游戏名称 "文字冒险游戏"。
■世界选择下拉菜单 (#world-dropdown):
■显示当前所在世界名称 (#current-world-name)。
■点击按钮 (#world-select-btn) 展开/收起世界列表 (#world-dropdown-content)。
■点击下拉列表中的世界名称 (<a> 标签) 触发 handleWorldSelect() 函数，切换当前世界（目前仅更新显示名称并弹出提示）。
○右侧:
■设置下拉菜单 (.settings-dropdown):
■设置图标按钮 (#settings-btn) 点击时展开/收起设置选项 (#settings-dropdown-content)。
■下拉选项包括：用户信息、导入、导出、AI设置、管理员模式。
■点击“管理员模式”会调用 handleMenuClick('admin_mode') 打开管理员模式选择弹窗。
■其他选项目前仅弹出提示。
2.主内容区 (.main-container)
○左栏 (人物状态模块 lg:w-1/4):
■标题与按钮: 显示“人物状态”标题，包含“详情”(details-btn)和“合成”(synthesis-btn)按钮，点击分别打开对应的模态框。
■资源条: 显示生命值 (HP) 和法力值 (MP) 的进度条及数值 (#hp-bar, #mp-bar)。
■核心属性 (#attributes-section): 可折叠区域，显示力量、敏捷等六大核心属性的总值。包含 +/- 按钮用于调整基础值（仅用于演示）。
■身份信息 (#identity-section): 可折叠区域，显示玩家名称、阵营、身份列表。
■状态效果 (#status-section): 不可折叠区域，显示角色当前的永久和临时状态效果，鼠标悬停可查看效果描述 (Tooltip)。
■装备 (#equipment-section): 可折叠区域，显示武器、护甲等装备槽位及其当前装备的物品名称，鼠标悬停可查看装备详情 (Tooltip)。
■物品栏 (#inventory-section): 显示物品栏占用情况 (#inventory-summary) 和格子列表 (#inventory-list)，格子内显示物品图标和数量（如有多个）。
○中栏 (事件信息模块 lg:w-1/2):
■标题: 显示“事件信息”。
■事件描述 (#event-description): 显示当前遇到的事件文本描述。
■事件选项 (#event-options): 显示当前事件可供玩家选择的按钮，点击按钮触发 handleOptionClick() 处理选项逻辑。
■事件结果 (#event-result): 显示玩家选择选项后的结果文本，初始隐藏。
○右栏 (世界地图模块 lg:w-1/4):
■标题: 显示“世界地图”。
■地图信息 (#tile-info): 显示玩家当前位置坐标、地形和天气。
■地图网格 (#map-grid): 显示 N x N 的地图格子，每个格子用图标和背景色表示地形。玩家当前位置有特殊标记。点击格子触发 handleMapTileClick()，移动玩家并触发新位置的事件。
3.模态框 (#modal-overlay):
○用于显示人物详情、合成界面、战斗界面和管理员模式选择。
○通过 openModal() 函数打开，closeModal() 关闭。
○点击遮罩层（非战斗/管理员弹窗）可关闭弹窗。
○合成弹窗: 支持图标/列表视图切换，物品拖拽到合成区，显示相关配方，执行合成（伪）。
○战斗弹窗: 显示玩家和敌人信息、战斗日志、技能按钮，处理战斗行动（伪）。
○管理员弹窗: 显示进入各个管理页面的按钮。
4.管理员页面覆盖层 (#admin-page-overlay):
○用于加载和显示各个管理页面的内容 (item_management.html 等)。
○通过 loadAdminPage() 函数加载内容并显示覆盖层，隐藏主界面。
○包含标题 (#admin-page-title) 和内容区域 (#admin-page-content)。
○包含“返回游戏”按钮 (#admin-back-btn)，点击调用 hideAdminPage() 返回主界面。
2. 物品管理页面 (item_management.html)
文件: item_management.html (对应 item_management_html ID)
概述:
此页面用于管理游戏中的所有物品（知识库）和合成公式。采用左右两栏布局。
布局与功能:
1.左栏 (物品知识库 lg:w-3/5):
○标题与控制按钮:
■标题：“物品知识库”。
■“添加新物品”按钮 (#open-add-item-modal-button): 点击打开物品编辑模态框（新增模式）。
■排序下拉框 (#all-items-sort-select): 选择按名称、收藏、常用度等排序物品列表。
■视图切换按钮 (#toggle-all-items-view-button): 在“图标视图”和“列表视图”之间切换。
○筛选区域:
■名称搜索框 (#filter-all-items-input): 输入文字实时筛选物品列表。
■标签筛选 (#all-items-tag-filter):
■显示一级分类按钮 (#all-items-tag-categories-row)。点击一级分类按钮，显示或隐藏对应的二级分类按钮 (#all-items-tag-subcategories-row)。
■二级分类按钮 (.tag-subcategory-btn): 点击切换选中状态，更新筛选条件。
■已选标签显示区域 (#all-items-selected-tags-display): 显示当前选中的所有标签，点击标签可移除。
○物品列表 (#all-items-list-container):
■图标视图 (.all-items-icon-view): 以网格形式展示物品，每个格子显示物品名称和收藏指示器（如果已收藏）。鼠标悬停显示 Tooltip (描述和标签)。
■列表视图 (.all-items-list-view): 以列表形式展示物品，每行显示物品名称、收藏按钮、编辑按钮 (.edit-item-btn) 和删除按钮 (.delete-item-btn)。鼠标悬停显示 Tooltip。
■点击编辑按钮 (handleEditBaseItem) 打开物品编辑模态框（编辑模式）。
■点击删除按钮 (handleDeleteBaseItem) 弹出确认框，确认后执行伪删除。
■点击收藏按钮 (toggleFavorite) 切换物品的收藏状态（伪操作）。
2.右栏 (已知合成公式 lg:w-2/5):
○标题: “已知合成公式”。
○公式筛选区域 (.formula-filter-section): (v5 新增)
■物品选择列表 (#formula-filter-item-list): 显示所有物品名称及其复选框。
■选中状态 (#formula-filter-selected-items): 显示当前勾选用于筛选的物品名称。
■清除按钮 (#clear-formula-filter-btn): 点击清除所有筛选条件。
■筛选逻辑: 勾选物品复选框后，下方的公式列表会实时更新，只显示输入包含所有已勾选物品的公式（AND 逻辑）。
○公式列表 (#formula-list-container):
■显示筛选后的合成公式 (#formula-list)，格式为“输入物品 -> 输出物品 (概率)”。
■每个公式后有一个删除按钮 (.delete-formula-btn)。
■点击删除按钮 (handleDeleteFormula) 弹出确认框，确认后执行伪删除。
○占位符 (#formula-placeholder): 当没有公式或筛选结果为空时显示提示信息。
3.物品编辑/新增模态框 (#item-modal):
○包含字段：物品名称 (#modal-item-name)、描述 (#modal-item-desc)。
○标签选择区域 (#modal-tag-selection): 按分类显示所有可用标签的复选框。
○按钮：“保存物品” (#modal-save-button，执行伪保存) 和“取消” (#modal-cancel-button)。
3. 生物管理页面 (creature_management.html)
文件: creature_management.html (对应 creature_management_html ID)
概述:
此页面用于管理游戏中的所有生物模板。采用左右两栏布局。
布局与功能:
1.左栏 (生物列表 lg:w-1/3):
○标题与控制按钮:
■标题：“生物列表”。
■“新增生物”按钮 (#new-creature-btn): 点击清空右侧表单，准备创建新生物。
○搜索框 (#search-creature-input): 输入文字实时筛选生物列表。
○生物列表容器 (#creature-list-container):
■显示所有生物的列表 (#creature-list)，按名称排序。
■每个列表项 (.creature-list-item) 显示生物名称。
■点击列表项（非按钮区域）会将该生物数据加载到右侧编辑器 (loadCreatureIntoEditor)，并高亮显示该项。
■每项右侧有“编辑”(edit-creature-btn)和“删除”(delete-creature-btn)按钮。
■点击编辑按钮 (handleEditCreatureClick) 加载该生物数据到右侧编辑器。
■点击删除按钮 (handleDeleteCreatureClick) 弹出确认框，确认后执行伪删除。
2.右栏 (生物编辑器 lg:w-2/3):
○标题 (#editor-title): 根据是新增还是编辑状态显示不同标题。
○生物表单 (#creature-form):
■基本信息: 名称 (#creature-name)、标签 (#creature-tags，逗号分隔)、描述 (#creature-description)。
■核心属性: 力量、敏捷等六个属性的基础值输入框。
■数值资源: 当前 HP (#res-hp-current)、最大 HP (#res-hp-max) 输入框。
■技能/能力: 文本域 (#creature-skills)，每行一个。
■装备: 默认武器 (#creature-weapon)、默认护甲 (#creature-armor) 输入框。
■掉落物: 文本域 (#creature-loot)，输入 JSON 或简单描述。
■阵营: 善良/邪恶 (#ethics-axis)、守序/混乱 (#order-axis) 的滑块，以及实时显示的数值和阵营名称 (#alignment-result)。
■行为模式: 文本输入框 (#creature-behavior)。
○底部按钮: “保存生物” (#save-creature-btn，执行伪保存) 和“取消” (#cancel-edit-btn)。
4. 事件管理页面 (event_management.html)
文件: event_management.html (对应 event_management_html ID)
概述:
此页面用于创建、编辑和管理游戏事件及其选项。采用左右两栏布局，并在右侧编辑器顶部增加了 AI 辅助功能。
布局与功能:
1.左栏 (事件列表 lg:w-1/3):
○控制按钮:
■“新建事件”按钮 (#new-event-btn): 点击在右侧加载一个空白的事件编辑器。
○筛选/搜索:
■名称搜索框 (#search-event-input): 实时筛选事件列表。
■类型筛选下拉框 (#filter-event-select): 按“全部”、“根事件”、“公共事件”筛选。
○事件列表容器 (#event-list-container):
■显示筛选/搜索后的事件列表 (#event-list)，按名称排序。
■每个列表项 (.event-list-item) 显示事件名称，并用图标区分根事件、公共事件、战斗事件。
■点击列表项（非按钮区域）加载事件到右侧编辑器 (renderEventEditor)，并高亮显示该项。
■每项右侧有“编辑”(edit-event-btn)和“删除”(delete-event-btn)按钮。
■点击编辑按钮加载事件到编辑器。
■点击删除按钮 (handleEventListButtonClick) 弹出确认框，确认后执行伪删除。
2.右栏 (事件编辑器 lg:w-2/3):
○AI 补充区域 (.ai-supplement-section):
■文本输入框 (#ai-suggestion-input): 用于输入给 AI 的建议或提示。
■“AI 补充”按钮 (#ai-supplement-btn): 点击触发 handleAiSupplement 函数（目前仅打印日志和提示）。
○事件表单 (#event-form):
■基本信息: 事件 ID (隐藏, #event-id)、名称 (#event-name)、类型 (#event-type 下拉框)、是否根事件 (#event-is-root 复选框)。
■触发条件: 前置条件 (#event-preconditions JS 代码)、互斥条件 (#event-mutex-conditions JS 代码)。
■限制条件: 时间 (#event-time)、地点 (#event-location)、天气 (#event-weather)，均为逗号分隔文本。
■描述: 可见描述 (#event-visible-desc)、条件描述 (#event-conditional-desc JS 代码, 每行一个)、隐藏描述 (#event-hidden-desc)。
■生物: 可见生物 (#event-visible-creatures)、隐藏生物 (#event-hidden-creatures)，均为逗号分隔文本。
■AI 相关: 最大收益描述 (#event-max-gain)。
○选项管理区域 (#options-list):
■显示当前事件的所有选项列表。
■每个选项 (.option-item) 显示标题、ID、文本、条件、跳转目标、结果效果等信息。
■每个选项有“编辑”(edit-option-btn)和“删除”(delete-option-btn)按钮。
■点击编辑按钮 (handleOptionButtonClick) 打开选项编辑模态框。
■点击删除按钮 (handleOptionButtonClick) 弹出确认框，确认后执行伪删除。
○添加选项按钮 (#add-option-btn): 点击打开选项编辑模态框（新增模式）。
○表单底部按钮: “保存事件” (#save-event-btn，执行伪保存) 和“取消” (#cancel-edit-btn)。
○占位符 (#event-placeholder): 当没有选择事件时显示提示信息。
3.选项编辑模态框 (#option-modal):
○用于添加或编辑事件选项。
○包含字段：选项 ID (隐藏, #option-id)、父事件 ID (隐藏, #option-parent-event-id)、标题 (#option-title)、是否结束事件 (#option-is-end 复选框)、文本 (#option-text)、显示条件 (#option-condition JS)、概率显示 (#option-probability-display JS)、调用函数 (#option-function-call JS)、成功/失败跳转事件 (#option-success-event-id, #option-failure-event-id 下拉框，动态填充可选事件)、直接结果效果 (#option-result-effects JSON 文本域)。
○按钮：“保存选项” (#option-modal-save-btn，执行伪保存) 和“取消” (#option-modal-cancel-btn)。
5. 地图管理页面 (map_management.html)
文件: map_management.html (对应 map_management_html ID)
概述:
此页面用于创建、编辑和管理游戏地图及其格子信息。采用左右两栏布局。
布局与功能:
1.左栏 (地图列表 lg:w-1/3):
○控制按钮:
■“新建地图”按钮 (#new-map-btn): 点击切换右侧视图到新建地图状态。
○搜索框 (#search-map-input): 输入文字实时筛选地图列表。
○地图列表容器 (#map-list-container):
■显示所有地图的列表 (#map-list)，按名称排序。
■每个列表项 (.map-list-item) 显示地图名称和尺寸。
■点击列表项（非按钮区域）加载地图到右侧编辑器 (loadMapIntoEditor)，并高亮显示该项。
■每项右侧有“删除”(delete-map-btn)按钮。
■点击删除按钮 (handleDeleteMapClick) 弹出确认框，确认后执行伪删除。
2.右栏 (地图编辑器 lg:w-2/3):
○标题 (#editor-title): 根据是新建还是编辑状态显示不同标题。
○新建地图尺寸区域 (#new-map-size-section):
■仅在点击“新建地图”后显示。
■包含尺寸输入框 (#map-size-input)。
■“创建地图”按钮 (#create-map-btn): 点击根据输入尺寸生成新地图数据（伪操作）并显示网格。
■“取消”按钮 (#cancel-create-map-btn): 隐藏此区域，返回占位符状态。
○编辑地图名称区域 (#edit-map-name-section):
■仅在加载现有地图后显示。
■包含名称输入框 (#edit-map-name-input)。
■“保存名称”按钮 (#save-map-name-btn): 点击执行伪保存地图名称。
○地图网格容器 (#map-grid-container):
■用于显示地图网格 (#map-grid)。
■网格根据地图尺寸动态生成。
■每个格子 (.map-tile) 显示图标和背景/前景颜色。
■点击格子 (handleTileClick) 打开格子编辑模态框。
○占位符 (#map-placeholder): 当没有选择或创建地图时显示提示信息。
3.格子编辑模态框 (#tile-edit-modal):
○用于编辑单个格子的信息。
○标题显示格子坐标 (#tile-modal-title)。
○包含隐藏的坐标和地图 ID 输入框。
○包含编辑字段：地形 (#tile-terrain)、天气 (#tile-weather)、图标 (#tile-icon)、背景色 (#tile-bgcolor)、前景色 (#tile-fgcolor)、建筑 (#tile-buildings 逗号分隔)。
○按钮：“保存格子” (#tile-modal-save-btn，执行伪保存) 和“取消” (#tile-modal-cancel-btn)。