import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();
  const current = new Date();
  const month = current.getMonth() + 1;
  const day = current.getDate();
  const date = `${current.getFullYear()}-${month < 10 ? `0${month}` : `${month}`
    }-${day < 10 ? `0${day}` : `${day}`}`;
  console.log(date);
  const [allPreOrderList, setAllPreOrderList] = useState([]);
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const [todaysOrdersnumber, setTodaysOrdersnumber] = useState(1);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [orderexpend, setOrderexpend] = useState(false);
  const [todaysorderexpend, setTodaysorderexpend] = useState(false);
  const [preorderexpend, setPreorderexpend] = useState(false);

  const todayordershandler = () => {
    setTodaysOrdersnumber(todaysOrdersnumber + 1);
  };
  const getAllPreOrderList = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pre-order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setAllPreOrderList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getAllPreOrderList();
      dispatch(listOrders());
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].createdAt.substring(0, 10) === date) {
          todayordershandler();
        }
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={e => setOrderexpend(!orderexpend)}>
            Total Order List ({orders && orders.length})
          </button>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={e => setTodaysorderexpend(!todaysorderexpend)}>
            Todays Order {todaysOrdersnumber > 1 && todaysOrdersnumber}
          </button>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={e => setPreorderexpend(!preorderexpend)}>
            Pre order List ({allPreOrderList && allPreOrderList.length})
          </button>
        </div>
      </div>






      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : todaysorderexpend ? (
        <>
          {orders && orders.length > 0 ? (
            <Table striped bordered hover responsive className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {orders?.map((order) => (
                  <>
                    {order?.createdAt?.substring(0, 10) === date && (
                      <tr key={order?._id}>
                        <td>{order?._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order?.createdAt?.substring(0, 10)}</td>
                        <td>৳{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order?.paidAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-check"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          {order.isDelivered ? (
                            order?.deliveredAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-check"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button variant="dark" className="btn-sm">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </Table>
          ) : (
            <Message variant="info">No Order Found</Message>
          )}
        </>

      ) : (
        ""
      )}


      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orderexpend ? (
        <>
          {orders && orders.length > 0 ? (
            <Table striped bordered hover responsive className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order?.createdAt?.substring(0, 10)}</td>
                    <td>৳{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order?.paidAt?.substring(0, 10)
                      ) : (
                        <i className="fas fa-check" style={{ color: "red" }}></i>
                      )}
                    </td>

                    <td>
                      {order.isDelivered ? (
                        order?.deliveredAt?.substring(0, 10)
                      ) : (
                        <i className="fas fa-check" style={{ color: "red" }}></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="dark" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Message variant="info">No Order Found</Message>
          )}
        </>
      ) :
        ""}




      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : preorderexpend ? (
        <Table striped bordered hover responsive className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Date</th>
              <th>ProductId</th>
            </tr>
          </thead>

          <tbody>
            {allPreOrderList.map((order) => (
              <>

                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>{order?.createdAt?.substring(0, 10)}</td>
                  <td>{order.product}</td>


                </tr>

              </>
            ))}
          </tbody>
        </Table>
      ) : (
        ""
      )}

    </div>
  );
}

export default OrderListScreen;
