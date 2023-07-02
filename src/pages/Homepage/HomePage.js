import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

async function fetchData(page) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/lesson/?page=${page}`
  );
  const data = await response.json();
  return data;
}

const HomePage = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(searchTerm);

  useEffect(() => {
    const loadItems = async () => {
      const newItems = await fetchData(page);
      setAllItems((prevItems) => [...prevItems, ...newItems]);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
      setIsLoading(false);
    };
    loadItems();
  }, [page]);

  useEffect(() => {
    // filter allItems based on searchTerm and set the result to filteredItems
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      setFilteredItems(
        allItems.filter((item) =>
          item.title.toLowerCase().includes(lowercasedSearchTerm)
        )
      );
    } else {
      setFilteredItems(allItems);
    }
  }, [allItems, searchTerm]);

  const handleOptionChange = (questionId, option, answer) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionId]: option === answer ? "Correct!" : "Incorrect, try again.",
    }));
  };

  if (isLoading) {
    return <div className="body-content">Loading...</div>;
  }

  return (
    <>
      <button
        className="float-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Sidebar
        items={allItems}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <InfiniteScroll
        dataLength={filteredItems.length}
        next={() => {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>End of content</p>}
      >
        {filteredItems.map((item, itemIndex) => (
          <div className="wrapper">
            <div
              id={`section-${item.sectionId}`}
              key={`${item.sectionId}-${itemIndex}`}
              className="body-content"
              // key={`${item.sectionId}-${itemIndex}`}
            >
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
    </>
  );
};

export default HomePage;
