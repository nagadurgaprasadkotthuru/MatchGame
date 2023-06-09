import './index.css'

const ScoreCard = props => {
  const {score, onPlayAgain} = props
  const playAgain = () => onPlayAgain()
  return (
    <div className="score-card-container">
      <img
        className="trophy"
        alt="trophy"
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
      />
      <p className="your-score-description">YOUR SCORE</p>
      <h1 className="your-score">{score}</h1>
      <button className="play-again-button" type="button" onClick={playAgain}>
        <img
          className="reset-icon"
          alt="reset"
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
        />
        Play Again
      </button>
    </div>
  )
}

export default ScoreCard
