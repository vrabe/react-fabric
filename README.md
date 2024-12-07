# React Fabric

<p align="center">
  <a href="https://www.npmjs.com/package/react-fabric"><img src="https://img.shields.io/npm/v/react-fabric.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/react-fabric"><img src="https://img.shields.io/npm/dm/react-fabric.svg" alt="npm downloads"></a>
  <a href="https://github.com/vaynevayne/react-fabric/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-fabric.svg" alt="license"></a>
</p>

[English](#english) | [中文](#中文)

## English

### Introduction

React Fabric is a powerful React wrapper for Fabric.js, providing a declarative way to work with HTML5 Canvas. It offers seamless integration between React and Fabric.js, making canvas manipulation more intuitive for React developers.

### Features

- 🎨 **Declarative API**: Write canvas elements as React components
- 🔄 **State Management**: Built-in state management with Provider pattern
- 📦 **Component Based**: Reusable canvas components (Rect, Image, Text, etc.)
- 🛠 **TypeScript Support**: Built with TypeScript for better development experience
- 🔌 **Plugin System**: Extensible plugin architecture

### Installation

```bash
npm install react-fabric2
# or
yarn add react-fabric2
# or
pnpm add react-fabric2
```

### Usage

#### Basic Usage

```tsx
import { ReactFabric, Rect } from 'react-fabric2'

function App() {
  return (
    <ReactFabric 
      width={800} 
      height={600}
      defaultCentered
      onMouseDown={(e) => console.log('Canvas MouseDown:', e)}
      onMouseMove={(e) => console.log('Canvas MouseMove:', e)}
    >
      <Rect 
        width={100}
        height={100}
        fill="red"
        left={100}
        top={100}
        onSelected={(e) => console.log('Rect Selected:', e)}
      />
    </ReactFabric>
  )
}
```

#### Using Provider Pattern

```tsx
import { ReactFabric, ReactFabricProvider, useReactFabric } from 'react-fabric2'

// Toolbar component with canvas controls
function Toolbar() {
  const { 
    canvas,      // fabric.js canvas instance
    zoomIn,      // zoom in canvas
    zoomOut,     // zoom out canvas
    setDraggable,// enable/disable dragging
    setZoomable, // enable/disable zooming
    setSelection // enable/disable selection
  } = useReactFabric()
  
  return (
    <div className="toolbar">
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={() => setDraggable(true)}>Enable Drag</button>
    </div>
  )
}

function App() {
  return (
    <ReactFabricProvider>
      <ReactFabric 
        width={800} 
        height={600}
        defaultCentered
      >
        <Rect 
          width={100} 
          height={100} 
          fill="red"
          onSelected={(e) => console.log('Selected:', e)} 
        />
        <BackgroundImage src="bg.png" scaleToFit />
      </ReactFabric>
      <Toolbar />
    </ReactFabricProvider>
  )
}
```

### Built-in Plugins

React Fabric comes with several built-in plugins:

```tsx
<ReactFabric>
  {/* Grid Background Plugin */}
  <PluginGrid />
  
  {/* Free Rectangle Drawing Plugin */}
  <PluginFreeRect
    onComplete={(rect) => {
      console.log('Rectangle created:', rect)
    }}
  />
</ReactFabric>
```

### Comparison with Other Libraries

| Feature | React Fabric | react-konva | react-fabricjs |
|---------|-------------|-------------|----------------|
| State Management | ✅ Built-in Provider & Hooks | ❌ Manual State Handling | ⚠️ Limited |
| Cross-Component Communication | ✅ Global State Access | ❌ Props Only | ❌ Props Only |
| Plugin System | ✅ Built-in Plugins | ❌ No | ❌ No |
| Event System | ✅ Unified Event API | ⚠️ Mixed DOM/Canvas Events | ⚠️ Limited |
| TypeScript Support | ✅ Full | ✅ Full | ❌ Limited |
| Fabric.js Version | ✅ Latest (v6) | ❌ N/A | ❌ Outdated |
| Bundle Size | 🟢 Small | 🟡 Medium | 🔴 Large |
| Active Maintenance | ✅ Active | ✅ Active | ❌ Inactive |

### Roadmap 🗺️

#### Current Features ✅
- Basic shapes (Rect, Path)
- Image & Background image support
- Text rendering
- Group support
- Zoom controls
- Object dragging
- Plugin system
  - Grid plugin
  - FreeRect plugin

#### Coming Soon 🚀
- [ ] Enhanced Plugin System
  - [ ] Plugin API documentation
  - [ ] Custom plugin creation guide
  - [ ] More built-in plugins
- [ ] Enhanced object manipulation
  - [ ] Advanced control customization
  - [ ] Smart guides
  - [ ] Object constraints

## 中文

### 简介

React Fabric 是一个强大的 Fabric.js React 封装库，提供了声明式的方式来操作 HTML5 Canvas。它实现了 React 和 Fabric.js 的无缝集成，让 React 开发者能够更直观地进行 Canvas 操作。

### 特性

- 🎨 **声明式 API**：以 React 组件方式编写 Canvas 元素
- 🔄 **状态管理**：内置 Provider 模式的状态管理
- 📦 **组件化**：可复用的 Canvas 组件（矩形、图片、文本等）
- 🛠 **TypeScript 支持**：使用 TypeScript 构建，提供更好的开发体验
- 🔌 **插件系统**：可扩展的插件架构

### 安装

```bash
npm install react-fabric2
# 或
yarn add react-fabric2
# 或
pnpm add react-fabric2
```

### 使用方法

#### 基础用法

```tsx
import { ReactFabric, Rect } from 'react-fabric2'

function App() {
  return (
    <ReactFabric 
      width={800} 
      height={600}
      defaultCentered
      onMouseDown={(e) => console.log('画布鼠标按下:', e)}
      onMouseMove={(e) => console.log('画布鼠标移动:', e)}
    >
      <Rect 
        width={100}
        height={100}
        fill="red"
        left={100}
        top={100}
        onSelected={(e) => console.log('矩形被选中:', e)}
      />
    </ReactFabric>
  )
}
```

#### 使用 Provider 模式

```tsx
import { ReactFabric, ReactFabricProvider, useReactFabric } from 'react-fabric2'

// 工具栏组件，用于控制画布
function Toolbar() {
  const { 
    canvas,      // fabric.js 画布实例
    zoomIn,      // 放大画布
    zoomOut,     // 缩小画布
    setDraggable,// 设置是否可拖拽
    setZoomable, // 设置是否可缩放
    setSelection // 设置是否可选择
  } = useReactFabric()
  
  return (
    <div className="toolbar">
      <button onClick={zoomIn}>放大</button>
      <button onClick={zoomOut}>缩小</button>
      <button onClick={() => setDraggable(true)}>启用拖拽</button>
    </div>
  )
}

function App() {
  return (
    <ReactFabricProvider>
      <ReactFabric 
        width={800} 
        height={600}
        defaultCentered
      >
        <Rect 
          width={100} 
          height={100} 
          fill="red"
          onSelected={(e) => console.log('已选中:', e)} 
        />
        <BackgroundImage src="bg.png" scaleToFit />
      </ReactFabric>
      <Toolbar />
    </ReactFabricProvider>
  )
}
```

### 内置插件

React Fabric 提供了多个内置插件：

```tsx
<ReactFabric>
  {/* 网格背景插件 */}
  <PluginGrid />
  
  {/* 矩形绘制插件 */}
  <PluginFreeRect
    onComplete={(rect) => {
      console.log('矩形已创建:', rect)
    }}
  />
</ReactFabric>
```

### 与其他库的对比

| 特性 | React Fabric | react-konva | react-fabricjs |
|---------|-------------|-------------|----------------|
| 状态管理 | ✅ 内置 Provider 和 Hooks | ❌ 手动管理 | ⚠️ 有限 |
| 跨组件通信 | ✅ 全局状态访问 | ❌ 仅支持 Props | ❌ 仅支持 Props |
| 插件系统 | ✅ 内置插件 | ❌ 无 | ❌ 无 |
| 事件系统 | ✅ 统一的事件 API | ⚠️ 混合 DOM/Canvas 事件 |

## License

MIT License © 2024 [vaynevayne](https://github.com/vaynevayne)
