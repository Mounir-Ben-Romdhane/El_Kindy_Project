import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams,Link } from 'react-router-dom';
import success from '../../assetss/images/icons8-success.svg'
import fail from '../../assetss/images/icons8-fail-188.png'

function Success() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState("");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    axios
      .post(`/payment/payment/${paymentId}`)
      .then(res => {
        setResult(res.data.result.status);
      })
      .catch(error => {
        console.error("Error fetching payment status:", error);
        setResult("FAIL");
      });
  }, [paymentId]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow border-0 rounded-3 p-4">
            <div className="card-body text-center">
              {result === "SUCCESS" ? (
                <React.Fragment>
                  <h3 className="mb-4 text-success">Payment Successful</h3>
                  <img src={success} alt="Success Icon" className="img-fluid mb-4" />
                  <p className="text">Thank you for your payment. Your transaction was successful.</p>
                  <Link to="/listEventUser" className="btn btn-primary mt-4">Return to View Event</Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h3 className="mb-4 text-danger">Payment Failed</h3>
                  <img src={fail} alt="Error Icon" className="img-fluid mb-4" />
                  <p className="text-muted">Oops! Something went wrong with your payment. Please try again later.</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
