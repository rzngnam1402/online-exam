import React, { useState, useEffect } from "react";
import questionsData from "../data/questions.json";
import correctAnswers from "../data/answers.json";
import {
  Container,
  Form,
  Button,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    for (const questionId in responses) {
      if (responses[questionId] === correctAnswers[questionId]) {
        newScore += 1;
      }
    }
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <Container>
      {!submitted ? (
        <>
          <h2 className="my-4">Quiz</h2>
          {questions.map((q) => (
            <Card key={q.id} className="mb-3">
              <Card.Body>
                <Card.Title>{q.question}</Card.Title>
                {q.options.map((option, index) => (
                  <Form.Check
                    type="radio"
                    key={index}
                    label={option}
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleChange(q.id, option)}
                  />
                ))}
              </Card.Body>
            </Card>
          ))}
          <Button onClick={handleSubmit} className="mt-4 mb-4">
            Submit
          </Button>
        </>
      ) : (
        <>
          <h2  className="my-4">Result</h2>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Your Score</Card.Title>
              <h3>
                <Badge bg="success">{score}</Badge> / {questions.length}
              </h3>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Review Answers</Card.Title>
              <ListGroup variant="flush">
                {questions.map((q) => (
                  <ListGroup.Item key={q.id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{q.question}</strong>
                        <br />
                        <span>Your answer: {responses[q.id]}</span>
                        <br />
                        <span>
                          Correct answer:{" "}
                          <Badge
                            className="mr-4"
                            bg={
                              responses[q.id] === correctAnswers[q.id]
                                ? "success"
                                : "danger"
                            }
                          >
                            {correctAnswers[q.id]}
                          </Badge>
                        </span>
                      </div>
                      <div>
                        {responses[q.id] === correctAnswers[q.id] ? (
                          <Badge bg="success">Correct</Badge>
                        ) : (
                          <Badge bg="danger">Incorrect</Badge>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Quiz;
