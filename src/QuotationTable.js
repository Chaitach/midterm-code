import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button,} from "react-bootstrap";
import {FaTrash} from 'react-icons/fa';

const styles ={
  textCenter : {textAlign: 'center'},
  textRight : {textAlign: 'right'},

}

function QuotationTable({ data, setDataItems, discount, setDiscount}) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    let sum= 0
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      sum += amount
      
      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style ={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style ={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style ={styles.textRight}>{numberWithCommas(amount)}</td>
          <td style ={styles.textRight}></td>

          {/* <td style ={styles.textRight}>{numberWithCommas(v.discount)}</td>  */}
        </tr>
      );
    }); 

    setDataRows(z);
    setTotalPrice(sum)
  }, [data]);

  const deleteClick = (i) => {
    console.log(i)
    data.splice(i,1)
    setDataItems([...data])
  }


  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const clearTable = () => {
    setDiscount(0)
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
        <h1>Quotation</h1>
        </Col>
      <Col style ={styles.textRight}>
      <Button onClick={clearTable} variant="dark" >Clear
      </Button>
      </Col>
      </Row>

      
      <Table sstriped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>List Price</th>
            <th>Discount</th>
            <th>Net Price</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
          <th colSpan={3}></th>
          <th style ={styles.textCenter}>Total price</th>
          <th style ={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          <th style ={styles.textRight}>{numberWithCommas(discount)}</th>
          <th style ={styles.textRight}>{numberWithCommas(totalPrice - discount)}</th>
          </tr>
        </tfoot>
      </Table>
      </Container>
  );
}

export default QuotationTable;
