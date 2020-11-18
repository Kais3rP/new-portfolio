import { Container, Row, Col } from "react-bootstrap"
import Navbar from "../../components/navbar/index"
import CentralBody from "../../components/central-body/index"
import './index.css'

export default function App() {
  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
<Navbar />
   <CentralBody />  
        </Col>
      </Row>
    </Container>
  );
}


