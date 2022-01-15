import { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuotationTable from "./QuotationTable";
import { Container ,Row, Col, Form, Button} from "react-bootstrap";
import useLocalStorage from "react-localstorage-hook";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();
  
  
  const  [dataItems, setDataItems] = useLocalStorage("dataItems1",[]);
  const  [discount, setDiscount]= useLocalStorage("discount",0)
  console.log(discount)
  console.log(dataItems)
  const productList = [
    {id:"p001",name:'Iphone 13', price:30000},
    {id:"p002",name:'Cat', price: 100000},
    {id:"p003",name:'Ipad Air', price:40000},
    {id:"p004",name:'Macbook', price:50000},
  ];

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }

    const pid =itemRef.current.value
    const product = productList.find(e => e.id === pid)

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,

    };
  
    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    console.log("after", dataItems);
  }
  const addDiscount = () => {
    const previousDiscount = parseInt(discount)
    const currentDiscount = parseInt(disRef.current.value)
    const dis = previousDiscount + currentDiscount
    setDiscount(dis);
  }

  const productChange =(e) => {
  
    const pid =itemRef.current.value;
    const product = productList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  }

  const options =productList.map(v=>{
    return <option value={v.id}>{v.name}</option>
  })
  return (
    <Container>
      <Row>
      <Col xs={5} style={{backgrondColor:'#eaeaea'}}> 
      <Form>
    <Form.Group className="mb-3" controlId="formItem">
    <Form.Label>Item</Form.Label>
    <Form.Select aria-label="Default select example" ref={itemRef}
    onChange={productChange}
    >
      {options}
</Form.Select>
   </Form.Group>

   <Form.Group className="mb-3" controlId="formPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef} />
   </Form.Group>

   <Form.Group className="mb-3" controlId="formQuantity">
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
    
   </Form.Group>
  <Button variant="outline-dark" onClick={addItem}>
    Add
   </Button>
    
    <Form.Group>
   <Form.Label>Discount</Form.Label>
    <Form.Control type="number" placeholder="Add discount" ref={disRef} />
    </Form.Group>
   <p></p>
   <Button variant="outline-dark" onClick={addDiscount}>
    Add
   </Button>
    
   
     </Form>
        
      </Col>
      <Col>
      <QuotationTable data={dataItems} setDataItems={setDataItems} discount={discount} setDiscount={setDiscount} />
      </Col>
      </Row>
      </Container>
  );
}

export default App;
