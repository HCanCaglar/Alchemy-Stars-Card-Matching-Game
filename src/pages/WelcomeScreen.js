import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserName,
  setHighestScore,
  setLoggedIn,
} from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputUserName, setInputUserName] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const getUserScoreIfExists = (nameToCheck) => {
    const existingLeaderboard = localStorage.getItem(
      "cardMatchingGameLeaderboard"
    );
    let leaderboard = existingLeaderboard
      ? JSON.parse(existingLeaderboard)
      : [];
    const foundUser = leaderboard.find((u) => u.userName === nameToCheck);
    if (foundUser) {
      return foundUser.highestScore;
    } else {
      return null;
    }
  };

  const onNameChange = (e) => {
    setInputUserName(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowErrorMessage(false);
    }
  };
  const onSubmitName = (e) => {
    e.preventDefault();
    if (inputUserName.trim() !== "") {
      const existingHighScore = getUserScoreIfExists(inputUserName.trim());
      setShowErrorMessage(false);

      dispatch(setUserName({ userName: inputUserName.trim() }));
      dispatch(setLoggedIn({ loggedIn: true }));

      if (existingHighScore !== null) {
        dispatch(setHighestScore({ highestScore: existingHighScore }));
        navigate("/countdown");
      } else {
        dispatch(setHighestScore({ highestScore: 0 }));
        navigate("/countdown");
      }
    } else {
      setShowErrorMessage(true);
      return;
    }
  };

  return (
    <div className="welcome-screen">
      <h1 className="welcome-title">
        Welcome to Alchemy Stars Card Matching Game!
      </h1>
      <form onSubmit={onSubmitName}>
        <div className="welcome-form">
          <label className="welcome-label">Navigator's name:</label>

          <input
            value={inputUserName}
            type="text"
            onChange={onNameChange}
            className="welcome-input"
          />
        </div>
        <button type="submit" className="button">
          Start the Game!
        </button>

        {showErrorMessage && <span>please enter your username</span>}
      </form>
    </div>
  );
};

export default WelcomeScreen;
