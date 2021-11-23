import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and conditions</span>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={!disabled}
          onChange={(e) => {
            setDisabled(!e.target.checked);
          }}
          label={checkboxLabel}
        ></Form.Check>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
