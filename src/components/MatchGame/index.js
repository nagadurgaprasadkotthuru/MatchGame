import {Component} from 'react'

import Tabs from '../Tabs'

import Thumbnail from '../Thumbnail'

import ScoreCard from '../ScoreCard'

import './index.css'

class MatchGame extends Component {
  // eslint-disable-next-line react/sort-comp
  getFirstTab = () => {
    const {tabsList} = this.props
    return tabsList[0].tabId
  }

  getFirstMatchImage = () => {
    const {imagesList} = this.props
    return imagesList[0].imageUrl
  }

  state = {
    activeTab: this.getFirstTab(),
    timerCount: 60,
    score: 0,
    matchImage: this.getFirstMatchImage(),
    isShowScoreCard: false,
  }

  onPlayAgain = () => {
    clearInterval(this.timerID)
    this.componentDidMount()
    this.setState({
      activeTab: this.getFirstTab(),
      timerCount: 60,
      score: 0,
      matchImage: this.getFirstMatchImage(),
      isShowScoreCard: false,
    })
  }

  getMatchImage = () => {
    const {imagesList} = this.props
    const randomIndexForMatchImage = Math.floor(Math.random() * 30)
    return imagesList[randomIndexForMatchImage].imageUrl
  }

  onTabChange = tabValue => {
    this.setState({activeTab: tabValue})
  }

  componentDidMount() {
    this.timerID = setInterval(this.timer, 1000)
  }

  timer = () => {
    const {timerCount} = this.state
    if (timerCount > 0) {
      this.setState(prevState => ({timerCount: prevState.timerCount - 1}))
    } else {
      clearInterval(this.timerID)
      this.setState(prevState => ({
        isShowScoreCard: !prevState.isShowScoreCard,
      }))
    }
  }

  onMatch = imageUrl => {
    const {matchImage} = this.state
    if (imageUrl === matchImage) {
      this.setState(prevState => ({score: prevState.score + 1}))
      this.setState({matchImage: this.getMatchImage()})
    } else {
      clearInterval(this.timerID)
      this.setState(prevState => ({
        isShowScoreCard: !prevState.isShowScoreCard,
      }))
    }
  }

  getGamePlayGround = () => {
    const {tabsList, imagesList} = this.props
    const {activeTab, matchImage} = this.state
    const filteredList = imagesList.filter(each => each.category === activeTab)
    return (
      <>
        <div className="match-image-container">
          <img className="match-image" alt="match" src={matchImage} />
        </div>
        <ul className="tabs-container">
          {tabsList.map(each => (
            <Tabs
              tabDetails={each}
              key={each.tabId}
              onTabChange={this.onTabChange}
              isActive={activeTab === each.tabId}
            />
          ))}
        </ul>
        <ul className="thumbnails-container">
          {filteredList.map(each => (
            <Thumbnail
              thumbnailDetails={each}
              key={each.id}
              onMatch={this.onMatch}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {timerCount, score, isShowScoreCard} = this.state
    return (
      <div className="bg-container">
        <nav className="navbar">
          <ul className="nav-items-container">
            <li className="nav-item">
              <img
                className="game-logo"
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              />
            </li>
            <li className="score-timer-container">
              <p className="score">
                Score: <span className="score-in-num">{score}</span>
              </p>
              <p className="timer">
                <img
                  className="timer-logo"
                  alt="timer"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                />
                {timerCount} secs
              </p>
            </li>
          </ul>
        </nav>
        {isShowScoreCard ? (
          <ScoreCard score={score} onPlayAgain={this.onPlayAgain} />
        ) : (
          this.getGamePlayGround()
        )}
      </div>
    )
  }
}

export default MatchGame
