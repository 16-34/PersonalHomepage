# Personal Homepage

一个简洁的个人主页/作品集网站（**整个项目由 vibe coding 完成, 每一次 commit 为项目一轮对话的修改, commit message 记录了该轮次的提示词与所用模型**）。

## 技术栈

- HTML5
- CSS3 (自定义属性、动画)
- Vanilla JavaScript
- 无框架依赖

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
├── config/
│   └── config.js       # 个人信息配置
└── README.md
```

## 配置说明

编辑 `config/config.js` 自定义个人信息：

```javascript
const config = {
    personalInfo: {
        nickname: "你的昵称",
        occupation: "职业描述",
        email: "your@email.com",
        avatar: "头像图片路径",
    },
    socialLinks: {
        github: { name: "GitHub", url: "链接地址" },
        qq: { name: "QQ", qrCode: "二维码图片路径" },
        wechat: { name: "微信", qrCode: "二维码图片路径" },
    },
};
```

## 功能特性

- 自定义鼠标光标效果
- 滚动进度条
- 移动端适配
- 作品筛选
- 社交链接二维码悬停显示
- 滚动动画

## 使用方式

直接用浏览器打开 `index.html` 即可预览。

```bash
# 或使用本地服务器
npx serve .
```
