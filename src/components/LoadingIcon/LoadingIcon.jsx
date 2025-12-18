import './LoadingIcon.css'
import loadingGIF from '../../assets/loading.gif'

const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={loadingGIF} alt="loading" />
    </div>
  )
}

export default LoadingIcon