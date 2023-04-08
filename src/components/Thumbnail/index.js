import './index.css'

const Thumbnail = props => {
  const {thumbnailDetails, onMatch} = props
  const {thumbnailUrl, imageUrl} = thumbnailDetails
  const match = () => onMatch(imageUrl)
  return (
    <li className="thumbnail-element">
      <button className="button" type="button" onClick={match}>
        <img className="thumbnail" alt="thumbnail" src={thumbnailUrl} />
      </button>
    </li>
  )
}

export default Thumbnail
