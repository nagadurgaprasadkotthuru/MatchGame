import './index.css'

const Tabs = props => {
  const {tabDetails, onTabChange, isActive} = props
  const {tabId, displayText} = tabDetails
  const tabChange = () => onTabChange(tabId)
  console.log(isActive)
  const activeTabClass = isActive ? 'active-tab' : ''
  console.log(activeTabClass)
  return (
    <li className="tab-element">
      <button
        className={`tab ${activeTabClass}`}
        type="button"
        onClick={tabChange}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tabs
