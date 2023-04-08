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

  getMatchImage = () => {
    const {imagesList} = this.props
    const randomIndexForMatchImage = Math.floor(Math.random() * 30)
    return imagesList[randomIndexForMatchImage].imageUrl
  }

  state = {
    activeTab: this.getFirstTab(),
    timerCount: 60,
    score: 0,
    matchImage: this.getMatchImage(),
  }

  onMatch = imageUrl => {
    const {matchImage} = this.state
    if (imageUrl === matchImage) {
      this.setState(prevState => ({score: prevState.score + 1}))
      this.setState({matchImage: this.getMatchImage()})
    }
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
    }
  }

  getGamePlayGround = () => {
    const {tabsList, imagesList} = this.props
    const {activeTab, matchImage} = this.state
    const filteredList = imagesList.filter(each => each.category === activeTab)
    return (
      <div className="container">
        <div className="match-image-container">
          <img className="match-image" alt="match" src={matchImage} />
        </div>
        <ul className="tabs-container">
          {tabsList.map(each => (
            <Tabs
              tabDetails={each}
              key={each.tabId}
              onTabChange={this.onTabChange}
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
      </div>
    )
  }

  render() {
    const {timerCount, score} = this.state
    return (
      <div className="bg-container">
        <nav className="navbar">
          <img
            className="game-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          />
          <div className="score-timer-container">
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
          </div>
        </nav>
        {timerCount > 0 ? (
          this.getGamePlayGround()
        ) : (
          <ScoreCard score={score} />
        )}
      </div>
    )
  }
}

export default MatchGame
