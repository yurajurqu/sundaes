import { Col, Form, Row } from "react-bootstrap";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      ></img>
      <Form.Group
        controlId={`${name}-topping-checkbox`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Check
          type="checkbox"
          onChange={handleChange}
          label={name}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
}
