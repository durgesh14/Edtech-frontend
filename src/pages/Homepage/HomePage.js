import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";

async function fetchData(page) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/lesson/?page=${page}`
  );
  const data = await response.json();
  return data;
}

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const loadItems = async () => {
      const newItems = await fetchData(page);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      }
    };
    loadItems();
  }, [page]);

  const handleOptionChange = (questionId, option, answer) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionId]: option === answer ? "Correct!" : "Incorrect, try again.",
    }));
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => {
        if (hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>End of content</p>}
    >
      {items.map((item, itemIndex) => (
        <div className="wrapper">
          <div className="body-content" key={`${item.sectionId}-${itemIndex}`}>
            <h2 className="section-title">{item.title}</h2>
            {item.images.map((image, imageIndex) => (
              <div className="banner" key={`${item.sectionId}-${itemIndex}`}>
                <img
                  className="banner-img"
                  key={`${item.sectionId}-${itemIndex}-${imageIndex}`}
                  src={image}
                  alt=""
                />
                <div className="banner-text">
                  <h2>{item.title}</h2>
                </div>
              </div>
            ))}
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
            {item.videoId ? <YoutubeEmbed embedId={item.videoId} /> : ""}

            <h3 className="quiz-title">{`< Quiz />`}</h3>
            {item.quiz.questions.map((question, questionIndex) => (
              <div key={`${item.sectionId}-${itemIndex}-${questionIndex}`}>
                <p>{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={`${item.sectionId}-${itemIndex}-${questionIndex}-${optionIndex}`}
                  >
                    <input
                      className="radio-option"
                      type="radio"
                      id={`option-${item.sectionId}-${itemIndex}-${questionIndex}-${optionIndex}`}
                      name={`question-${item.sectionId}-${itemIndex}-${questionIndex}`}
                      value={option}
                      onChange={() =>
                        handleOptionChange(
                          `${item.sectionId}-${itemIndex}-${questionIndex}`,
                          option,
                          question.answer
                        )
                      }
                    />
                    <label
                      htmlFor={`option-${item.sectionId}-${itemIndex}-${questionIndex}-${optionIndex}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
                {feedback[
                  `${item.sectionId}-${itemIndex}-${questionIndex}`
                ] && (
                  <span
                    className={
                      feedback[
                        `${item.sectionId}-${itemIndex}-${questionIndex}`
                      ] === "Correct!"
                        ? "feedback-message correct"
                        : "feedback-message incorrect"
                    }
                  >
                    {
                      feedback[
                        `${item.sectionId}-${itemIndex}-${questionIndex}`
                      ]
                    }
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default HomePage;
