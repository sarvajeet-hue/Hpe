import React, { useState } from 'react'
import axios from 'axios'
import {PrimaryButton} from '../Components/PrimaryButton/PrimaryButton'
import background from '../assets/background.png'

export const ClickPhoto = () => {

  const [removedImg , setRemovedImg] = useState(null)
  const [orderId , setOrderId] = useState(null)
const imgUrl = "https://www.shutterstock.com/shutterstock/photos/1554086789/display_1500/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-model-posing-1554086789.jpg"
    async function removeBackground(){
      
      const apiKey = "1bdb846f1ab84fa98163fb15ec784f26_2db605f0fb574a7dbf726bce5dbfe952_andoraitools"
      
      
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      };
      const body ={
        imageUrl: imgUrl, // Input image URL
        background : background
      };
      try {
        const response = await axios.post("http://localhost:5000/remove-background",
          body, 
          {headers: headers}  
          
        );
  
        console.log("response:", response)
         const orderId = response?.data?.body?.orderId 
        setOrderId(response?.data?.body?.orderId)

        orderStatus(orderId)
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    async function orderStatus(orderId) {
      const apiKey = "1bdb846f1ab84fa98163fb15ec784f26_2db605f0fb574a7dbf726bce5dbfe952_andoraitools";
    
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      };
    
      const body = {
        orderId: orderId  // Ensure that orderId is sent as an object
      };
    
      console.log("Order ID:", orderId);
    
      const pollOrderStatus = async (orderId) => {
        try {
          // Send request to check the order status
          const response = await axios.post('http://localhost:5000/remove-background-with-orderId', body, { headers });
          console.log("Response in order status:", response.data);  // Log the response
    
          const status = response.data?.body?.status
            // Extract the status from the response
    
          if (status === 'init') {
            console.log("Order is still initializing... waiting...");
            // Wait for 5 seconds before checking again
            setTimeout(() => pollOrderStatus(orderId), 5000);
          } else if (status === 'active') {
            console.log("Order is active! Processing complete.");
            setRemovedImg(response.data?.body?.output)
            // Handle the successful response here (e.g., update UI with the result)
          } else {
            console.log("Order status:", status);
            // Handle other possible statuses, if any
          }
        } catch (error) {
          console.error("Error fetching order status:", error);
          if (error.response) {
            console.error("Server responded with error:", error.response.data);
          } else if (error.request) {
            console.error("No response from the server:", error.request);
          } else {
            console.error("Error during request setup:", error.message);
          }
        }
      };
    
      // Start polling
      pollOrderStatus(orderId);
    }


    

  return (
    <div className='flex items-center justify-center flex-col gap-6 '> 
        <div>
            <img className='h-[500px] w-[500px]' src={imgUrl} alt="" />
        </div>


        <PrimaryButton onClick={removeBackground}>
              capture
        </PrimaryButton>


        <div>
          <img src={removedImg} className='h-[500px] w-[500px]' alt="" />
        </div>
        
    </div>
  )
}
