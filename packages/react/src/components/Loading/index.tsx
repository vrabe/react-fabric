import { LoadingOutlined } from '@ant-design/icons'
import { useStore } from '../../hooks/useStore'

// bg-[hsla(221,14%,4%,0.6)
const Loading = () => {
  const loading = useStore(state => state.loading)

  return loading ? (
    <div className="absolute inset-0 z-[40] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 ]"></div>
      <LoadingOutlined spin className="text-lg text-[var(--color-primary)]" />
    </div>
  ) : null
}

export default Loading
