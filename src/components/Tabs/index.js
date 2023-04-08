import './index.css'

const Tabs = props => {
  const {tabDetails, onTabChange} = props
  const {tabId, displayText} = tabDetails
  const tabChange = () => onTabChange(tabId)
  return (
    <li className="tab-element">
      <button className="tab" type="button" onClick={tabChange}>
        {displayText}
      </button>
    </li>
  )
}

export default Tabs
