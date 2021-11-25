import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import SummaryForm from "./pages/summary/SummaryForm";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary and entry page need provider */}
        <OrderEntry></OrderEntry>
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
