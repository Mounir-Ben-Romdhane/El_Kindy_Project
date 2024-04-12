import axios from "axios";


export async function Add(req,res){
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload = {
        "app_token": "a1e02adf-ac26-42dd-ac2c-bcce4039c770", 
        "app_secret": process.env.flouci_secret,
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:3000/success",
        "fail_link": "http://localhost:3000/fail",
        "developer_tracking_id": "84cb42aa-8358-4818-9c6c-42499e99be1e",
    };
    await axios 
        .post(url,payload)
        .then(result=>{
            res.send(result.data);
        })
        .catch(err=>{
            console.log(err);
        });
}

export async function Verify(req,res){
    const id_payement = req.params.id;
    const url = "https://developers.flouci.com/api/verify_payment/"+id_payement;
   
    axios.get(url, {
        headers: {
            'apppublic': 'a1e02adf-ac26-42dd-ac2c-bcce4039c770',
            'appsecret': process.env.flouci_secret
        }
    })
    .then(result=>{
        res.send(result.data);
    })
    .catch(err=>{
        console.log(err);
    });
}
