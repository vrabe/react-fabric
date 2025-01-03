组件:

- ReactFabric
- Rect
- Path
- BackgroundImage
- Group
- Text

### 用法:

- 受控模式

```jsx
<ReactFabric defaultCentered defaultSelection={false}>
  <BackgroundImage scaleToFit src={imgBaseURL + currentSrc} />
  <Rect width={100} height={100} left={100} top={100} />
  <Path path="M 0 0 L 100 100" />
  <Objects objects={[]} />
</ReactFabric>
```

组件:

- ReactFabric
- defaultSelection:修改fabric默认值; 接受 Fabric Canvas 类的所有 props, 但建议使用非受控模式,目前仅支持一个非受控属性 `defaultSelection={false}`,受控用法暂未测试
- defaultCentered: 背景图是否居中显示

- BackgroundImage
  scaleToFit 缩放背景图以适应屏幕
  scaleToCover 缩放背景图以适应屏幕,另一张模式
  其他 FabricImage 的 props

- Rect 矩形

  - 接受 Fabric Rect 类的所有 props, 提供工具函数 `getRectProps` 生成矩形属性

- Path 路径

  - 接受 Fabric Path 类的所有 props

- Group 组

  - 接受 Fabric Group 类的所有 props, 用于整体拖动场景

- Text 文本

  - 接受 Fabric Text 类的所有 props

- Objects
  objects 数组类型,用于从数据动态生成所有图形, 需要 type 字段

- Control
- dom 控件,用于实现tooltip效果
  - closeOnOutsideClick 是否在点击外部时关闭,默认true
  - Content 内容
  - placement 位置 参考 floating-ui 文档
  - open 是否打开
  - onOpenChange 打开状态改变时触发
    支持 Control 嵌套,理论上无限嵌套

事件:

- 所有组件均支持所有内部事件,规则为前面加on, 小驼峰, 比如 canvas `mouse:down` -> `onMouseDown`, 有类型提示

### 状态管理

`ReactFabricProvider` + `useReactFabric`

```jsx
const Toolbar = () => {
  const { setMinManualZoom, setMaxManualZoom, reset, setDefaultSelection, canvas } = useReactFabric()
  return <div>Toolbar</div>
}

const Main = () => {
  return (
    <ReactFabricProvider>
      <ReactFabric>
        <BackgroundImage scaleToFit src={imgBaseURL + currentSrc} />
      </ReactFabric>
      <Toolbar />
    </ReactFabricProvider>
  )
}
```

- 受控模式

```jsx

const [rect, setRect] = useState({
  points: '100,100,200,200,300,300,400,400',
})

<ReactFabric>
  <Rect
    left={getRectProps(rect?.points, 5)?.left}
    top={getRectProps(rect?.points, 5)?.top}

```
